import fs from "node:fs";
import path from "node:path";
import { compile } from "@mdx-js/mdx";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import { z } from "zod";
import { compileMDX } from "next-mdx-remote/rsc";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = process.cwd();
const entries = [];
const problems = [];
const metadataSchema = z.object({
  kind: z.enum(["project", "post"]),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine((date) => !Number.isNaN(Date.parse(date))),
  lang: z.enum(["en", "ko"]),
  listed: z.boolean().optional(),
  hero: z.string().min(1),
  legacyPaths: z.array(z.string().startsWith("/")).optional(),
});
// Exercise the production serializer as well as the MDX parser: serializer
// security defaults can otherwise silently strip JSX props while parsing passes.
const components = Object.fromEntries(
  [
    "Gallery",
    "MediaEmbed",
    "QuoteCard",
    "StoreBadges",
    "TweetEmbed",
    "Timeline",
    "TimelineItem",
    "Figure",
    "ContentImage",
  ].map((name) => [
    name,
    function VerifyComponent(props) {
      if (
        name === "Gallery" &&
        (!Array.isArray(props.images) || !props.images.length)
      )
        throw new Error("Gallery images were stripped or missing");
      if (
        ["MediaEmbed", "Figure", "ContentImage"].includes(name) &&
        typeof props.src !== "string"
      )
        throw new Error(`${name} src was stripped or missing`);
      if (name === "QuoteCard" && (!props.image || !props.text))
        throw new Error("QuoteCard content was stripped or missing");
      if (name === "StoreBadges" && !Array.isArray(props.urls))
        throw new Error("StoreBadges URLs were stripped or missing");
      if (
        name === "TimelineItem" &&
        typeof props.date === "string" &&
        /^\{".*"\}$/.test(props.date)
      )
        throw new Error("Timeline label contains a serialized JSX expression");
      if (name === "TweetEmbed" && !props.url)
        throw new Error("Tweet permalink was stripped or missing");
      return createElement(
        "div",
        { "data-component": name },
        props.children,
        props.text,
        props.caption,
      );
    },
  ]),
);
for (const [folder, kind] of [
  ["projects", "project"],
  ["posts", "post"],
]) {
  for (const file of fs
    .readdirSync(path.join(root, "content", folder))
    .filter((name) => name.endsWith(".mdx"))) {
    const filename = `content/${folder}/${file}`;
    const raw = fs.readFileSync(path.join(root, filename), "utf8");
    const { data, content } = matter(raw);
    const result = metadataSchema.safeParse(data);
    if (!result.success) problems.push(`${filename}: ${result.error.message}`);
    if (data.kind !== kind || `${data.slug}.mdx` !== file)
      problems.push(
        `${filename}: directory, filename, kind and slug must agree.`,
      );
    if (
      /\{%|\{\{|\{::options/.test(
        content
          .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, "")
          .replace(/style=\{\{[^}]+\}\}/g, ""),
      )
    )
      problems.push(`${filename}: leftover legacy template syntax.`);
    if (data.slug === "demo" || data.slug === "test")
      problems.push(`${filename}: demo content must not be published.`);
    try {
      await compile(content, { remarkPlugins: [remarkGfm] });
      const compiled = await compileMDX({
        source: content,
        components,
        options: {
          blockJS: false,
          blockDangerousJS: true,
          mdxOptions: { remarkPlugins: [remarkGfm] },
        },
      });
      const html = renderToStaticMarkup(compiled.content);
      if (/<a\b[^>]*>(?:(?!<\/a>)[\s\S])*?<a\b/.test(html))
        throw new Error(
          "Nested links in rendered MDX; preserve original anchor text instead of autolinking it twice.",
        );
      if (
        process.argv.includes("--migration-parity") &&
        data.sourceFile &&
        fs.existsSync(path.join(root, data.sourceFile))
      ) {
        const original = matter(
          fs.readFileSync(path.join(root, data.sourceFile), "utf8"),
        )
          .content.replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, "")
          .replace(/`+[^`\n]+`+/g, "");
        const expectedStrong =
          [...original.matchAll(/(?<!\\)\*\*([^*\n]+?)\*\*(?!\*)/g)].length +
          [...original.matchAll(/<strong\b/g)].length;
        const actualStrong = [...html.matchAll(/<strong\b/g)].length;
        if (actualStrong < expectedStrong)
          throw new Error(
            `Lost emphasis: ${actualStrong} strong elements for ${expectedStrong} original emphasis spans`,
          );
        const originalFences = [
          ...matter(
            fs.readFileSync(path.join(root, data.sourceFile), "utf8"),
          ).content.matchAll(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)^\1\s*$/gm),
        ].map((match) => match[2]);
        const migratedFences = [
          ...content.matchAll(/^(`{3,}|~{3,})[^\n]*\n([\s\S]*?)^\1\s*$/gm),
        ].map((match) => match[2]);
        if (JSON.stringify(originalFences) !== JSON.stringify(migratedFences))
          throw new Error(
            "Original code blocks changed; preserve code verbatim or explicitly review the baseline.",
          );
      }
    } catch (error) {
      problems.push(`${filename}: ${error.message}`);
    }
    const localMedia = new Set(
      [
        ...raw.matchAll(/(?<=[(<'"\s])\/images\/[^"\n<>]+?(?=["<>]|\)\s*\n)/g),
      ].map((match) => match[0].replace(/\)$/, "")),
    );
    for (const media of localMedia) {
      // Every copied path is authoritative; query strings never identify a file.
      let decoded;
      try {
        decoded = decodeURIComponent(media.split(/[?#]/)[0]);
      } catch {
        problems.push(`${filename}: invalid media URI ${media}`);
        continue;
      }
      if (!fs.existsSync(path.join(root, decoded)))
        problems.push(`${filename}: missing media ${media}`);
    }
    entries.push({ ...data, filename, body: content });
  }
}
const paths = new Set(["/", "/projects", "/blog", "/about", "/thanks"]);
for (const entry of entries) {
  const url = `/${entry.kind === "project" ? "project" : "blog"}/${entry.slug}`;
  if (paths.has(url)) problems.push(`Duplicate content URL: ${url}`);
  paths.add(url);
  for (const alias of entry.legacyPaths || [])
    paths.add(alias.replace(/\/$/, ""));
}
for (const entry of entries) {
  for (const match of entry.body.matchAll(
    /\]\((\/(?:project|blog|about)[^\s)]*)\)|href=["'](\/(?:project|blog|about)[^"']*)["']/g,
  )) {
    const href = match[1] || match[2];
    const [pathname, hash] = href.split("#");
    if (!paths.has(pathname.replace(/\/$/, "")))
      problems.push(`${entry.filename}: missing local page ${href}`);
    if (hash && pathname !== "/about") {
      const target = entries.find(
        (candidate) =>
          `/${candidate.kind === "project" ? "project" : "blog"}/${candidate.slug}` ===
          pathname.replace(/\.html$|\/$/g, ""),
      );
      if (
        target &&
        !(target.headings || []).some(
          (heading) => heading.id === decodeURIComponent(hash),
        ) &&
        !target.body.includes(`id="${hash}"`)
      )
        problems.push(`${entry.filename}: unknown internal anchor ${href}`);
    }
  }
}
const baseline = JSON.parse(
  fs.readFileSync(path.join(root, "migration/content-manifest.json"), "utf8"),
);
for (const original of baseline.entries) {
  const actual = entries.find(
    (entry) => entry.kind === original.kind && entry.slug === original.slug,
  );
  if (!actual) problems.push(`Missing migrated document: ${original.url}`);
  if (original.slug === "naver-now" && actual?.listed !== false)
    problems.push("NAVER NOW must remain available but unlisted.");
}
if (problems.length) {
  console.error(problems.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Validated ${entries.length} local MDX documents, metadata, media paths, page links and baseline preservation.`,
  );
