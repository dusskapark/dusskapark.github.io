import { notFound } from "next/navigation";
import { getAllContent, getContent } from "@/lib/content";
import { contentMetadata } from "@/lib/metadata";
import { ContentDetail } from "@/components/content-detail";
// Unknown historical URLs reach notFound() without throwing a build fallback error.
export const dynamicParams = true;
export function generateStaticParams() {
  return getAllContent("project", true).map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getContent("project", slug);
  if (!entry) notFound();
  return contentMetadata(entry);
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = getContent("project", slug);
  if (!entry) notFound();
  return <ContentDetail entry={entry} />;
}
