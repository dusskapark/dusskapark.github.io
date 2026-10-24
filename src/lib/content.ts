import type {
  ContentEntry,
  ContentKind,
  ContentMetadata,
  MDXBody,
} from "./content-schema";

export type {
  ContentEntry,
  ContentKind,
  ContentHeading,
} from "./content-schema";

type MdxModule = { default: MDXBody; frontmatter: ContentMetadata };

// All repository-authored MDX is compiled into the bundle at build time. There is
// no server read and no request-controlled source — these are static modules.
const modules = import.meta.glob<MdxModule>("../../content/**/*.mdx", {
  eager: true,
});

const entries: ContentEntry[] = Object.values(modules).map((mod) => ({
  ...mod.frontmatter,
  listed: mod.frontmatter.listed !== false,
  Body: mod.default,
}));

export function getAllContent(
  kind: ContentKind,
  includeUnlisted = false,
): ContentEntry[] {
  return entries
    .filter((entry) => entry.kind === kind)
    .filter((entry) => includeUnlisted || entry.listed)
    .sort(
      (a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug),
    );
}

export function getContent(
  kind: ContentKind,
  slug: string,
): ContentEntry | undefined {
  return entries.find((entry) => entry.kind === kind && entry.slug === slug);
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
