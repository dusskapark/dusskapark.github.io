# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm install     # Install dependencies
npm run dev     # Start development server with Turbopack (http://localhost:3000)
npm run build   # Build for production
npm run start   # Run production build
npm run lint    # Run ESLint
```

## Architecture Overview

This is a **Next.js 16 portfolio site** using the App Router, React 19, Tailwind CSS, and shadcn/ui.

### Dual System

The repository contains both Jekyll (legacy, `_` prefixed directories) and Next.js (active). All development should focus on the Next.js implementation.

### Key Directories

- `app/` - Next.js App Router pages and layouts
- `content/projects/` - MDX files for project detail content
- `data/projects.json` - Project metadata (slug, title, date, featured_image, visibility)
- `components/ui/` - shadcn/ui components (Button, Card, Badge)
- `components/mdx/` - Custom MDX components (Gallery, Quote, Video)
- `lib/mdx.ts` - MDX content loading utilities
- `types/project.ts` - Project TypeScript interface
- `public/` - Static assets
- `images/` - Project images (organized by `images/projects/{year}-{slug}/`)

### Data Flow

1. **Homepage** (`app/page.tsx`): Imports `data/projects.json`, filters visible projects, renders `ProjectCard` components
2. **Project Pages** (`app/projects/[slug]/page.tsx`): Uses `generateStaticParams()` for SSG, loads MDX content via `lib/mdx.ts`, renders with `MDXRemote`

### MDX Content System

Project detail pages use MDX with gray-matter frontmatter:

```mdx
---
title: "Project Title"
subtitle: "Category (Year)"
date: 2024-01-01
description: "Brief description"
featured_image: "/images/projects/2024-slug/hero.png"
team: "Team info"
role: "Your role"
---

## Section

<Gallery columns={2} images={["/img1.png", "/img2.png"]} caption="Description" />
<Quote text="Quote text<br/>with HTML" backgroundColor="#FDF0E0" />
<Video url="https://youtube.com/embed/ID" />
```

### Adding a New Project

1. Add entry to `data/projects.json` with unique slug
2. Create `content/projects/{slug}.mdx` with frontmatter
3. Add images to `images/projects/{year}-{slug}/`

### Styling

- Uses CSS variables for theming (see `app/globals.css`)
- shadcn/ui color system: `primary`, `secondary`, `muted`, `accent`, `destructive`
- Tailwind typography plugin for MDX prose styling
- Use `cn()` from `lib/utils.ts` for conditional class merging
