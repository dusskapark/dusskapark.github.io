import { useParams } from "react-router-dom";
import { getContent } from "@/lib/content";
import { ContentDetail } from "@/components/content-detail";
import NotFoundPage from "./not-found";

export default function BlogDetailPage() {
  const { slug } = useParams();
  const entry = slug ? getContent("post", slug) : undefined;
  if (!entry) return <NotFoundPage />;
  return <ContentDetail entry={entry} />;
}
