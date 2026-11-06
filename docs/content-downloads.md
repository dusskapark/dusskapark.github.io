# Download card rules

`AppDownloads` and `StoreLinks` are shared by all MDX download sections.

- Every store link uses the same 120 × 40 px badge frame, defined by `--store-badge-width` and `--store-badge-height` in `.content-store-links`. Do not override dimensions per page or store.
- Google Play's source image includes outer padding; the shared crop removes that padding within the same frame.
- One app: card width is at most 440 px, centered, with a 180 px image area.
- Multiple apps: two equal columns, each with the same 280 px image area. Switch to one column on small screens.
- All cards use the shared shadcn/ui Card structure. Store-specific content belongs inside the common badge frame.
