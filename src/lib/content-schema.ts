import type { ComponentType } from "react";

export type ContentKind = "project" | "post";

export interface ContentHeading {
  depth: number;
  text: string;
  id: string;
}

export interface ContentMetadata {
  kind: ContentKind;
  slug: string;
  title: string;
  description: string;
  date: string;
  lang: "en" | "ko";
  listed: boolean;
  hero: string;
  legacyPaths?: string[];
  titleLines?: string[];
  subtitle?: string;
  team?: string;
  role?: string;
  accentColor?: string;
  galleryImages?: string[];
  translationKey?: string;
  authors?: string[];
  sourceFile?: string;
  headings?: ContentHeading[];
}

/** A self-contained React content component. */
export type ContentBody = ComponentType;

export type ContentEntry = ContentMetadata & { Body: ContentBody };
