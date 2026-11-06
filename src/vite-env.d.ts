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
