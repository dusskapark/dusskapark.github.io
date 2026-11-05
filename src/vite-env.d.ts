/// <reference types="vite/client" />

declare module "virtual:home-narrative" {
  const story: string;
  export const englishStory: string;
  export default story;
}

declare module "virtual:medium-writing" {
  export const profile: string;
  export const posts: import("../scripts/medium-feed").MediumPost[];
}

declare module "*.mdx" {
  import type { ComponentType } from "react";
  const MDXComponent: ComponentType<{
    components?: Record<string, ComponentType<unknown>>;
  }>;
  export default MDXComponent;
  export const frontmatter: Record<string, unknown>;
}
