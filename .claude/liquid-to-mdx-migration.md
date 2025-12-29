# Jekyll Liquid to MDX Migration Guide

This document explains how to find and convert Jekyll/Liquid syntax to valid MDX in the `content/projects/` directory.

## 1. Finding Liquid Syntax

### Search Patterns

Use the Grep tool to search for these patterns:

```bash
# Jekyll include tags
pattern: "\{% *include"
path: content/projects/

# Liquid control flow tags
pattern: "\{%"
path: content/projects/

# Liquid output (distinguish from JSX {{}})
pattern: "\{\{ *[^{]"
path: content/projects/
```

### Important Notes

- `style={{textAlign: 'center'}}` is valid JSX (double curly braces)
- Only `{% ... %}` patterns are Liquid syntax that need conversion

## 2. Conversion Rules

### 2.1 Gallery Include → Gallery Component

**Before (Liquid):**
```liquid
{% include post-components/gallery.html
    columns = 2
    full_width = true
    images = "
        /images/img1.png,
        /images/img2.png
    "
    caption = "Description"
%}
```

**After (MDX):**
```jsx
<Gallery
  columns={2}
  fullWidth={true}
  images={["/images/img1.png", "/images/img2.png"]}
  caption="Description"
/>
```

**Conversion Points:**
- `columns = 2` → `columns={2}` (numbers use curly braces)
- `full_width = true` → `fullWidth={true}` (camelCase + curly braces)
- Comma-separated strings → array `{["...", "..."]}`
- Clean up quote formatting in attribute values

### 2.2 Video/YouTube Include → Video Component

**Before (Liquid):**
```liquid
{% include youtube-videos-carousel.html video_ids="abc123,def456" %}
```

**After (MDX):**
```jsx
<Video url="https://www.youtube.com/embed/abc123" caption="Video 1" />
<Video url="https://www.youtube.com/embed/def456" caption="Video 2" />
```

Or display single video only:
```jsx
<Video url="https://www.youtube.com/embed/abc123" />
```

### 2.3 Quote Include → Quote Component

**Before (Liquid):**
```liquid
{% include post-components/quote.html
    full_width = false
    background_color = "#FDF0E0"
    font_color = "#555"
    image = "/images/quote.png"
    text = "Quote text here"
    caption = "Source"
%}
```

**After (MDX):**
```jsx
<Quote
  fullWidth={false}
  backgroundColor="#FDF0E0"
  fontColor="#555"
  images="/images/quote.png"
  text="Quote text here"
  caption="Source"
/>
```

### 2.4 Store Badges Include → JSX Div

**Before (Liquid):**
```liquid
{% include store-badges.html
   url1="https://apps.apple.com/..."
   url2="microsoft-store-id"
   app_name="App Name"
   title="Download Title"
   description="Description text"
%}
```

**After (MDX):**
```jsx
<div style={{textAlign: 'center', margin: '2rem 0'}}>
  <p><strong>Download Title</strong></p>
  <p>Description text</p>
  <p>
    <a href="https://apps.apple.com/..." target="_blank">Mac App Store</a> |
    <a href="https://apps.microsoft.com/detail/microsoft-store-id" target="_blank">Microsoft Store</a>
  </p>
</div>
```

### 2.5 Capture/Endcapture → Direct JSX Conversion

**Before (Liquid):**
```liquid
{% capture embed_codes %}
<blockquote class="twitter-tweet">...</blockquote>
<blockquote class="twitter-tweet">...</blockquote>
{% endcapture %}
{% include social-posts-carousel.html embed_html=embed_codes %}
```

**After (MDX):**
Replace Twitter embeds with YouTube videos or static content:
```jsx
<Video url="https://www.youtube.com/embed/VIDEO_ID" caption="Related content" />
```

Or convert to static quote:
```jsx
<Quote text="Convert tweet content to a quote" />
```

## 3. Available MDX Components

Custom components available in this project:

| Component | Location | Props |
|-----------|----------|-------|
| `Gallery` | `components/mdx/gallery.tsx` | `columns`, `fullWidth`, `images`, `caption` |
| `Quote` | `components/mdx/quote.tsx` | `fullWidth`, `backgroundColor`, `fontColor`, `images`, `text`, `caption` |
| `Video` | `components/mdx/video.tsx` | `url`, `fullWidth`, `caption` |

## 4. Conversion Checklist

When converting a file, verify:

- [ ] All `{% include ... %}` tags are removed
- [ ] All `{% capture %}` / `{% endcapture %}` blocks are removed
- [ ] Attribute names are converted to camelCase (e.g., `full_width` → `fullWidth`)
- [ ] Numeric/boolean values are wrapped in curly braces (e.g., `columns={2}`, `fullWidth={true}`)
- [ ] Image arrays use correct format (e.g., `images={["...", "..."]}`)
- [ ] JSX style attributes use double curly braces (e.g., `style={{margin: '1rem'}}`)

## 5. Post-Conversion Verification

After conversion, open the page in dev server to check for MDX parsing errors:

```bash
npm run dev
# Open /projects/{slug} page in browser
```

If errors occur, check the line number shown in console and fix accordingly.
