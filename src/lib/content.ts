import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import {
  contentMetadataSchema,
  type ContentEntry,
  type ContentKind,
} from "./content-schema";

export type {
  ContentEntry,
  ContentKind,
  ContentHeading,
} from "./content-schema";

/** Only repository-authored MDX is loaded. No request-controlled source is evaluated. */
export function getAllContent(
  kind: ContentKind,
  includeUnlisted = false,
): ContentEntry[] {
  const directory = path.join(
    process.cwd(),
    "content",
    kind === "project" ? "projects" : "posts",
  );
  return fs
    .readdirSync(directory)
    .filter((filename) => filename.endsWith(".mdx"))
    .map((filename): ContentEntry => {
      const { data, content } = matter(
        fs.readFileSync(path.join(directory, filename), "utf8"),
      );
      const metadata = contentMetadataSchema.parse(data);
      if (metadata.kind !== kind || `${metadata.slug}.mdx` !== filename) {
        throw new Error(
          `Content kind/slug must match its directory and filename: ${filename}`,
        );
      }
      return { ...metadata, body: content };
    })
    .filter((entry) => includeUnlisted || entry.listed)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export function getContent(
  kind: ContentKind,
  slug: string,
): ContentEntry | undefined {
  return getAllContent(kind, true).find((entry) => entry.slug === slug);
}

export function getContentUrl(
  entry: Pick<ContentEntry, "kind" | "slug">,
): string {
  return `/${entry.kind === "project" ? "project" : "blog"}/${entry.slug}`;
}

export function getTranslations(entry: ContentEntry): ContentEntry[] {
  if (!entry.translationKey) return [];
  return getAllContent(entry.kind).filter(
    (candidate) => candidate.translationKey === entry.translationKey,
  );
}
