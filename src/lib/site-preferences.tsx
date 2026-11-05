import { createContext, useContext, useLayoutEffect, useState, type ReactNode } from "react";

export type Language = "ko" | "en";
type Theme = "light" | "dark";

type SitePreferences = {
  language: Language;
  setLanguage: (language: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const Preferences = createContext<SitePreferences | null>(null);

export function SitePreferencesProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() =>
    document.documentElement.lang === "en" ? "en" : "ko",
  );
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light",
  );

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("joo-language", language);
      localStorage.setItem("joo-theme", theme);
    } catch {
      // The current page still works when storage is unavailable.
    }
  }, [language, theme]);

  return (
    <Preferences.Provider value={{ language, setLanguage, theme, setTheme }}>
      {children}
    </Preferences.Provider>
  );
}

export function useSitePreferences() {
  const preferences = useContext(Preferences);
  if (!preferences) throw new Error("Site preferences are missing");
  return preferences;
}
