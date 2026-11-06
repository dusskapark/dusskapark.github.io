import { readFile, readdir, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { contentMetadata } from "./content-source.mjs";
import { createServer } from "vite";

// Preserve share previews and canonical URLs without requiring a server at runtime.
const origin = "https://api.metadata.co.kr";
const output = path.resolve("dist");
const template = (await readFile(path.join(output, "index.html"), "utf8"))
  .replace(/<!-- prerender:meta:start -->[\s\S]*?<!-- prerender:meta:end -->\s*/, "")
  .replace(/<!-- prerender:root:start -->[\s\S]*?<!-- prerender:root:end -->/, "");
if (!template.includes('<div id="root"></div>')) {
  throw new Error("Expected an empty root in dist/index.html; run vite build before prerendering.");
}
const preview = process.env.VERCEL_ENV === "preview";
const escape = (value) => String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const siteDescription = "Product builder designing AI/ML, developer experience, and tech infrastructure products since 2012.";
const pages = [
  { route: "/", title: "Hey, Joo — Product builder", description: siteDescription, image: "/images/social.jpeg" },
  { route: "/projects", title: "Projects | Hey, Joo", description: "Projects by Joo Hyung Park.", image: "/images/social.jpeg" },
  { route: "/blog", title: "Writing | Hey, Joo", description: "Reflections and practical lessons from working at the intersection of design, code, and AI.", image: "/images/social.jpeg" },
];
for (const [folder, kind] of [["projects", "project"], ["posts", "blog"]]) {
  for (const filename of (await readdir(`content/${folder}`)).filter((name) => name.endsWith(".jsx"))) {
    const data = contentMetadata(await readFile(`content/${folder}/${filename}`, "utf8"), filename);
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || !data.title || !data.description) throw new Error(`Invalid metadata in ${filename}`);
    pages.push({ route: `/${kind}/${data.slug}`, title: `${data.title} | Hey, Joo`, description: data.description, image: data.hero || "/images/social.jpeg" });
  }
}

const vite = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  // Prerendering loads only SSR modules, so dependency discovery is unnecessary.
  optimizeDeps: { noDiscovery: true, include: [] },
  // react-tweet imports CSS modules that Node cannot load without Vite.
  ssr: { noExternal: ["react-tweet"] },
  // Node's react-router-dom conditional export selects CJS, whose named exports
  // cannot be reliably detected. Use its ESM entry for every SSR import.
  resolve: { alias: { "react-router-dom": path.resolve("node_modules/react-router-dom/dist/index.mjs") } },
});
try {
const { render } = await vite.ssrLoadModule("/src/entry-server.tsx");
for (const page of pages) {
  const canonical = `${origin}${page.route}`;
  const image = new URL(page.image, origin).href;
  const meta = [
    `<link rel="canonical" href="${escape(canonical)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:url" content="${escape(canonical)}" />`,
    `<meta property="og:title" content="${escape(page.title)}" />`,
    `<meta property="og:description" content="${escape(page.description)}" />`,
    `<meta property="og:image" content="${escape(image)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${escape(page.title)}" />`,
    `<meta name="twitter:description" content="${escape(page.description)}" />`,
    `<meta name="twitter:image" content="${escape(image)}" />`,
    ...(preview ? ['<meta name="robots" content="noindex, nofollow" />'] : []),
  ].join("\n    ");
  const html = template.replace(/<title>[^<]*<\/title>/, () => `<title>${escape(page.title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, () => `<meta name="description" content="${escape(page.description)}" />`)
    .replace("</head>", () => `<!-- prerender:meta:start -->\n    ${meta}\n    <!-- prerender:meta:end -->\n  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root"><!-- prerender:root:start -->${render(page.route)}<!-- prerender:root:end --></div>`);
  const destination = page.route === "/" ? path.join(output, "index.html") : path.join(output, `${page.route.slice(1)}.html`);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, html);
}
} finally {
  await vite.close();
}
await writeFile(path.join(output, "robots.txt"), preview ? "User-agent: *\nDisallow: /\n" : `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map(({ route }) => `  <url><loc>${escape(origin + route)}</loc></url>`).join("\n")}\n</urlset>\n`);
console.log(`Prerendered ${pages.length} routes with metadata and sitemap.`);
