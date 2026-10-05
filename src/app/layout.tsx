import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import localFont from "next/font/local";
import { SiteHeader, SiteFooter } from "@/components/site";
import { site, isPreview } from "@/lib/site";
import "./globals.css";
import "@/components/content/content.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});
const korean = localFont({
  src: "./fonts/noto-sans-kr-content.woff2",
  weight: "100 900",
  variable: "--font-noto-sans-kr",
  display: "swap",
  preload: false,
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Product builder`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.author }],
  icons: { icon: "/images/favicon.gif" },
  robots: isPreview
    ? { index: false, follow: false }
    : { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bricolage.variable} ${korean.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
