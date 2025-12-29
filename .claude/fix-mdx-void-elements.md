# MDX Void Elements Fix Guide

This document explains how to find and fix HTML void elements that need self-closing syntax in MDX files.

## The Problem

MDX uses JSX syntax, which requires void elements (elements without children) to be self-closing. Unlike HTML where `<img>` and `<br>` are valid, MDX/JSX requires `<img />` and `<br />`.

## Void Elements to Fix

These HTML elements must use self-closing syntax in MDX:

| Element | HTML (Invalid in MDX) | JSX (Valid in MDX) |
|---------|----------------------|-------------------|
| `img` | `<img src="...">` | `<img src="..." />` |
| `br` | `<br>` | `<br />` |
| `hr` | `<hr>` | `<hr />` |
| `input` | `<input type="text">` | `<input type="text" />` |
| `meta` | `<meta ...>` | `<meta ... />` |
| `link` | `<link ...>` | `<link ... />` |
| `area` | `<area ...>` | `<area ... />` |
| `base` | `<base ...>` | `<base ... />` |
| `col` | `<col ...>` | `<col ... />` |
| `embed` | `<embed ...>` | `<embed ... />` |
| `source` | `<source ...>` | `<source ... />` |
| `track` | `<track ...>` | `<track ... />` |
| `wbr` | `<wbr>` | `<wbr />` |

## 1. Finding Problematic Elements

### Search Patterns

Use the Grep tool to search for non-self-closing void elements:

```bash
# Find <img> tags without self-closing
pattern: "<img[^>]*[^/]>"
path: content/projects/
glob: "*.mdx"

# Find <br> tags without self-closing
pattern: "<br>"
path: content/projects/
glob: "*.mdx"

# Find <hr> tags without self-closing
pattern: "<hr>"
path: content/projects/
glob: "*.mdx"

# Find <input> tags without self-closing
pattern: "<input[^>]*[^/]>"
path: content/projects/
glob: "*.mdx"
```

## 2. Conversion Rules

### 2.1 Image Tags

**Before (Invalid):**
```html
<img src="https://example.com/image.png" alt="Description" height="24">
```

**After (Valid):**
```jsx
<img src="https://example.com/image.png" alt="Description" height="24" />
```

### 2.2 Line Breaks

**Before (Invalid):**
```html
<br>
```

**After (Valid):**
```jsx
<br />
```

### 2.3 Horizontal Rules

**Before (Invalid):**
```html
<hr>
```

**After (Valid):**
```jsx
<hr />
```

### 2.4 Input Elements

**Before (Invalid):**
```html
<input type="text" placeholder="Enter text">
```

**After (Valid):**
```jsx
<input type="text" placeholder="Enter text" />
```

## 3. Automated Fix Process

### Step 1: Find all MDX files
```bash
# List all MDX files in content/projects/
pattern: "*.mdx"
path: content/projects/
```

### Step 2: For each file, search and fix

For each MDX file:
1. Read the file content
2. Search for non-self-closing void elements
3. Add ` /` before the closing `>` for each match
4. Save the file

### Common Patterns to Fix

| Pattern | Replacement |
|---------|-------------|
| `<img ...>` (without `/`) | `<img ... />` |
| `<br>` | `<br />` |
| `<hr>` | `<hr />` |
| `<input ...>` (without `/`) | `<input ... />` |

## 4. Verification

After fixing, verify by running the dev server:

```bash
npm run dev
# Open /projects/{slug} in browser
# Check console for MDX parsing errors
```

### Common Error Messages

If you see errors like:
```
Unexpected closing tag `</a>`, expected corresponding closing tag for `<img>`
```

This means there's still a non-self-closing `<img>` tag that needs to be fixed.

## 5. Best Practices

1. **Use MDX components when possible**: Instead of raw HTML `<img>` tags, consider using the project's custom components like `<Gallery />` or markdown image syntax `![alt](src)`.

2. **Avoid inline HTML**: When possible, use markdown syntax or custom MDX components instead of inline HTML.

3. **Check nested tags**: Void elements inside `<a>`, `<div>`, or other elements also need self-closing syntax.

## 6. Execution Checklist

When running this fix on all MDX files:

- [ ] Find all `.mdx` files in `content/projects/`
- [ ] For each file, search for non-self-closing `<img>` tags
- [ ] For each file, search for non-self-closing `<br>` tags
- [ ] For each file, search for non-self-closing `<hr>` tags
- [ ] For each file, search for non-self-closing `<input>` tags
- [ ] Apply fixes using Edit tool
- [ ] Run `npm run dev` to verify no errors
