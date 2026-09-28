import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const publicRoot = path.join(root, "public");
fs.mkdirSync(publicRoot, { recursive: true });
// Keep source assets in their original tracked location and reproduce public URLs.
// Never delete source media as part of a build.
fs.cpSync(path.join(root, "images"), path.join(publicRoot, "images"), {
  recursive: true,
  filter: (source) => !source.endsWith(".DS_Store"),
});
const referencedResearch = new Set();
const queue = [];
function resolveReference(reference, from) {
  const ownGithub =
    "https://github.com/dusskapark/dusskapark.github.io/blob/master/";
  let target = reference.split(/[?#]/)[0];
  if (target.startsWith(ownGithub))
    target = `/${target.slice(ownGithub.length)}`;
  if (/^https?:|^\/\/|^#|^mailto:/.test(target)) return;
  try {
    target = decodeURIComponent(target);
  } catch {
    return;
  }
  const resolved = target.startsWith("/")
    ? path.join(root, target)
    : path.resolve(path.dirname(from), target);
  if (!resolved.startsWith(path.join(root, "research") + path.sep)) return;
  if (!fs.existsSync(resolved) || !fs.statSync(resolved).isFile())
    throw new Error(`Linked research file is missing: ${reference}`);
  if (!referencedResearch.has(resolved)) {
    referencedResearch.add(resolved);
    queue.push(resolved);
  }
}
function scan(source, from) {
  for (const match of source.matchAll(
    /\]\(<?([^\n)>]+)>?\)|(?:href|src)=["']([^"']+)["']/g,
  ))
    resolveReference(match[1] || match[2], from);
}
for (const folder of ["projects", "posts"]) {
  for (const file of fs
    .readdirSync(path.join(root, "content", folder))
    .filter((name) => name.endsWith(".mdx"))) {
    const filename = path.join(root, "content", folder, file);
    scan(matter(fs.readFileSync(filename, "utf8")).content, filename);
  }
}
while (queue.length) {
  const filename = queue.shift();
  if (/\.(?:md|html|svg|css)$/i.test(filename))
    scan(fs.readFileSync(filename, "utf8"), filename);
}
// Rebuild this generated allowlist so a removed reference cannot remain public.
fs.rmSync(path.join(publicRoot, "research"), { recursive: true, force: true });
for (const filename of referencedResearch) {
  const relative = path.relative(root, filename);
  const destination = path.join(publicRoot, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(filename, destination);
}
console.log(
  `Prepared original /images paths and ${referencedResearch.size} linked research documents.`,
);
