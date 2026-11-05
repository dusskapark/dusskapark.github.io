import { NarrativeHome } from "@/components/site/narrative-home";
import { PageTransition } from "@/components/site";
import { usePageMeta } from "@/lib/use-page-meta";
import { site } from "@/lib/site";
import { useSitePreferences } from "@/lib/site-preferences";

export default function HomePage() {
  const { language } = useSitePreferences();
  usePageMeta(
    language === "ko" ? "프로덕트 빌더" : undefined,
    language === "ko" ? "개발자 경험과 AI 도구를 설계하고 제품을 만드는 박주형의 포트폴리오입니다." : site.description,
  );
  return (
    <PageTransition>
      <NarrativeHome />
    </PageTransition>
  );
}
