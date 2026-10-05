import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "node_modules/**",
    "public/**",
    "_site/**",
    "js/**",
    "research/**",
    "docs/**",
    "migration/**",
    ".direnv/**",
    ".jekyll-cache/**",
    "next-env.d.ts",
  ]),
]);
