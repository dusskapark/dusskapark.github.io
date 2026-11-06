import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { SitePreferencesProvider } from "./lib/site-preferences";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <SitePreferencesProvider><App /></SitePreferencesProvider>
    </StaticRouter>,
  );
}
