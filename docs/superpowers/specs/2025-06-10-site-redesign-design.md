# tyeetale Site Redesign — Design Spec

**Date:** 2025-06-10  
**Status:** Draft  
**Stack:** Vite + React + TypeScript + TailwindCSS + Shadcn/ui + React Router

---

## Overview

A complete redesign of tyeetale.vercel.app from a split-panel portfolio with image previews to a text-forward, minimalist personal site inspired by jarocki.me/work. Two levels: a single-page homepage with all content, and project detail pages accessible via navigation.

---

## Design Principles

- Text-forward: no images on the homepage surface
- Minimal: content speaks, no decoration
- Readable: Outfit for headers, Geist for body text
- Dark mode default with light/dark/system toggle
- Mobile-first, works well on both mobile and desktop
- Centered, contained layout (max-width ~640px)

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Build | Vite |
| Framework | React 18+ |
| Language | TypeScript |
| Styling | TailwindCSS v4 + Shadcn/ui |
| Routing | React Router v6 |
| Content | MDX via `@mdx-js/rollup` (reuse existing project MDX files) |
| Fonts | Outfit (Google Fonts, headers), Geist (Vercel, body) |
| Icons | Lucide React (social icons, theme toggle icons) |
| SEO | react-helmet-async (meta tags, OG tags per page) |
| Theming | Class-based dark/light/system toggle (TailwindCSS `darkMode: 'class'`) |
| Deploy | Vercel (static SPA) |
| Package Manager | bun |

---

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — intro, other projects, timeline, past projects, footer |
| `/projects/:slug` | Project detail — narrative writeup + photos (Tildenn, Coopsight, Metaphor3D, Fibes) |
| `/qr` | QR code page — scannable QR that links back to homepage |
| `/llms.txt` | Static text file — LLM-readable version of site content |

---

## Homepage Sections (in order)

### 1. Header
- Left: "tyeetale" wordmark (Outfit bold)
- Right: Theme toggle — 3 icon buttons in a pill (Sun / Moon / Monitor) using Lucide icons. Active state highlighted with background.

### 2. Intro
- Single paragraph, no heading:
  > Hi, I'm Thomas, an operator and builder. I build AI systems, data infrastructure, and products. Currently helping rockets pencil out at Blue Origin. The rest of my time goes to shipping AI that gives people superpowers.

### 3. Other Projects
- Section heading: "OTHER PROJECTS" (uppercase, small, Outfit)
- Simple list, each row: linked project name + one-line description
- Items:
  - **Onsite** ↗ — "AI business brain for contractors" → getonsiteai.com
  - **Mosslayer** ↗ — "Agentic payments & intent mapping" → mosslayer.com

### 4. Timeline
- Section heading: "TIMELINE" (uppercase, small, Outfit)
- Vertical line on the left with dot indicators
- Green dot for current position (Blue Origin)
- Grey dots for past entries
- Each entry: date range / company name (linked) / title / one-liner description
- Entries:
  1. **2024 / now** — Blue Origin ↗ (→ blueorigin.com/new-glenn) — Data Engineer — "Data infrastructure for New Glenn financial planning & cost analysis"
  2. **2022 / 2024** — Tildenn (→ /projects/tildenn) — Founder & Engineer — "AI travel planner, built at the dawn of GPT-3"
  3. **2018 / 2022** — Coopsight (→ /projects/coopsight) — Software Engineer — "ML-powered startup ecosystem matching"
  4. **2018 / 2022** — NYU Shanghai ↗ (→ shanghai.nyu.edu) — BS Finance, Data Analysis — "Business Analytics & Marketing, Merit Scholar"

### 5. Past Projects
- Section heading: "PAST PROJECTS" (uppercase, small, Outfit)
- Same list style as Other Projects
- Items:
  - **Metaphor3D** (→ /projects/metaphor3d) — "AI-generated 3D mesh assets"
  - **Fibes** (→ /projects/fibes) — "UGC influencer platform"

### 6. Footer
- Top border separator
- Left: Social icon links (Lucide icons for: Email, X/Twitter, GitHub, LinkedIn)
- Right: Human/Machine toggle pill + QR button
  - Human/Machine: pill toggle, "human" active by default (shows page), "machine" navigates to /llms.txt
  - QR: small button linking to /qr

---

## Project Detail Pages (`/projects/:slug`)

### Layout
- Same centered container (max-width 640px)
- Header with "tyeetale" branding + theme toggle (same as homepage)
- Back link to homepage ("← back" or similar)

### Content
- Project title (Outfit, large)
- One-line tagline/slogan
- Technology badges (if relevant)
- MDX narrative content — focused on problems solved, skill growth, impact
- Embedded images within the narrative (same as current site, rendered from MDX)
- Images: rounded corners, responsive, lazy-loaded

### Active projects with detail pages:
- **Tildenn** — existing MDX content, narrative cleaned up to focus on problems/growth
- **Coopsight** — existing MDX content, narrative cleaned up
- **Metaphor3D** — existing MDX content, narrative cleaned up
- **Fibes** — existing MDX content (renamed from "Get Fibes"), narrative cleaned up

### Archived (not rendered, kept in codebase):
- NYU Course Search
- Deshihou

---

## QR Code Page (`/qr`)

