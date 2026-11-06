import { readdir, readFile } from "node:fs/promises";
import { contentMetadata } from "./content-source.mjs";

const errors = [];
const seen = new Set();
for (const [folder, kind] of [["projects", "project"], ["posts", "post"]]) {
  for (const file of (await readdir(`content/${folder}`)).filter((name) => name.endsWith(".jsx"))) {
    const name = `content/${folder}/${file}`;
    const content = await readFile(name, "utf8");
    const data = contentMetadata(content, name);
    if (data.kind !== kind || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.slug) || file !== `${data.slug}.jsx`) errors.push(`${name}: invalid kind or slug`);
    if (seen.has(`${kind}/${data.slug}`)) errors.push(`${name}: duplicate slug`);
    seen.add(`${kind}/${data.slug}`);
    for (const field of ["title", "description", "hero"]) if (typeof data[field] !== "string" || !data[field].trim()) errors.push(`${name}: missing ${field}`);
    if (typeof data.date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(data.date) || Number.isNaN(Date.parse(data.date))) errors.push(`${name}: invalid date`);
    if (!["ko", "en"].includes(data.lang)) errors.push(`${name}: invalid language`);
    if (data.listed !== undefined && typeof data.listed !== "boolean") errors.push(`${name}: listed must be a boolean`);
    if (!content.trim()) errors.push(`${name}: empty body`);
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Validated metadata for ${seen.size} React content entries. Run pnpm build to compile their content.`);
}
