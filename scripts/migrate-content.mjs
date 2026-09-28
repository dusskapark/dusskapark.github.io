import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";
import { compile } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import GithubSlugger from "github-slugger";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import { parseFragment } from "parse5";
import sharp from "sharp";

const root = process.cwd();
const check = process.argv.includes("--check");
const sha = (s) => crypto.createHash("sha256").update(s).digest("hex");
const json = (value) => JSON.stringify(value, null, 2) + "\n";
const excluded = [
  {
    source: "_posts/2019-06-30-demo.md",
    reason: "Theme demonstration, explicitly excluded from migration.",
  },
  {
    source: "_projects/test.md",
    reason: "Unpublished include experiment without front matter.",
  },
];
const allEntries = [];
const galleryInventory = [];
const assetCache = new Map();
const warnings = [];
const legacyHeadings = JSON.parse(
  fs.readFileSync(path.join(root, "migration/legacy-headings.json"), "utf8"),
);

function emit(filename, value) {
  const destination = path.join(root, filename);
  if (check) {
    if (
      !fs.existsSync(destination) ||
      fs.readFileSync(destination, "utf8") !== value
    )
      throw new Error(
        `Migration output is stale: ${filename}. Run pnpm migrate:content.`,
      );
  } else {
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, value);
  }
}
function normalizeUrl(value, hero = false) {
  let result = String(Array.isArray(value) ? value[0] : value || "").trim();
  if (result.startsWith("//")) return `https:${result}`;
  if (/^https?:/.test(result)) return result;
  result = result.replace(/^(?:\.\.\/)+images\//, "/images/");
  if (result.startsWith("images/")) result = `/${result}`;
  if (hero && !result.startsWith("/images/"))
    result = `/images/projects/${result.replace(/^\/+/, "")}`;
  if (result.startsWith("/"))
    result = result
      .split("/")
      .map((segment) => encodeURIComponent(decodeURIComponent(segment)))
      .join("/");
  return result;
}
function decodeHtml(value) {
  const fragment = parseFragment(value);
  const visit = (node) =>
    node.nodeName === "#text"
      ? node.value
      : (node.childNodes || []).map(visit).join("");
  return visit(fragment);
}
function headingKey(value) {
  return decodeHtml(
    value
      .replace(/<[^>]*>/g, "")
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, ""),
  )
    .replace(/[’‘]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
function htmlAttributes(raw) {
  const attrs = {};
  const attrPattern =
    /([^\s=<>/]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  for (const match of raw.matchAll(attrPattern))
    attrs[match[1]] = decodeHtml(match[2] ?? match[3] ?? match[4] ?? "");
  return attrs;
}
function parseLiquidAttributes(source, file) {
  const attrs = {};
  let rest = source.trim();
  while (rest) {
    const match = rest.match(
      /^([a-z_0-9]+)\s*=\s*("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|true|false|\d+)/s,
    );
    if (!match)
      throw new Error(
        `Unknown Liquid attribute in ${file}: ${rest.slice(0, 100)}`,
      );
    const raw = match[2];
    attrs[match[1]] =
      raw.startsWith('"') || raw.startsWith("'")
        ? raw.slice(1, -1).replace(/\\(["'\\])/g, "$1")
        : raw === "true"
          ? true
          : raw === "false"
            ? false
            : Number(raw);
    rest = rest.slice(match[0].length).trim();
  }
  return attrs;
}
function styleObject(style) {
  return Object.fromEntries(
    style
      .split(";")
      .filter((part) => part.trim())
      .map((part) => {
        const colon = part.indexOf(":");
        if (colon < 0) throw new Error(`Invalid CSS declaration: ${part}`);
        const key = part
          .slice(0, colon)
          .trim()
          .replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
        return [key, part.slice(colon + 1).trim()];
      }),
  );
}
function convertTag(tag) {
  if (/^<\//.test(tag)) return tag;
  const [, name, raw] = tag.match(/^<([\w:-]+)([\s\S]*?)\/?\s*>$/) || [];
  if (!name) return tag;
  const attrs = htmlAttributes(raw);
  if (name === "a" && attrs.target === "_blank")
    attrs.rel = [
      ...new Set(
        (attrs.rel || "")
          .split(/\s+/)
          .filter(Boolean)
          .concat(["noopener", "noreferrer"]),
      ),
    ].join(" ");
  const rename = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    viewbox: "viewBox",
    "fill-rule": "fillRule",
    "clip-rule": "clipRule",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
  };
  const properties = Object.entries(attrs)
    .map(([key, value]) => {
      if (key === "markdown") return "";
      if (key === "style")
        return `style={${JSON.stringify(styleObject(value))}}`;
      if (key === "href" || key === "src") value = normalizeUrl(value);
      return `${rename[key] || key}=${JSON.stringify(value)}`;
    })
    .filter(Boolean)
    .join(" ");
  const voidTag =
    /^(?:img|br|hr|input|source|wbr|area|base|col|embed|link|meta|param|track)$/.test(
      name,
    ) || /\/\s*>$/.test(tag);
  return `<${name === "img" ? "ContentImage" : name}${properties ? ` ${properties}` : ""}${voidTag ? " /" : ""}>`;
}
function inlineJsx(input) {
  const rendered = String(
    unified()
      .use(remarkParse)
      .use(remarkRehype, { allowDangerousHtml: true })
      .use(rehypeStringify, { allowDangerousHtml: true })
      .processSync(String(input).trim()),
  )
    .replace(/^<p>/, "")
    .replace(/<\/p>\n?$/, "");
  // Text inside an existing HTML link must stay literal: allowing remark-gfm to
  // autolink it again during the MDX pass would create nested anchors/hydration errors.
  const fragment = parseFragment(rendered);
  const render = (node) => {
    if (node.nodeName === "#text") return `{${JSON.stringify(node.value)}}`;
    if (node.nodeName === "#comment") return "";
    if (!node.tagName) return (node.childNodes || []).map(render).join("");
    const attributes = (node.attrs || [])
      .map(
        ({ name, value }) =>
          `${name}="${value.replace(/&/g, "&amp;").replace(/"/g, "&quot;")}"`,
      )
      .join(" ");
    const opening = convertTag(
      `<${node.tagName}${attributes ? " " + attributes : ""}>`,
    );
    if (opening.endsWith("/>")) return opening;
    return (
      opening +
      (node.childNodes || []).map(render).join("") +
      `</${node.tagName}>`
    );
  };
  return render(fragment);
}

function nodeProp(name, value) {
  return value == null || value === ""
    ? ""
    : ` ${name}={<>${inlineJsx(value)}</>}`;
}
function prop(name, value) {
  return value == null || value === ""
    ? ""
    : ` ${name}={${JSON.stringify(value)}}`;
}
async function imageInfo(src, alt) {
  src = normalizeUrl(src);
  if (!assetCache.has(src)) {
    if (src.startsWith("/images/")) {
      const local = path.join(root, decodeURIComponent(src));
      if (!fs.existsSync(local))
        throw new Error(`Missing original image: ${src}`);
      const metadata = await sharp(local, { animated: false })
        .metadata()
        .catch(() => ({}));
      assetCache.set(src, {
        src,
        ...(metadata.width
          ? {
              width: metadata.width,
              height: metadata.pageHeight || metadata.height,
            }
          : {}),
      });
    } else assetCache.set(src, { src });
  }
  return { ...assetCache.get(src), alt: alt || "" };
}
function sourceHeadings(body, source, slug, kind) {
  const oldHeadings = (legacyHeadings[`${kind}/${slug}`] || []).map(
    (heading) => ({ ...heading, key: headingKey(heading.text) }),
  );
  const existing = new Map();
  for (const heading of oldHeadings)
    existing.set(heading.key, [
      ...(existing.get(heading.key) || []),
      heading.id,
    ]);
  const slugger = new GithubSlugger();
  const withoutCode = body.replace(
    /^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm,
    "",
  );
  return [...withoutCode.matchAll(/^(#{1,6})\s+(.+?)\s*#*\s*$/gm)].map((m) => {
    const text = decodeHtml(
      m[2]
        .replace(/<[^>]*>/g, "")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/[*_`]/g, ""),
    ).trim();
    const defaultId = slugger.slug(text);
    return {
      depth: m[1].length,
      text,
      id: existing.get(headingKey(m[2]))?.shift() || defaultId,
    };
  });
}
async function migrateBody(original, { source, slug, title, kind }) {
  if (source === "_projects/2024-06-01-klever.md") {
    const marker =
      '</div>\n</div>\n{::options parse_block_html="false" /}\n{% include store-badges.html';
    if (!original.includes(marker))
      throw new Error(
        "Klever timeline repair marker changed; review original HTML.",
      );
    original = original.replace(marker, "</div>\n" + marker);
    original = original.replace(
      "background-color: #00C471;",
      "background-color: #007b47;",
    );
    warnings.push({
      source,
      change:
        "Darkened the Inflearn link background from #00C471 to #007b47 so its unchanged white label reaches accessible contrast; wording and URL unchanged.",
    });
    warnings.push({
      source,
      change:
        "Closed the original unclosed community Timeline wrapper before store badges; all text and media preserved.",
    });
  }
  const tokens = [];
  const stash = (value) => {
    const key = `MIGRATIONTOKEN${tokens.length}END`;
    tokens.push(value);
    return key;
  };
  let body = original
    .replace(/^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1\s*$/gm, stash)
    .replace(/`+[^`\n]+`+/g, stash);
  const counts = {
    galleries: 0,
    galleryImages: 0,
    quoteCards: 0,
    mediaEmbeds: 0,
    tweets: 0,
    timelines: 0,
    timelineItems: 0,
    storeBadges: 0,
    figures: 0,
  };
  body = body.replace(/\{::options\s+[^}]*\}/g, "");
  const includeMatches = [
    ...body.matchAll(/\{%\s*include\s+([^\s%]+)([\s\S]*?)%\}/g),
  ];
  for (const match of includeMatches) {
    const attrs = parseLiquidAttributes(match[2], source);
    let replacement;
    if (match[1] === "post-components/gallery.html") {
      counts.galleries++;
      const images = await Promise.all(
        attrs.images
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
          .map((src, index) =>
            imageInfo(
              src,
              `${title} — ${attrs.caption ? decodeHtml(attrs.caption).replace(/\s+/g, " ").trim() : "project image"} ${index + 1}`,
            ),
          ),
      );
      counts.galleryImages += images.length;
      const columns = attrs.columns || 2;
      const id = `${kind}-${slug}-gallery-${counts.galleries}`;
      galleryInventory.push({
        id,
        source,
        ordinal: counts.galleries,
        columns,
        fullWidth: attrs.full_width === true,
        images,
        caption: attrs.caption || null,
        verification: "source-order-and-asset-existence-verified",
        visualReview: "pending",
      });
      replacement = `<Gallery${prop("images", images)}${prop("columns", columns)}${nodeProp("caption", attrs.caption)}${prop("fullWidth", attrs.full_width === true)} />`;
    } else if (match[1] === "post-components/video.html") {
      counts.mediaEmbeds++;
      replacement = `<MediaEmbed${prop("src", normalizeUrl(attrs.url))}${prop("title", attrs.caption ? decodeHtml(attrs.caption) : `${title} — video`)}${nodeProp("caption", attrs.caption)}${prop("fullWidth", attrs.full_width === true)} />`;
    } else if (match[1] === "post-components/quote.html") {
      counts.quoteCards++;
      const quoteImage = await imageInfo(attrs.images, "");
      replacement = `<QuoteCard${prop("image", quoteImage.src)}${prop("imageWidth", quoteImage.width)}${prop("imageHeight", quoteImage.height)}${nodeProp("text", attrs.text)}${nodeProp("caption", attrs.caption)}${prop("backgroundColor", attrs.background_color)}${prop("fontColor", attrs.font_color)}${prop("fullWidth", attrs.full_width === true)} />`;
    } else if (match[1] === "store-badges.html") {
      counts.storeBadges++;
      replacement = `<StoreBadges${prop("urls", [attrs.url1, attrs.url2, attrs.url3].filter(Boolean))}${prop("appName", attrs.app_name)}${prop("title", attrs.title)}${prop("description", attrs.description)}${prop("fullWidth", attrs.full_width === true)} />`;
    } else
      throw new Error(`Unsupported Liquid include ${match[1]} in ${source}`);
    body = body.replace(match[0], stash(replacement));
  }
  if (/\{%|\{\{/.test(body)) throw new Error(`Unconverted Liquid in ${source}`);
  body = body.replace(/<iframe\b([\s\S]*?)>\s*<\/iframe>/gi, (_, raw) => {
    const attrs = htmlAttributes(raw);
    counts.mediaEmbeds++;
    return `\n\n${stash(`<MediaEmbed${prop("src", normalizeUrl(attrs.src))}${prop("title", attrs.title && attrs.title !== "YouTube video player" ? attrs.title : `${title} — video ${counts.mediaEmbeds}`)}${prop("aspectRatio", attrs.width && attrs.height ? `${attrs.width} / ${attrs.height}` : undefined)} />`)}\n\n`;
  });
  body = body.replace(
    /<blockquote\s+class="twitter-tweet"[^>]*>([\s\S]*?)<\/blockquote>/g,
    (_, inner) => {
      counts.tweets++;
      const urls = [...inner.matchAll(/href="([^"]*\/status\/[^\"]+)"/g)];
      if (!urls.length) throw new Error(`Tweet missing permalink in ${source}`);
      return `\n\n${stash(`<TweetEmbed${prop("url", decodeHtml(urls.at(-1)[1]))}><blockquote>${inlineJsx(inner)}</blockquote></TweetEmbed>`)}\n\n`;
    },
  );
  for (const match of [
    ...body.matchAll(/<figure\b([^>]*)>([\s\S]*?)<\/figure>/g),
  ]) {
    const figureAttrs = htmlAttributes(match[1]);
    const imageTag = match[2].match(/<img\b([^>]*)>/);
    const linkTag = match[2].match(/<a\b([^>]*)>/);
    const caption = match[2].match(/<figcaption>([\s\S]*?)<\/figcaption>/);
    if (!imageTag || !linkTag || !caption)
      throw new Error(`Unsupported figure structure in ${source}`);
    const imageAttrs = htmlAttributes(imageTag[1]);
    const linkAttrs = htmlAttributes(linkTag[1]);
    if (normalizeUrl(linkAttrs.href) !== normalizeUrl(imageAttrs.src))
      throw new Error(`Figure links to a different resource in ${source}`);
    const image = await imageInfo(imageAttrs.src, imageAttrs.alt);
    counts.figures++;
    const figure = `<Figure${prop("id", figureAttrs.id)}${prop("src", image.src)}${prop("alt", image.alt)}${prop("width", image.width)}${prop("height", image.height)}${prop("linkLabel", linkAttrs["aria-label"])}${nodeProp("caption", caption[1])} />`;
    body = body.replace(match[0], stash(figure));
  }
  body = body.replace(/<script\b[\s\S]*?<\/script>/gi, () => {
    warnings.push({
      source,
      change:
        "Removed external inline script; replaced by component lifecycle.",
    });
    return "";
  });
  body = body.replace(/<!--[\s\S]*?-->/g, "");
  // Timeline conversion uses a stack so nested cards keep their original wrappers.
  const divStack = [];
  body = body.replace(
    /<div\b[^>]*>|<\/div>|<span class="timeline-date">([\s\S]*?)<\/span>/g,
    (tag, date) => {
      if (date !== undefined)
        return stash(`<span className="timeline-date">${date}</span>`) + "\n\n";
      if (tag === "</div>") {
        const type = divStack.pop();
        if (!type) throw new Error(`Unmatched </div> in ${source}`);
        return type === "timeline"
          ? "\n\n</Timeline>\n\n"
          : type === "item"
            ? "\n\n</TimelineItem>\n\n"
            : type === "outer"
              ? ""
              : tag;
      }
      const cls = htmlAttributes(tag.slice(4, -1)).class || "";
      if (cls.includes("timeline-section")) {
        counts.timelines++;
        divStack.push("timeline");
        return (
          stash(
            `<Timeline${prop("align", cls.includes("align-right") ? "right" : "left")}>`,
          ) + "\n\n"
        );
      }
      if (cls === "timeline-item") {
        counts.timelineItems++;
        divStack.push("item");
        return "\n\n<TimelineItem>\n\n";
      }
      if (cls === "outer" && divStack.at(-1) === "timeline") {
        divStack.push("outer");
        return "";
      }
      divStack.push("div");
      return tag;
    },
  );
  if (divStack.length)
    throw new Error(`Unclosed div in ${source}: ${divStack.join(",")}`);
  // Kramdown accepts emphasis adjacent to Korean text where CommonMark does
  // not. Code spans/fences and component strings are protected by tokens above.
  body = body.replace(
    /(?<!\\)\*\*([^*\n]+?)\*\*(?!\*)/g,
    "<strong>$1</strong>",
  );
  // Keep prose/HTML intact while escaping braces which have meaning only to MDX.
  body = body.replace(/[{}]/g, (c) => (c === "{" ? "&#123;" : "&#125;"));
  body = body.replace(/<\/?[A-Za-z][^>]*>/g, (tag) =>
    /^<\/?(?:Timeline|TimelineItem)\b/.test(tag) ? tag : convertTag(tag),
  );
  // Normalize Markdown image destinations, including legacy filenames with spaces.
  body = body.replace(/!\[([^\]]*)\]\(([^\n]+?)\)/g, (_, alt, dest, offset) => {
    const normalized = normalizeUrl(dest.trim().replace(/^<|>$/g, ""));
    const context = [...body.slice(0, offset).matchAll(/^#{1,6}\s+(.+)$/gm)].at(
      -1,
    )?.[1];
    const label =
      alt ||
      `${title} — ${context ? decodeHtml(context).replace(/[*_`]/g, "") : "project image"}`;
    return `![${label}](<${normalized}>)`;
  });
  // A JSX block containing Markdown must have blank lines at its boundaries.
  body = body.replace(
    /(<(?:div|Timeline|TimelineItem)\b[^\n]*>)\n(?=\S)/g,
    "$1\n\n",
  );
  body = body.replace(
    /([^\n])\n(<\/(?:div|Timeline|TimelineItem)>)/g,
    "$1\n\n$2",
  );
  body = body.replace(/MIGRATIONTOKEN(\d+)END/g, (_, i) => tokens[Number(i)]);
  body = body.replace(
    /<TimelineItem>\s*<span className="timeline-date">([\s\S]*?)<\/span>/g,
    (_, date) => `<TimelineItem${prop("date", decodeHtml(date))}>\n\n`,
  );
  return { body: body.trim() + "\n", counts };
}

for (const [directory, kind] of [
  ["_projects", "project"],
  ["_posts", "post"],
]) {
  for (const filename of fs
    .readdirSync(path.join(root, directory))
    .filter((file) => file.endsWith(".md"))
    .sort()) {
    const source = `${directory}/${filename}`;
    if (excluded.some((item) => item.source === source)) continue;
    const raw = fs.readFileSync(path.join(root, source), "utf8");
    const { data, content } = matter(raw);
    if (!data.title) throw new Error(`Missing front matter in ${source}`);
    const slug = filename
      .replace(/^\d{4}-\d{2}-\d{2}-/, "")
      .replace(/\.md$/, "")
      .toLowerCase();
    const titleLines = String(data.title)
      .split(/<br\s*\/?\s*>/i)
      .map((line) => decodeHtml(line).trim());
    const title = titleLines.join(" ");
    const result = await migrateBody(content, { source, slug, title, kind });
    const metadata = {
      kind,
      slug,
      title,
      description: data.description || "",
      date:
        data.date instanceof Date
          ? data.date.toISOString().slice(0, 10)
          : String(data.date || filename.slice(0, 10)).slice(0, 10),
      lang: data.lang || (slug === "tstore" ? "ko" : "en"),
      listed: data.visible !== false,
      hero: normalizeUrl(data.featured_image, kind === "project"),
      legacyPaths: [
        `/${kind === "project" ? "project" : "blog"}/${slug}.html`,
        `/${kind === "project" ? "project" : "blog"}/${slug}/`,
      ],
      ...(titleLines.length > 1 ? { titleLines } : {}),
      ...(data.subtitle ? { subtitle: data.subtitle } : {}),
      ...(data.team ? { team: data.team } : {}),
      ...(data.role ? { role: data.role } : {}),
      ...(data.accent_color ? { accentColor: data.accent_color } : {}),
      ...(data.gallery_images
        ? {
            galleryImages: (Array.isArray(data.gallery_images)
              ? data.gallery_images
              : String(data.gallery_images).split(",")
            ).map((value) => normalizeUrl(value, true)),
          }
        : {}),
      ...(data.translation_key ? { translationKey: data.translation_key } : {}),
      ...(data.authors ? { authors: data.authors } : {}),
      sourceFile: source,
      headings: sourceHeadings(content, source, slug, kind),
    };
    await imageInfo(metadata.hero, title);
    for (const match of result.body.matchAll(
      /(?<=[(<'\"\s])\/images\/[^\"\n<>]+?(?=[\"<>]|\)\s*\n)/g,
    )) {
      await imageInfo(match[0].replace(/\)$/, ""), "");
    }
    await compile(result.body, { remarkPlugins: [remarkGfm] }).catch(
      (error) => {
        throw new Error(`${source}: ${error.message}`, { cause: error });
      },
    );
    const output = `content/${kind === "project" ? "projects" : "posts"}/${slug}.mdx`;
    const mdx = `---\n${JSON.stringify(metadata, null, 2)}\n---\n\n${result.body}`;
    emit(output, mdx);
    allEntries.push({
      source,
      output,
      kind,
      slug,
      url: `/${kind === "project" ? "project" : "blog"}/${slug}`,
      title,
      date: metadata.date,
      lang: metadata.lang,
      listed: metadata.listed,
      hero: metadata.hero,
      legacyPaths: metadata.legacyPaths,
      sourceSha256: sha(raw),
      outputSha256: sha(mdx),
      headings: metadata.headings,
      components: result.counts,
      verification: {
        mdxCompilation: "passed",
        sourceTransformation: "deterministic",
        visualReview: "pending",
      },
    });
  }
}
if (
  allEntries.filter((e) => e.kind === "project").length !== 17 ||
  allEntries.filter((e) => e.kind === "post").length !== 3
)
  throw new Error("Expected 17 projects and 3 posts");
if (galleryInventory.length !== 50)
  throw new Error(`Expected 50 galleries; found ${galleryInventory.length}`);
const summary = {
  documents: allEntries.length,
  projects: 17,
  listedProjects: allEntries.filter((e) => e.kind === "project" && e.listed)
    .length,
  posts: 3,
  galleries: galleryInventory.length,
  galleriesByColumns: Object.fromEntries(
    [1, 2, 3].map((n) => [
      n,
      galleryInventory.filter((g) => g.columns === n).length,
    ]),
  ),
  galleryImages: galleryInventory.reduce((sum, g) => sum + g.images.length, 0),
  excluded,
};
emit(
  "migration/content-manifest.json",
  json({
    version: 1,
    summary,
    entries: allEntries,
    transformations: [
      "Liquid includes become typed MDX components.",
      "Kramdown parser directives removed.",
      "Original code blocks and prose retained.",
      "Relative media URLs normalized to existing /images paths.",
      "HTML attributes/styles converted to JSX.",
      "Legacy heading ids preserved from the pre-migration static output when available.",
      "Timeline wrappers converted without altering item order.",
      "Embedded tweets keep their static quote and original link.",
    ],
    warnings,
  }),
);
emit("migration/gallery-inventory.json", json(galleryInventory));
emit(
  "migration/url-map.json",
  json(
    allEntries.flatMap((entry) => [
      {
        source: entry.url,
        destination: entry.url,
        status: 200,
        listed: entry.listed,
      },
      ...entry.legacyPaths.map((source) => ({
        source,
        destination: entry.url,
        status: 308,
      })),
    ]),
  ),
);
emit(
  "migration/media-manifest.json",
  json([...assetCache.values()].sort((a, b) => a.src.localeCompare(b.src))),
);
console.log(
  `${check ? "Verified" : "Migrated"} ${summary.documents} documents, ${summary.galleries} galleries (${summary.galleryImages} images); MDX compilation passed.`,
);
