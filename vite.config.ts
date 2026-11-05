import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import tailwindcss from "@tailwindcss/vite";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import { fetchMediumFeed, mediumProfile } from "./scripts/medium-feed";
import mediumSnapshot from "./content/medium-feed.json";

const port = Number(process.env.PORT) || 3000;
const storyPath = fileURLToPath(new URL("./docs/home-narrative/home-story.ko.md", import.meta.url));
const englishStoryPath = fileURLToPath(new URL("./docs/home-narrative/home-story.en.md", import.meta.url));
const storyModule = "virtual:home-narrative";
const resolvedStoryModule = `\0${storyModule}`;

// MDX is compiled to React components at build time, so project/blog bodies ship
// as static modules in the bundle — no server or markdown runtime in the browser.
export default defineConfig({
  plugins: [
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
    {
      enforce: "pre",
      ...mdx({
        remarkPlugins: [
          remarkGfm,
          remarkFrontmatter,
          [remarkMdxFrontmatter, { name: "frontmatter" }],
        ],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark-default",
              keepBackground: false,
              defaultLang: { block: "plaintext", inline: "plaintext" },
            },
          ],
        ],
      }),
    },
    react({ include: /\.(jsx|tsx|mdx)$/ }),
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
