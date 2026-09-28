import { AboutSection, ContactSection } from "@/components/site";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
export const metadata = pageMetadata("About", site.description, "/about");
export default function AboutPage() {
  return (
    <main id="main">
      <header className="page-shell page-heading">
        <p className="section-kicker">About</p>
        <h1>
          A designer.
          <br />A builder.
          <br />
          Always curious.
        </h1>
      </header>
      <AboutSection full />
      <ContactSection />
    </main>
  );
}
