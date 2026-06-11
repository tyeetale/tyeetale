# MDX Copy Improvements + Graph Page — Design Spec

**Date:** 2025-06-10  
**Status:** Draft  
**Depends on:** Site redesign (completed)

---

## Overview

Two additions to the tyeetale site:
1. Rewrite all project MDX narratives — sharper, problem-focused, showing skill compounding
2. Add `/graph` page — Obsidian-style force-directed graph showing how projects and topics interconnect

---

## Part 1: MDX Copy Improvements

### Writing Principles

- **Narrative but sharp** — storytelling voice, no filler, no repeated points
- **Structure per project:** Problem → What I Built → What Compounded
- **2-3 focused paragraphs** between images, not walls of text
- **Show the arc** — each project should make clear what skill/insight carried forward to the next thing
- **No buzzwords** — no "synergies", "revolutionary", "compelling vision"
- **Technical specificity** — name the tech, the approach, the constraint

### Extended Frontmatter Schema

```yaml
---
title: string
tagline: string
badges: string[]        # existing: tech/category tags shown on detail page
topics: string[]        # NEW: topic nodes for the graph (broader than badges)
connections: string[]   # NEW: slugs of directly related projects
---
```

- `topics` creates topic nodes in the graph. Projects sharing a topic are connected through that node.
- `connections` creates direct edges between project nodes (e.g., Fibes directly connects to Coopsight because it spun out of it).

### Tildenn — Rewrite

**Frontmatter:**
```yaml
---
title: Tildenn
tagline: AI Travel Planner
badges:
  - AI
  - Travel
  - Mobile
  - Full Stack
topics:
  - AI
  - Product Design
  - Travel
  - Consumer
connections:
  - coopsight
---
```

**Narrative direction:**
- Open: Trip planning is fragmented across 10+ tools. For someone who studied abroad in Shanghai and traveled constantly, this wasn't just inconvenient — it was a problem worth solving.
- Middle: Built one of the earliest AI-powered consumer travel tools during GPT-3's release (before ChatGPT existed). Full-stack: React Native app, AI integration for itinerary generation, mapping, calendar sync.
- Close: First time shipping a full product as founder from zero. Learned that AI products aren't about the model — they're about the interface that makes the output useful.

### Coopsight — Rewrite

**Frontmatter:**
```yaml
---
title: Coopsight
tagline: Startup Ecosystem Matchmaker
badges:
  - ML
  - Startups
  - B2B
  - Data
topics:
  - ML
  - Startups
  - Data
  - Product Design
connections:
  - fibes
  - nyu-shanghai
---
```

**Narrative direction:**
- Open: 70% of startups fail. Many fail not because the product is bad, but because they're isolated — no distribution partners, no complementary tech, no ecosystem leverage. The question: can you use data to surface partnership opportunities that humans miss?
- Middle: Co-founded with two VC-background partners. Built a matching system using data signals to rank startup compatibility. Pitched to VCs, onboarded accelerator portfolios. I handled product, design, and engineering simultaneously.
- Close: First real exposure to ML-driven product thinking and startup operations. This is where I learned to build fast, iterate on PMF, and wear every hat. The data matching work here planted the seed for everything that came after.

### Metaphor3D — Rewrite

**Frontmatter:**
```yaml
---
title: Metaphor3D
tagline: AI 3D Generated Assets
badges:
  - Generative AI
  - 3D
  - Three.js
  - Web
topics:
  - AI
  - Generative AI
  - 3D
  - Product Design
connections:
  - tildenn
---
```

**Narrative direction:**
- Open: Indie game developers spend disproportionate time and money on 3D assets. Either hire expensive artists or settle for generic stock. The bet: AI-generated 3D meshes were barely possible at this point, but the trajectory was clear.
- Middle: Built a web app (Three.js model viewer) wrapping an AI backend for mesh generation. Users describe what they want, system generates and renders 3D assets they can customize. I owned design and frontend, partner owned the ML pipeline.
- Close: Learned to operate in ambiguous technical territory — prototyping on tech that barely worked yet. The skill of shipping fast when the underlying capabilities are still emerging carried directly into later AI work.

### Fibes — Rewrite

**Frontmatter:**
```yaml
---
title: Fibes
tagline: Organic Influencer Affiliate Platform
badges:
  - Social Media
  - UGC
  - Marketing
  - Marketplace
topics:
  - Startups
  - Marketing
  - Product Design
  - Consumer
connections:
  - coopsight
---
```

**Narrative direction:**
- Open: Brands waste money on big influencer deals with diminishing returns. Meanwhile, micro-influencers with small but engaged audiences create content that converts better — but there's no efficient way to coordinate them at scale.
- Middle: Designed a two-sided marketplace where brands post content challenges (ramen challenge, clothing hauls) and users compete to create UGC for prizes. Gamified incentive system drives organic content production. Built the platform design, user flows, and brand-side dashboard.
- Close: First time designing incentive systems and marketplace dynamics — how do you align user behavior with business goals without it feeling extractive? This thinking about intent and incentive alignment connects directly to what I'm building now at Mosslayer.

---

## Part 2: Graph Page (`/graph`)

### Purpose

Visual exploration of how projects, skills, and topics interconnect. Shows the viewer that the career isn't random — there are threads running through everything.

### Route

`/graph` — accessible from the homepage (add a link in the footer or a subtle nav element)

### Layout

- Full viewport canvas (breaks out of the 640px container)
- Overlaid header: "tyeetale" branding + back link + theme toggle (semi-transparent background)
- Dark background always (force dark on this page regardless of theme setting) — graphs look best on dark

### Data Source

Read from the MDX frontmatter at build time:
- Each project with a detail page = a **project node** (Tildenn, Coopsight, Metaphor3D, Fibes)
- Each entry in `topics` across all projects = a **topic node**
- Each entry in `connections` = a **direct edge** between two project nodes
- Shared `topics` = edges from project nodes to topic nodes

Additional non-MDX nodes (hardcoded in a data file):
- Blue Origin (project node, no detail page)
- NYU Shanghai (project node, no detail page)
- Onsite (project node, no detail page)
- Mosslayer (project node, no detail page)

These get their own `topics` and `connections` defined in the data file.

### Visual Design

| Element | Style |
|---------|-------|
| Project nodes | Larger circles (radius ~20px), white/light fill, subtle glow |
| Topic nodes | Smaller circles (radius ~8px), muted color, no glow |
| Current project (Blue Origin) | Green accent border/glow |
| Edges (connections) | Slightly thicker line, higher opacity |
| Edges (shared topics) | Thin line, lower opacity |
| Labels | Small text next to nodes, project names always visible, topic names on hover |
| Background | #0a0a0a (matches dark theme) |

### Interaction

- Physics-based force simulation (nodes repel, edges attract)
- Drag nodes to rearrange
- Zoom/pan (scroll + drag on canvas)
- Hover on node: highlight its connections, show label if hidden
- No click-to-navigate (purely exploratory)
- Animated on load (nodes start clustered, settle into force layout)

### Library

`react-force-graph-2d` — lightweight canvas-based force graph. Wraps d3-force. Handles physics, zoom/pan, drag out of the box.

### Responsive

- On desktop: full viewport
- On mobile: still full viewport, pinch-to-zoom supported by the library
- Touch drag works natively

### Navigation to Graph

Add a small "graph" link in the footer (next to QR button) that links to `/graph`.

---

## Out of Scope

- 3D graph view (can add later with react-force-graph-3d)
- Filtering/search within the graph
- Animated transitions between graph and detail pages
- Auto-generating graph data from external sources
