# tyeetale Site Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild tyeetale.vercel.app as a minimalist, text-forward personal site with Vite + React + Shadcn/ui.

**Architecture:** Single-page app with React Router. Homepage shows intro/timeline/projects as text. Project detail pages render MDX content with embedded images. Theme toggle (dark/light/system) persists via localStorage. Static files (llms.txt, og.png) served from public/.

**Tech Stack:** Vite, React 18, TypeScript, TailwindCSS v4, Shadcn/ui, React Router v6, @mdx-js/rollup, react-helmet-async, Lucide React, qrcode.react, bun

---

## File Structure

```
src/
├── main.tsx                    # React entry, mounts App
├── App.tsx                     # HelmetProvider + BrowserRouter + Routes
├── components/
│   ├── layout/
│   │   ├── Header.tsx          # "tyeetale" branding + ThemeToggle
│   │   ├── Footer.tsx          # Social icons + human/machine toggle + QR link
│   │   └── Container.tsx       # max-w-[640px] centered wrapper
│   ├── home/
│   │   ├── Intro.tsx           # Intro paragraph
│   │   ├── OtherProjects.tsx   # Onsite, Mosslayer linked list
│   │   ├── Timeline.tsx        # Vertical timeline with dots + line
│   │   └── PastProjects.tsx    # Metaphor3D, Fibes linked list
│   ├── project/
│   │   └── ProjectDetail.tsx   # Back link + title + tagline + badges + MDX
│   └── theme/
│       └── ThemeToggle.tsx     # Sun/Moon/Monitor icon pill
├── pages/
│   ├── Home.tsx                # Composes homepage sections
│   ├── Project.tsx             # Loads MDX by slug, renders ProjectDetail
│   └── QR.tsx                  # QR code page
├── content/
│   └── projects/
│       ├── tildenn.mdx         # Migrated + cleaned up
│       ├── coopsight.mdx       # Migrated + cleaned up
│       ├── metaphor3d.mdx      # Migrated + cleaned up
│       └── fibes.mdx           # Renamed from get-fibes, cleaned up
├── data/
│   ├── timeline.ts             # Timeline entries array
│   ├── projects.ts             # Project metadata (slug, title, tagline, badges)
│   └── links.ts                # Social URLs, external project URLs
├── lib/
│   └── theme.ts                # Theme context + localStorage logic
├── styles/
│   └── globals.css             # Tailwind directives, @font-face, CSS variables
├── archive/
│   ├── nyu-course-search.mdx   # Archived, not rendered
│   └── deshihou.mdx            # Archived, not rendered
public/
├── assets/                     # Project images (existing, unchanged)
│   ├── tildenn/
│   ├── metaphor3d/
│   ├── get-fibes/
│   └── coopsight/
├── fonts/
│   └── GeistVF.woff2           # Geist variable font
├── llms.txt                    # LLM-readable site info
├── og.png                      # Open Graph image (existing)
└── favicon.ico                 # Existing
index.html                      # Vite HTML entry
vite.config.ts
tailwind.config.ts
tsconfig.json
components.json                 # Shadcn/ui config
package.json
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `tailwind.config.ts`, `components.json`, `src/main.tsx`, `src/App.tsx`, `src/styles/globals.css`

- [ ] **Step 1: Initialize the project with bun**

```bash
cd /Users/thomasyee/Documents/projects/tyeetale/tyeetale-site
# Remove old source files (keep public/assets, public/og.png, public/favicon.ico)
rm -rf src node_modules .next .contentlayer contentlayer.config.js next.config.js tailwind.config.js tsconfig.json package.json yarn.lock components.json tyeetale-website
```

- [ ] **Step 2: Create package.json**

```json
{
  "name": "tyeetale-site",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^6.23.1",
    "react-helmet-async": "^2.0.5",
    "lucide-react": "^0.400.0",
    "qrcode.react": "^3.1.0",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@mdx-js/rollup": "^3.0.1",
    "@vitejs/plugin-react": "^4.3.1",
    "autoprefixer": "^10.4.19",
    "postcss": "^8.4.38",
    "tailwindcss": "^3.4.4",
    "typescript": "^5.5.2",
    "vite": "^5.3.1",
    "remark-frontmatter": "^5.0.0",
    "remark-mdx-frontmatter": "^4.0.0"
  }
}
```

- [ ] **Step 3: Create vite.config.ts**

```typescript
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "@mdx-js/rollup";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";
import path from "path";

