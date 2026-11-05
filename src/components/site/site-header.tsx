import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Moon, Sun, X } from "lucide-react";
import { Dialog } from "radix-ui";
import { AnimatedThemeToggler } from "@/components/magicui/animated-theme-toggler";
import { getContentPathForLanguage } from "@/lib/content";
import { useSitePreferences, type Language } from "@/lib/site-preferences";

const links = [
  { href: "/", en: "Home", ko: "홈" },
  { href: "/projects", en: "Projects", ko: "프로젝트" },
  { href: "/blog", en: "Writing", ko: "글" },
  { href: "/#about", en: "About", ko: "소개" },
  { href: "/#contact", en: "Contact", ko: "연락" },
];

function ThemeToggle({ mobile = false }: { mobile?: boolean }) {
  const { language, theme, setTheme } = useSitePreferences();
  const dark = theme === "dark";
  const label = language === "ko"
    ? dark ? "라이트 모드로 전환" : "다크 모드로 전환"
    : dark ? "Switch to light mode" : "Switch to dark mode";

  return (
    <button
      className={`theme-toggle ${mobile ? "theme-toggle-mobile" : "theme-toggle-desktop"}`}
      type="button"
      title={label}
      aria-label={label}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      {dark ? <Sun size={18} aria-hidden="true" /> : <Moon size={18} aria-hidden="true" />}
    </button>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const { language, setLanguage, theme, setTheme } = useSitePreferences();
  const korean = language === "ko";
  const desktopThemeLabel = korean
    ? theme === "dark" ? "라이트 모드로 전환" : "다크 모드로 전환"
    : theme === "dark" ? "Switch to light mode" : "Switch to dark mode";

  function selectLanguage(next: Language) {
    setLanguage(next);
    const translatedPath = getContentPathForLanguage(pathname, next);
    if (translatedPath !== pathname) {
      navigate(translatedPath + search);
      setOpen(false);
    }
  }

  return (
    <header className="site-header" id="top">
      <Link to="/" className="site-wordmark" aria-label={korean ? "Joo 홈" : "Joo — home"}>
        joo<span aria-hidden="true">.</span>
      </Link>
      <span className="header-caption">
        {korean
          ? "창작자들이 기술로 삶을 개선하고, 모여서 서로 배우도록 돕습니다."
          : "I help creators build tech that improves lives and bring them together to learn."}
      </span>
      <div className="header-actions">
        <div className="language-toggle" role="group" aria-label={korean ? "언어" : "Language"}>
          <button type="button" lang="ko" aria-pressed={korean} onClick={() => selectLanguage("ko")}>한국어</button>
          <button type="button" lang="en" aria-label="English" aria-pressed={!korean} onClick={() => selectLanguage("en")}>EN</button>
        </div>
        <AnimatedThemeToggler
          className="theme-toggle theme-toggle-desktop"
          isDark={theme === "dark"}
          title={desktopThemeLabel}
          aria-label={desktopThemeLabel}
          onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
        <Dialog.Root open={open} onOpenChange={setOpen}>
          <Dialog.Trigger
            className="menu-trigger"
            aria-label={korean ? "메뉴 열기" : "Open navigation menu"}
          >
            <span>{korean ? "메뉴" : "Menu"}</span>
            <span className="menu-lines" aria-hidden="true">
              <i />
              <i />
            </span>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="menu-overlay" />
            <Dialog.Content className="menu-panel" aria-describedby={undefined}>
              <div className="menu-panel-top">
                <Dialog.Title className="menu-panel-title">{korean ? "둘러보기" : "Explore"}</Dialog.Title>
                <div className="menu-panel-actions">
                  <ThemeToggle mobile />
                  <Dialog.Close className="menu-trigger" aria-label={korean ? "메뉴 닫기" : "Close navigation menu"}>
                    <span>{korean ? "닫기" : "Close"}</span>
                    <X size={21} aria-hidden="true" />
                  </Dialog.Close>
                </div>
              </div>
              <nav className="menu-navigation" aria-label={korean ? "주 메뉴" : "Main navigation"}>
                {links.map((link, index) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    style={{ "--link-index": index } as React.CSSProperties}
                  >
                    <span className="menu-link-number">0{index + 1}</span>
                    <span>{link[language]}</span>
                    <ArrowUpRight
                      className="menu-link-arrow"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </nav>
              <div className="menu-bottom">
                <a href="mailto:dusskapark@gmail.com">dusskapark@gmail.com</a>
                <div className="social-links">
                  <a
                    href="https://github.com/dusskapark"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dusskapark/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
    </header>
  );
}
