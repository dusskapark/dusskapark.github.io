import type {
  ContentEntry,
  ContentKind,
  ContentMetadata,
  ContentBody,
} from "./content-schema";

export type {
  ContentEntry,
  ContentKind,
  ContentHeading,
} from "./content-schema";

type ContentModule = { default: ContentBody; frontmatter: ContentMetadata };

// All repository-authored JSX is compiled into the bundle at build time. There is
// no server read and no request-controlled source — these are static modules.
const modules = import.meta.glob<ContentModule>("../../content/**/*.jsx", {
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

export function getContentForLanguage(entry: ContentEntry, language: ContentEntry["lang"]) {
  if (entry.lang === language) return entry;
  return getTranslations(entry).find((candidate) => candidate.lang === language) ?? entry;
}

export function getContentPathForLanguage(pathname: string, language: ContentEntry["lang"]) {
  const match = pathname.match(/^\/(project|blog)\/([^/]+)\/?$/);
  if (!match) return pathname;
  const entry = getContent(match[1] === "project" ? "project" : "post", match[2]);
  return entry ? getContentUrl(getContentForLanguage(entry, language)) : pathname;
}

export function getLocalizedContentList(kind: ContentKind, language: ContentEntry["lang"]) {
  const byStory = new Map<string, ContentEntry>();
  for (const entry of getAllContent(kind)) {
    const key = entry.translationKey ?? entry.slug;
    if (!byStory.has(key) || entry.lang === language) byStory.set(key, entry);
  }
  return Array.from(byStory.values());
}