export default defineConfig({
  plugins: [
    mdx({
      remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

- [ ] **Step 4: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src", "*.d.ts"]
}
```

- [ ] **Step 5: Create tailwind.config.ts**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Outfit", "sans-serif"],
        body: ["Geist", "sans-serif"],
      },
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        muted: "var(--color-muted)",
        "muted-foreground": "var(--color-muted-foreground)",
        border: "var(--color-border)",
        accent: "var(--color-accent)",
        surface: "var(--color-surface)",
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 6: Create src/styles/globals.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url("https://fonts.googleapis.com/css2?family=Outfit:wght@600;700&display=swap");

@font-face {
  font-family: "Geist";
  src: url("/fonts/GeistVF.woff2") format("woff2");
  font-weight: 100 900;
  font-display: swap;
}

@layer base {
  :root {
    --color-background: #fafafa;
    --color-foreground: #171717;
    --color-muted: #a3a3a3;
    --color-muted-foreground: #525252;
    --color-border: #e5e5e5;
    --color-accent: #16a34a;
    --color-surface: #f5f5f5;
  }

  .dark {
    --color-background: #0a0a0a;
    --color-foreground: #e5e5e5;
    --color-muted: #555555;
    --color-muted-foreground: #a3a3a3;
    --color-border: #1a1a1a;
    --color-accent: #4ade80;
    --color-surface: #1a1a1a;
  }

  body {
    @apply bg-background text-foreground font-body antialiased;
  }
}
```

- [ ] **Step 7: Create index.html**

```html
<!DOCTYPE html>
<html lang="en" class="dark">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thomas Yee — tyeetale</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Create src/main.tsx**

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 9: Create src/App.tsx (minimal, routes added later)**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
```

- [ ] **Step 10: Create components.json for Shadcn/ui**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/styles/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

- [ ] **Step 11: Create mdx.d.ts type declarations**

Create `mdx.d.ts` in project root:

```typescript
declare module "*.mdx" {
  import type { ComponentType } from "react";
  export const frontmatter: Record<string, unknown>;
  const Component: ComponentType;
  export default Component;
}
```

- [ ] **Step 12: Install dependencies and verify build**

```bash
bun install
```

- [ ] **Step 13: Download Geist font**

```bash
mkdir -p public/fonts
curl -L -o public/fonts/GeistVF.woff2 "https://github.com/vercel/geist-font/raw/main/packages/next/dist/fonts/geist-sans/Geist-Regular.woff2"
```

Note: If this URL doesn't work, download from https://vercel.com/font and place GeistVF.woff2 in public/fonts/.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "feat: scaffold vite + react + tailwind project"
```

---

### Task 2: Theme System

**Files:**
- Create: `src/lib/theme.ts`, `src/components/theme/ThemeToggle.tsx`

- [ ] **Step 1: Create src/lib/theme.ts**

```typescript
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import React from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  const resolved = theme === "system" ? getSystemTheme() : theme;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    const stored = localStorage.getItem("theme") as Theme | null;
    return stored ?? "dark";
  });

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => {
      if (theme === "system") applyTheme("system");
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme]);

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, setTheme } },
    children
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
```

- [ ] **Step 2: Create src/components/theme/ThemeToggle.tsx**

```tsx
import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "light" as const, icon: Sun },
    { value: "dark" as const, icon: Moon },
    { value: "system" as const, icon: Monitor },
  ];

  return (
    <div className="flex gap-0.5 bg-surface rounded-md p-0.5">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-1.5 rounded transition-colors ${
            theme === value
              ? "bg-border text-foreground"
              : "text-muted hover:text-muted-foreground"
          }`}
          aria-label={`Switch to ${value} theme`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add theme system with dark/light/system toggle"
```

---

### Task 3: Layout Components

**Files:**
- Create: `src/components/layout/Container.tsx`, `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`
- Create: `src/data/links.ts`
- Create: `src/lib/utils.ts`

- [ ] **Step 1: Create src/lib/utils.ts**

```typescript
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

- [ ] **Step 2: Create src/data/links.ts**

```typescript
export const socialLinks = [
  { label: "Email", href: "mailto:tyeetale@gmail.com", icon: "Mail" },
  { label: "X", href: "https://x.com/tyeetale", icon: "Twitter" },
  { label: "GitHub", href: "https://github.com/tyeetale", icon: "Github" },
  { label: "LinkedIn", href: "https://linkedin.com/in/tyeetale", icon: "Linkedin" },
] as const;

export const externalLinks = {
  blueOrigin: "https://www.blueorigin.com/new-glenn",
  nyuShanghai: "https://shanghai.nyu.edu/",
  onsite: "https://getonsiteai.com",
  mosslayer: "https://mosslayer.com",
} as const;
```

- [ ] **Step 3: Create src/components/layout/Container.tsx**

```tsx
import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 sm:px-6 py-8 sm:py-12">
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Create src/components/layout/Header.tsx**

```tsx
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center justify-between pb-4 mb-10 border-b border-border">
      <Link to="/" className="font-heading font-bold text-base text-foreground tracking-tight">
        tyeetale
      </Link>
      <ThemeToggle />
    </header>
  );
}
```

- [ ] **Step 5: Create src/components/layout/Footer.tsx**

```tsx
import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { socialLinks } from "@/data/links";

const iconMap = {
  Mail,
  Twitter,
  Github,
  Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border pt-5 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex gap-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              <Icon size={16} />
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <HumanMachineToggle />
        <Link
          to="/qr"
          className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
        >
          QR
        </Link>
      </div>
    </footer>
  );
}

function HumanMachineToggle() {
  const isHuman = !window.location.pathname.includes("llms.txt");

  return (
    <div className="flex gap-0.5 bg-surface rounded-md p-0.5 text-xs">
      <Link
        to="/"
        className={`px-2 py-0.5 rounded transition-colors ${
          isHuman
            ? "bg-border text-foreground"
            : "text-muted hover:text-muted-foreground"
        }`}
      >
        human
      </Link>
      <a
        href="/llms.txt"
        className={`px-2 py-0.5 rounded transition-colors ${
          !isHuman
            ? "bg-border text-foreground"
            : "text-muted hover:text-muted-foreground"
        }`}
      >
        machine
      </a>
    </div>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add layout components (Header, Footer, Container)"
```

---

### Task 4: Homepage Sections

**Files:**
- Create: `src/components/home/Intro.tsx`, `src/components/home/OtherProjects.tsx`, `src/components/home/Timeline.tsx`, `src/components/home/PastProjects.tsx`
- Create: `src/data/timeline.ts`, `src/data/projects.ts`
- Create: `src/pages/Home.tsx`

- [ ] **Step 1: Create src/data/timeline.ts**

```typescript
import { externalLinks } from "./links";

export interface TimelineEntry {
  dateRange: string;
  company: string;
  href: string;
  external: boolean;
  title: string;
  description: string;
  current: boolean;
}

export const timeline: TimelineEntry[] = [
  {
    dateRange: "2024 / now",
    company: "Blue Origin",
    href: externalLinks.blueOrigin,
    external: true,
    title: "Data Engineer",
    description: "Data infrastructure for New Glenn financial planning & cost analysis",
    current: true,
  },
  {
    dateRange: "2022 / 2024",
    company: "Tildenn",
    href: "/projects/tildenn",
    external: false,
    title: "Founder & Engineer",
    description: "AI travel planner, built at the dawn of GPT-3",
    current: false,
  },
  {
    dateRange: "2018 / 2022",
    company: "Coopsight",
    href: "/projects/coopsight",
    external: false,
    title: "Software Engineer",
    description: "ML-powered startup ecosystem matching",
    current: false,
  },
  {
    dateRange: "2018 / 2022",
    company: "NYU Shanghai",
    href: externalLinks.nyuShanghai,
    external: true,
    title: "BS Finance, Data Analysis",
    description: "Business Analytics & Marketing, Merit Scholar",
    current: false,
  },
];
```

- [ ] **Step 2: Create src/data/projects.ts**

```typescript
import { externalLinks } from "./links";

export interface ProjectEntry {
  name: string;
  slug: string;
  description: string;
  href: string;
  external: boolean;
}

export const otherProjects: ProjectEntry[] = [
  {
    name: "Onsite",
    slug: "onsite",
    description: "AI business brain for contractors",
    href: externalLinks.onsite,
    external: true,
  },
  {
    name: "Mosslayer",
    slug: "mosslayer",
    description: "Agentic payments & intent mapping",
    href: externalLinks.mosslayer,
    external: true,
  },
];

export const pastProjects: ProjectEntry[] = [
  {
    name: "Metaphor3D",
    slug: "metaphor3d",
    description: "AI-generated 3D mesh assets",
    href: "/projects/metaphor3d",
    external: false,
  },
  {
    name: "Fibes",
    slug: "fibes",
    description: "UGC influencer platform",
    href: "/projects/fibes",
    external: false,
  },
];
```

- [ ] **Step 3: Create src/components/home/Intro.tsx**

```tsx
export function Intro() {
  return (
    <section className="mb-12">
      <p className="text-muted-foreground text-[0.95rem] leading-relaxed">
        Hi, I'm Thomas, an operator and builder. I build AI systems, data
        infrastructure, and products. Currently helping rockets pencil out at
        Blue Origin. The rest of my time goes to shipping AI that gives people
        superpowers.
      </p>
    </section>
  );
}
```

- [ ] **Step 4: Create src/components/home/OtherProjects.tsx**

```tsx
import { ExternalLink } from "lucide-react";
import { otherProjects } from "@/data/projects";

export function OtherProjects() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-4">
        Other Projects
      </h2>
      <div className="flex flex-col gap-2.5">
        {otherProjects.map((project) => (
          <div
            key={project.slug}
            className="flex items-baseline justify-between gap-4"
          >
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground text-[0.9rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-1"
            >
              {project.name}
              <ExternalLink size={12} className="text-muted" />
            </a>
            <span className="text-muted text-[0.8rem] text-right">
              {project.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Create src/components/home/Timeline.tsx**

```tsx
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { timeline } from "@/data/timeline";

export function Timeline() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-6">
        Timeline
      </h2>
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-border to-transparent" />

        {timeline.map((entry, idx) => (
          <div
            key={idx}
            className={`relative ${idx < timeline.length - 1 ? "mb-8" : ""}`}
          >
            {/* Dot */}
            <div
              className={`absolute -left-6 top-1.5 w-2 h-2 rounded-full border-2 border-background ${
                entry.current ? "bg-accent" : "bg-muted"
              }`}
            />

            <div className="flex flex-col gap-0.5">
              <span className="text-muted text-xs">{entry.dateRange}</span>
              {entry.external ? (
                <a
                  href={entry.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground text-[0.95rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors inline-flex items-center gap-1 w-fit"
                >
                  {entry.company}
                  <ExternalLink size={12} className="text-muted" />
                </a>
              ) : (
                <Link
                  to={entry.href}
                  className="text-foreground text-[0.95rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors w-fit"
                >
                  {entry.company}
                </Link>
              )}
              <span className="text-muted-foreground text-[0.85rem]">
                {entry.title}
              </span>
              <span className="text-muted text-[0.8rem]">
                {entry.description}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Create src/components/home/PastProjects.tsx**

```tsx
import { Link } from "react-router-dom";
import { pastProjects } from "@/data/projects";

export function PastProjects() {
  return (
    <section className="mb-12">
      <h2 className="font-heading font-semibold text-xs uppercase tracking-widest text-foreground mb-4">
        Past Projects
      </h2>
      <div className="flex flex-col gap-2.5">
        {pastProjects.map((project) => (
          <div
            key={project.slug}
            className="flex items-baseline justify-between gap-4"
          >
            <Link
              to={project.href}
              className="text-foreground text-[0.9rem] underline underline-offset-[3px] decoration-border hover:decoration-foreground transition-colors"
            >
              {project.name}
            </Link>
            <span className="text-muted text-[0.8rem] text-right">
              {project.description}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Create src/pages/Home.tsx**

```tsx
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Intro } from "@/components/home/Intro";
import { OtherProjects } from "@/components/home/OtherProjects";
import { Timeline } from "@/components/home/Timeline";
import { PastProjects } from "@/components/home/PastProjects";

export function Home() {
  return (
    <>
      <Helmet>
        <title>Thomas Yee — tyeetale</title>
        <meta
          name="description"
          content="Thomas Yee — operator and builder. AI systems, data infrastructure, and products."
        />
        <meta property="og:title" content="Thomas Yee — tyeetale" />
        <meta
          property="og:description"
          content="Operator and builder. AI systems, data infrastructure, and products."
        />
        <meta property="og:image" content="/og.png" />
        <meta property="og:type" content="website" />
      </Helmet>
      <Container>
        <Header />
        <Intro />
        <OtherProjects />
        <Timeline />
        <PastProjects />
        <Footer />
      </Container>
    </>
  );
}
```

- [ ] **Step 8: Verify homepage renders**

```bash
bun run dev
```

Open http://localhost:5173 and verify the homepage displays with all sections.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: implement homepage sections (intro, timeline, projects)"
```

---

### Task 5: Project Detail Pages + MDX

**Files:**
- Create: `src/content/projects/tildenn.mdx`, `src/content/projects/coopsight.mdx`, `src/content/projects/metaphor3d.mdx`, `src/content/projects/fibes.mdx`
- Create: `src/archive/nyu-course-search.mdx`, `src/archive/deshihou.mdx`
- Create: `src/components/project/ProjectDetail.tsx`
- Create: `src/pages/Project.tsx`
- Modify: `src/App.tsx` (add route)

- [ ] **Step 1: Migrate MDX files**

Copy the 4 active project MDX files from the old `src/content/projects/` into the new `src/content/projects/`. Rename `get-fibes.mdx` to `fibes.mdx`. Update the frontmatter title from "Get Fibes" to "Fibes".

Archive `nyu-course-search.mdx` and `deshihou.mdx` into `src/archive/`.

For the active MDX files, keep the images and narrative structure but update frontmatter to a simpler schema:

```yaml
---
title: Tildenn
tagline: The Flexible Travel App
description: AI travel planner built at the dawn of GPT-3
badges:
  - AI
  - Travel
  - Mobile
---
```

Repeat for coopsight, metaphor3d, fibes. Keep the narrative body text and images as-is for now (content cleanup is a separate editorial pass).

- [ ] **Step 2: Create src/components/project/ProjectDetail.tsx**

```tsx
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface ProjectDetailProps {
  title: string;
  tagline: string;
  badges?: string[];
  children: ReactNode;
}

export function ProjectDetail({
  title,
  tagline,
  badges,
  children,
}: ProjectDetailProps) {
  return (
    <div>
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} />
        back
      </Link>

      <h1 className="font-heading font-bold text-2xl text-foreground mb-1">
        {title}
      </h1>
      <p className="text-muted-foreground text-[0.95rem] mb-4">{tagline}</p>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {badges.map((badge) => (
            <span
              key={badge}
              className="text-xs px-2 py-0.5 rounded bg-surface text-muted-foreground border border-border"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      <article className="prose prose-neutral dark:prose-invert prose-sm max-w-none [&_img]:rounded-lg [&_img]:border [&_img]:border-border">
        {children}
      </article>
    </div>
  );
}
```

- [ ] **Step 3: Create src/pages/Project.tsx**

```tsx
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ProjectDetail } from "@/components/project/ProjectDetail";
import { lazy, Suspense } from "react";

const projects = {
  tildenn: lazy(() => import("@/content/projects/tildenn.mdx")),
  coopsight: lazy(() => import("@/content/projects/coopsight.mdx")),
  metaphor3d: lazy(() => import("@/content/projects/metaphor3d.mdx")),
  fibes: lazy(() => import("@/content/projects/fibes.mdx")),
} as Record<string, React.LazyExoticComponent<React.ComponentType<any>>>;

const projectMeta: Record<string, { title: string; tagline: string; badges: string[] }> = {
  tildenn: {
    title: "Tildenn",
    tagline: "The Flexible Travel App",
    badges: ["AI", "Travel", "Mobile"],
  },
  coopsight: {
    title: "Coopsight",
    tagline: "Startup Ecosystem Matchmaker",
    badges: ["ML", "Startups", "B2B"],
  },
  metaphor3d: {
    title: "Metaphor3D",
    tagline: "AI 3D Generated Assets",
    badges: ["Generative AI", "3D", "Three.js"],
  },
  fibes: {
    title: "Fibes",
    tagline: "Organic Influencer Affiliate Platform",
    badges: ["Social Media", "UGC", "Marketing"],
  },
};

export function Project() {
  const { slug } = useParams<{ slug: string }>();

  if (!slug || !projects[slug]) {
    return (
      <Container>
        <Header />
        <p className="text-muted-foreground">Project not found.</p>
        <Footer />
      </Container>
    );
  }

  const MDXContent = projects[slug];
  const meta = projectMeta[slug];

  return (
    <>
      <Helmet>
        <title>{meta.title} — tyeetale</title>
        <meta name="description" content={meta.tagline} />
        <meta property="og:title" content={`${meta.title} — tyeetale`} />
        <meta property="og:description" content={meta.tagline} />
        <meta property="og:image" content="/og.png" />
      </Helmet>
      <Container>
        <Header />
        <ProjectDetail title={meta.title} tagline={meta.tagline} badges={meta.badges}>
          <Suspense fallback={<p className="text-muted">Loading...</p>}>
            <MDXContent />
          </Suspense>
        </ProjectDetail>
        <Footer />
      </Container>
    </>
  );
}
```

- [ ] **Step 4: Update src/App.tsx to add project route**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<Project />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
```

- [ ] **Step 5: Add @tailwindcss/typography for prose classes**

```bash
bun add -d @tailwindcss/typography
```

Update `tailwind.config.ts` plugins array:

```typescript
import typography from "@tailwindcss/typography";
// ... in config:
plugins: [typography],
```

- [ ] **Step 6: Verify project detail page renders**

```bash
bun run dev
```

Navigate to http://localhost:5173/projects/tildenn and verify the project detail page displays with the MDX content and images.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add project detail pages with MDX rendering"
```

---

### Task 6: QR Code Page

**Files:**
- Create: `src/pages/QR.tsx`
- Modify: `src/App.tsx` (add route)

- [ ] **Step 1: Create src/pages/QR.tsx**

```tsx
import { Helmet } from "react-helmet-async";
import { QRCodeSVG } from "qrcode.react";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export function QR() {
  const siteUrl = "https://tyeetale.vercel.app";

  return (
    <>
      <Helmet>
        <title>QR — tyeetale</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Container>
        <Header />
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-muted text-sm hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          back
        </Link>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
          <QRCodeSVG
            value={siteUrl}
            size={200}
            bgColor="transparent"
            fgColor="currentColor"
            className="text-foreground"
          />
          <p className="text-muted text-sm">Scan to visit tyeetale.vercel.app</p>
        </div>
      </Container>
    </>
  );
}
```

- [ ] **Step 2: Update src/App.tsx to add QR route**

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";
import { QR } from "@/pages/QR";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="/qr" element={<QR />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add QR code page"
```

---

### Task 7: LLMS.txt

**Files:**
- Create: `public/llms.txt`

- [ ] **Step 1: Create public/llms.txt**

```text
# Thomas Yee (tyeetale)

## About
Operator and builder. I build AI systems, data infrastructure, and products.
Currently helping rockets pencil out at Blue Origin.
The rest of my time goes to shipping AI that gives people superpowers.

## Current Role
- Blue Origin — Data Engineer (2024–present)
- New Glenn Financial Planning & Analysis team
- Data infrastructure for financial planning, cost-per-flight analysis, and operational forecasting

## Side Projects
- Onsite (getonsiteai.com) — AI business brain for home renovation contractors. Lead Engineer.
- Mosslayer (mosslayer.com) — Agentic payments & intent mapping. CEO.

## Past Work
- Tildenn (2022–2024) — AI travel planner, Founder & Engineer
- Coopsight (2018–2022) — ML-powered startup ecosystem matching, Software Engineer
- Metaphor3D — AI-generated 3D mesh assets for game developers
- Fibes — UGC influencer affiliate platform

## Education
- NYU Shanghai — BS Finance, Data Analysis (2018–2022)
- Dual concentration: Business Analytics & Marketing
- Merit Scholarship

## Skills
- AI/ML systems, data engineering, full-stack product development
- Python, TypeScript, React, Next.js, SQL, cloud platforms (GCP, AWS)
- Product design, systems thinking, startup operations

## Links
- Site: https://tyeetale.vercel.app
- GitHub: https://github.com/tyeetale
- X: https://x.com/tyeetale
- Email: tyeetale@gmail.com
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add llms.txt for AI discoverability"
```

---

### Task 8: Cleanup & Final Wiring

**Files:**
- Modify: `index.html` (add theme flash prevention script)
- Create: `vercel.json` (SPA rewrites)
- Verify all routes work

- [ ] **Step 1: Add theme flash prevention to index.html**

Update the `<head>` section of `index.html` to include an inline script that applies the theme class before React hydrates:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Thomas Yee — tyeetale</title>
    <script>
      (function() {
        var theme = localStorage.getItem('theme') || 'dark';
        if (theme === 'system') {
          theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        document.documentElement.classList.add(theme);
      })();
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Create vercel.json for SPA routing**

```json
{
  "rewrites": [
    { "source": "/((?!assets|fonts|llms\\.txt|og\\.png|favicon\\.ico).*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 3: Verify build**

```bash
bun run build
```

Confirm no TypeScript or build errors.

- [ ] **Step 4: Test all routes locally**

```bash
bun run preview
```

Verify:
- `/` — homepage with all sections
- `/projects/tildenn` — project detail with images
- `/projects/coopsight` — project detail
- `/projects/metaphor3d` — project detail
- `/projects/fibes` — project detail
- `/qr` — QR code page
- `/llms.txt` — plain text file loads
- Theme toggle works (persists across refresh)
- Mobile responsive (resize browser)

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add vercel config, theme flash prevention, final wiring"
```

---

### Task 9: Migrate Images & Remove Old Files

**Files:**
- Remove: old Next.js config files, contentlayer, yarn.lock, tyeetale-website/
- Keep: `public/assets/`, `public/og.png`, `public/favicon.ico`

- [ ] **Step 1: Verify public/assets still has all needed images**

Confirm these directories exist and have content:
- `public/assets/tildenn/` (preview.png, 1-5.png)
- `public/assets/metaphor3d/` (preview.png, 1-4.png)
- `public/assets/get-fibes/` (preview.png, 1-4.png)
- `public/assets/coopsight/` (preview.png, 1-4.png)

Note: The MDX references `/assets/get-fibes/` for the Fibes project. Either rename the folder to `fibes/` and update MDX image paths, or keep as `get-fibes/` since the URL paths in MDX still reference it. **Keep as `get-fibes/` to avoid breaking image references.**

- [ ] **Step 2: Remove old files that are no longer needed**

```bash
rm -rf .contentlayer contentlayer.config.js next.config.js .next
rm -f postcss.config.js
```

Only remove these if they still exist from the old project (Step 1 of Task 1 should have cleaned most of them).

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: clean up legacy Next.js files"
```

---

## Summary

After all 9 tasks, you will have:
- A fresh Vite + React SPA deployed to Vercel
- Text-forward homepage with intro, other projects, timeline, past projects
- Project detail pages rendering MDX with embedded images
- Theme toggle (dark/light/system) with flash prevention
- QR code page for quick sharing
- llms.txt for AI discoverability
- Human/machine footer toggle
- Social icon links
- Centered, responsive layout (640px max-width)
- Outfit + Geist typography
- SEO meta tags on all pages
