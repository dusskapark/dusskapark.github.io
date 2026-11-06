import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fetchMediumFeed, mediumProfile } from "./scripts/medium-feed";
import mediumSnapshot from "./content/medium-feed.json";

const port = Number(process.env.PORT) || 3000;
const storyPath = fileURLToPath(new URL("./docs/home-narrative/home-story.ko.md", import.meta.url));
const englishStoryPath = fileURLToPath(new URL("./docs/home-narrative/home-story.en.md", import.meta.url));
const storyModule = "virtual:home-narrative";
const resolvedStoryModule = `\0${storyModule}`;

// Project and blog bodies are authored as React modules.
export default defineConfig({
  plugins: [
    {
      name: "portfolio-preview-clean-urls",
      configurePreviewServer(server) {
        server.middlewares.use((request, _response, next) => {
          const url = new URL(request.url || "/", "http://localhost");
          if ((request.method === "GET" || request.method === "HEAD") && /^\/(?:projects|blog|(?:project|blog)\/[a-z0-9-]+)$/.test(url.pathname)) {
            const html = resolve(server.config.build.outDir, `.${url.pathname}.html`);
            if (existsSync(html)) request.url = `${url.pathname}.html${url.search}`;
          }
          next();
        });
      },
    },
    {
      name: "portfolio-medium-writing",
      resolveId(id) {
        return id === "virtual:medium-writing" ? "\0virtual:medium-writing" : undefined;
      },
      async load(id) {
        if (id !== "\0virtual:medium-writing") return;
        let posts;
        try {
          posts = await fetchMediumFeed();
        } catch {
          this.warn("Medium RSS is unavailable. Using the saved writing list.");
          posts = mediumSnapshot;
        }
        return `export const profile = ${JSON.stringify(mediumProfile)}; export const posts = ${JSON.stringify(posts)};`;
      },
    },
    {
      name: "portfolio-home-narrative",
      resolveId(id) {
        return id === storyModule ? resolvedStoryModule : undefined;
      },
      load(id) {
        if (id !== resolvedStoryModule) return;
        this.addWatchFile(storyPath);
        this.addWatchFile(englishStoryPath);
        const source = readFileSync(storyPath, "utf8");
        const start = source.indexOf("## 2. 커버레터 초안");
        const end = source.indexOf("## 3. 글을 읽으며 탐색할 대표 장면", start);
        if (start < 0 || end < 0) throw new Error("Home narrative section not found");
        const body = source.slice(start + "## 2. 커버레터 초안".length, end).trim();
        const englishStory = readFileSync(englishStoryPath, "utf8").trim();
        return `export default ${JSON.stringify(body)}; export const englishStory = ${JSON.stringify(englishStory)};`;
      },
      handleHotUpdate({ file, server }) {
        if (file !== storyPath && file !== englishStoryPath) return;
        const module = server.moduleGraph.getModuleById(resolvedStoryModule);
        if (module) server.moduleGraph.invalidateModule(module);
        server.ws.send({ type: "full-reload" });
        return [];
      },
    },
    react({ include: /\.(jsx|tsx)$/ }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    host: "0.0.0.0",
    port,
    strictPort: false,
  },
});
