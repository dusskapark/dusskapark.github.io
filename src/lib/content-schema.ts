import { z } from "zod";

export const contentKindSchema = z.enum(["project", "post"]);
export const headingSchema = z.object({
  depth: z.number().int().min(1).max(6),
  text: z.string().min(1),
  id: z.string().min(1),
});
export const contentMetadataSchema = z.object({
  kind: contentKindSchema,
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  title: z.string().min(1),
  description: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .refine(
      (value) => !Number.isNaN(Date.parse(value)),
      "Must be a valid date",
    ),
  lang: z.enum(["en", "ko"]),
  listed: z.boolean().default(true),
  hero: z
    .string()
    .min(1)
    .refine(
      (value) => value.startsWith("/images/") || /^https:\/\//.test(value),
      "Use a /images/ path or an https URL",
    ),
  legacyPaths: z.array(z.string().startsWith("/")).default([]),
  titleLines: z.array(z.string()).optional(),
  subtitle: z.string().optional(),
  team: z.string().optional(),
  role: z.string().optional(),
  accentColor: z
    .string()
    .regex(/^#[\da-f]{3,8}$/i)
    .optional(),
  galleryImages: z.array(z.string()).optional(),
  translationKey: z.string().optional(),
  authors: z.array(z.string()).optional(),
  sourceFile: z.string().optional(),
  headings: z.array(headingSchema).default([]),
});
export type ContentKind = z.infer<typeof contentKindSchema>;
export type ContentMetadata = z.infer<typeof contentMetadataSchema>;
export type ContentHeading = z.infer<typeof headingSchema>;
export type ContentEntry = ContentMetadata & { body: string };