- Minimal page with centered QR code
- QR encodes the homepage URL (tyeetale.vercel.app or custom domain)
- Generated client-side via a QR library (e.g., `qrcode.react`)
- Purpose: quick sharing — scan to visit the site

---

## LLMS.txt (`/llms.txt`)

- Static text file served at the root
- Contains a machine-readable summary of Thomas's info: name, role, skills, projects, links
- Follows the llms.txt convention for AI discoverability
- Accessible via the "machine" toggle in the footer

---

## Theme System

- Three modes: light, dark, system
- Default: dark
- Toggle: icon pill in header (Sun = light, Moon = dark, Monitor = system)
- Implementation: class on `<html>` element (`class="dark"` / `class="light"` / read `prefers-color-scheme`)
- Persist preference in localStorage
- TailwindCSS `darkMode: 'class'`

### Color Tokens (approximate)
| Token | Dark | Light |
|-------|------|-------|
| Background | #0a0a0a | #fafafa |
| Text primary | #e5e5e5 | #171717 |
| Text secondary | #a3a3a3 | #525252 |
| Text muted | #555555 | #a3a3a3 |
| Border | #1a1a1a | #e5e5e5 |
| Accent (current) | #4ade80 | #16a34a |
| Surface | #1a1a1a | #f5f5f5 |

---

## Typography

| Element | Font | Weight | Size |
|---------|------|--------|------|
| Branding ("tyeetale") | Outfit | 700 | 1rem |
| Section headings | Outfit | 600 | 0.8rem, uppercase, tracked |
| Project/company names | Geist | 400 | 0.95rem |
| Body text | Geist | 400 | 0.95rem |
| Descriptions/muted | Geist | 400 | 0.8-0.85rem |
| Date labels | Geist | 400 | 0.75rem |

---

## Responsive Design

- Max-width container: 640px on desktop, centered
- On mobile (<640px): full-width with horizontal padding (1rem-1.5rem)
- Timeline: stacks naturally (already vertical)
- Project list descriptions: wrap below name on narrow screens
- Footer: stack vertically on very narrow screens if needed
- All touch targets: minimum 44px

---

## SEO

- `react-helmet-async` for per-page meta tags
- Homepage: title "Thomas Yee — tyeetale", description from intro text
- Project pages: title "Project Name — tyeetale", description from project slogan
- Open Graph tags (og:title, og:description, og:image) on all pages
- Existing og.png can be reused or updated
- Canonical URLs

---

## File/Folder Structure (proposed)

```
tyeetale-site/
├── src/
│   ├── main.tsx                  # Entry point
│   ├── App.tsx                   # Router setup
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx        # tyeetale branding + theme toggle
│   │   │   ├── Footer.tsx        # Social icons + human/machine + QR
│   │   │   └── Container.tsx     # Centered max-width wrapper
│   │   ├── home/
│   │   │   ├── Intro.tsx         # Intro paragraph
│   │   │   ├── OtherProjects.tsx # Onsite, Mosslayer list
│   │   │   ├── Timeline.tsx      # Timeline with vertical line
│   │   │   └── PastProjects.tsx  # Metaphor3D, Fibes list
│   │   ├── project/
│   │   │   └── ProjectDetail.tsx # MDX renderer for detail pages
│   │   ├── theme/
│   │   │   └── ThemeToggle.tsx   # Sun/Moon/Monitor toggle
│   │   └── ui/                   # Shadcn/ui primitives
│   ├── content/
│   │   └── projects/             # MDX files (migrated from current)
│   │       ├── tildenn.mdx
│   │       ├── coopsight.mdx
│   │       ├── metaphor3d.mdx
│   │       └── fibes.mdx
│   ├── pages/
│   │   ├── Home.tsx              # Homepage
│   │   ├── Project.tsx           # Project detail page
│   │   └── QR.tsx                # QR code page
│   ├── lib/
│   │   ├── theme.ts             # Theme utilities
│   │   └── seo.ts              # SEO/meta tag helpers
│   ├── styles/
│   │   └── globals.css          # Tailwind directives, font imports
│   └── data/
│       ├── timeline.ts          # Timeline entries data
│       ├── projects.ts          # Project metadata
│       └── links.ts             # External links, social URLs
├── public/
│   ├── assets/                  # Project images (migrated)
│   ├── fonts/                   # Geist font files (if self-hosted)
│   ├── llms.txt                 # LLM-readable content
│   ├── og.png                   # Open Graph image
│   └── favicon.ico
├── index.html                   # Vite entry HTML
├── vite.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── components.json              # Shadcn/ui config
└── package.json
```

---

## Migration Notes

- Existing MDX files from `src/content/projects/` will be migrated with narrative edits (focus on problems solved, skill growth)
- Existing images from `public/assets/` carry over as-is
- "Get Fibes" renamed to "Fibes" everywhere
- NYU Course Search and Deshihou MDX files moved to an `archive/` folder (not deleted)
- The nested `tyeetale-website/` folder can be removed (superseded by this redesign)
- Current Contentlayer setup replaced by `@mdx-js/rollup`

---

## Out of Scope

- Blog/notes section (can be added later)
- Contact form
- Analytics (can be added later with Vercel Analytics or similar)
- Custom domain setup (deployment config stays as-is)
