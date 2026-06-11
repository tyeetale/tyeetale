# MDX Copy Improvements + Graph Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite all project MDX narratives to be sharper/problem-focused, extend frontmatter with graph data, and add an interactive force-directed graph page at `/graph`.

**Architecture:** MDX files get extended frontmatter (`topics`, `connections`). A graph data module reads from a centralized data file (since MDX frontmatter isn't easily importable at runtime in Vite without a custom plugin). The graph page uses react-force-graph-2d for a canvas-based physics simulation. The graph link is added to the Footer.

**Tech Stack:** react-force-graph-2d, existing Vite + React + TailwindCSS stack

---

## File Structure

```
src/
├── content/projects/
│   ├── tildenn.mdx          # Rewritten narrative + extended frontmatter
│   ├── coopsight.mdx        # Rewritten narrative + extended frontmatter
│   ├── metaphor3d.mdx       # Rewritten narrative + extended frontmatter
│   └── fibes.mdx            # Rewritten narrative + extended frontmatter
├── data/
│   ├── graph.ts             # NEW: All graph nodes + edges, derived from project/topic data
│   └── projects.ts          # MODIFY: no changes needed (graph has own data)
├── pages/
│   └── Graph.tsx            # NEW: Full-viewport graph page
├── components/
│   └── layout/
│       └── Footer.tsx       # MODIFY: add graph link
└── App.tsx                  # MODIFY: add /graph route
```

---

### Task 1: Rewrite Tildenn MDX

**Files:**
- Modify: `src/content/projects/tildenn.mdx`

- [ ] **Step 1: Replace the entire file content**

```mdx
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

![Tildenn Preview](/assets/tildenn/preview.png)

Trip planning is fragmented. Flights in one tab, hotels in another, notes in a third, maps somewhere else. For someone who studied abroad in Shanghai and spent years navigating unfamiliar cities, this wasn't a minor inconvenience — it was a real problem that made every trip harder than it needed to be.

![Tildenn 1](/assets/tildenn/1.png)

I built Tildenn during GPT-3's initial release — before ChatGPT, before AI assistants were mainstream. The idea was simple: one tool that consolidates trip planning into a single intelligent interface. AI handles itinerary generation and suggestions, while the user stays in control of the plan through a clean calendar and map view.

![Tildenn 2](/assets/tildenn/2.png)

The technical challenge wasn't just calling an API. It was designing an interface that made AI output actually useful — structuring responses into actionable itinerary blocks, integrating with mapping data, and giving users the flexibility to override and customize without fighting the system.

![Tildenn 3](/assets/tildenn/3.png)

I built the full stack: React Native app, AI integration layer, calendar sync, and mapping. This was my first time shipping a complete product as a founder from zero to one.

![Tildenn 4](/assets/tildenn/4.png)

The biggest lesson: AI products aren't about the model. They're about the interface that makes the output useful. A great model with a bad UX is just a chatbot. A mediocre model with a thoughtful UX is a product people actually use.

![Tildenn 5](/assets/tildenn/5.png)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects/tildenn.mdx
git commit -m "content: rewrite tildenn narrative, add graph frontmatter"
```

---

### Task 2: Rewrite Coopsight MDX

**Files:**
- Modify: `src/content/projects/coopsight.mdx`

- [ ] **Step 1: Replace the entire file content**

```mdx
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
---

![Coopsight Preview](/assets/coopsight/preview.png)

70% of startups fail. Many don't fail because the product is bad — they fail because they're isolated. No distribution partners, no complementary tech, no ecosystem leverage. The question we asked: can you use data to surface partnership opportunities that humans miss?

![Coopsight 1](/assets/coopsight/1.png)

I co-founded Coopsight with two partners from venture capital backgrounds. They saw the problem from the investor side — portfolio companies that should be working together but never meet. I saw the product opportunity: a matching system that ranks startup compatibility using data signals across industry, stage, technology, and geography.

![Coopsight 2](/assets/coopsight/2.png)

We pitched VCs, onboarded accelerator portfolios, and iterated on the matching algorithm. I handled product, design, and engineering simultaneously — building the platform while running customer discovery and pitching in the same week.

![Coopsight 3](/assets/coopsight/3.png)

This was my first real startup. I learned to build fast, iterate on product-market fit, and wear every hat. More importantly, this is where I first touched ML-driven product thinking — using data to make decisions that humans can't make at scale.

![Coopsight 4](/assets/coopsight/4.png)

The data matching work here planted the seed for everything that came after. Blue Origin's financial data infrastructure, Onsite's AI system, Mosslayer's intent mapping — they all trace back to this idea that systems can surface insights humans miss.
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects/coopsight.mdx
git commit -m "content: rewrite coopsight narrative, add graph frontmatter"
```

---

### Task 3: Rewrite Metaphor3D MDX

**Files:**
- Modify: `src/content/projects/metaphor3d.mdx`

- [ ] **Step 1: Replace the entire file content**

```mdx
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

![Metaphor3d Preview](/assets/metaphor3d/preview.png)

Indie game developers face a brutal tradeoff: spend months and thousands on custom 3D assets, or settle for generic stock that makes your game look like every other. We bet that AI-generated 3D meshes — barely possible at the time — would eventually close that gap.

![Metaphor3d 1](/assets/metaphor3d/1.png)

A close friend brought me in to build this. The pitch was straightforward: developers describe what they want, the system generates 3D assets they can preview and customize. We explored every interface pattern — Discord bots, email workflows, API-only — before landing on a web app with a Three.js model viewer as the core experience.

![Metaphor3d 2](/assets/metaphor3d/2.png)

I owned the frontend and design: the web interface, the 3D viewer, the generation flow. My partner handled the ML pipeline. We built an MVP, ran customer interviews with indie devs and Roblox creators, and iterated on the generation quality and customization controls.

![Metaphor3d 3](/assets/metaphor3d/3.png)

The tech barely worked — this was pre-Stable Diffusion, pre-everything. But the exercise taught me something valuable: how to prototype and ship on capabilities that are still emerging. You can't wait for the tech to be perfect. You build the product layer now so you're ready when the underlying models catch up.

![Metaphor3d 4](/assets/metaphor3d/4.png)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects/metaphor3d.mdx
git commit -m "content: rewrite metaphor3d narrative, add graph frontmatter"
```

---

### Task 4: Rewrite Fibes MDX

**Files:**
- Modify: `src/content/projects/fibes.mdx`

- [ ] **Step 1: Replace the entire file content**

```mdx
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

![Fibes Preview](/assets/get-fibes/preview.png)

Brands waste money on big influencer deals with diminishing returns. Meanwhile, micro-influencers with small but genuinely engaged audiences create content that converts better — but there's no efficient way to coordinate them at scale. The economics are broken on both sides.

![Fibes 1](/assets/get-fibes/1.png)

Spinning out from Coopsight, we built Fibes as a two-sided marketplace. Brands post content challenges — a ramen challenge, a clothing haul, a product unboxing — and users compete to create the best UGC for prizes. The incentive structure drives organic content at a fraction of what a single influencer deal costs.

![Fibes 2](/assets/get-fibes/2.png)

I designed the entire platform: the brand-side dashboard for creating and managing challenges, the creator-side experience for discovering and submitting content, and the gamification layer that kept both sides engaged. The key design challenge was aligning incentives — how do you get authentic content without it feeling forced?

![Fibes 3](/assets/get-fibes/3.png)

This was my first time designing incentive systems and marketplace dynamics. How do you align user behavior with business goals without the experience feeling extractive? That question — how intent maps to action maps to value — is exactly what I'm now building at Mosslayer, just with AI agents instead of human creators.

![Fibes 4](/assets/get-fibes/4.png)
```

- [ ] **Step 2: Commit**

```bash
git add src/content/projects/fibes.mdx
git commit -m "content: rewrite fibes narrative, add graph frontmatter"
```

---

### Task 5: Create Graph Data Module

**Files:**
- Create: `src/data/graph.ts`

- [ ] **Step 1: Install react-force-graph-2d**

```bash
bun add react-force-graph-2d
```

- [ ] **Step 2: Create src/data/graph.ts**

```typescript
export interface GraphNode {
  id: string;
  label: string;
  type: "project" | "topic";
  current?: boolean;
}

export interface GraphLink {
  source: string;
  target: string;
  type: "connection" | "topic";
}

export interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

// Project nodes (all projects including those without detail pages)
const projectNodes: GraphNode[] = [
  { id: "blue-origin", label: "Blue Origin", type: "project", current: true },
  { id: "tildenn", label: "Tildenn", type: "project" },
  { id: "coopsight", label: "Coopsight", type: "project" },
  { id: "metaphor3d", label: "Metaphor3D", type: "project" },
  { id: "fibes", label: "Fibes", type: "project" },
  { id: "onsite", label: "Onsite", type: "project" },
  { id: "mosslayer", label: "Mosslayer", type: "project" },
  { id: "nyu-shanghai", label: "NYU Shanghai", type: "project" },
];

// Project topics mapping (mirrors frontmatter + non-MDX projects)
const projectTopics: Record<string, string[]> = {
  "blue-origin": ["Data", "Finance", "AI"],
  tildenn: ["AI", "Product Design", "Travel", "Consumer"],
  coopsight: ["ML", "Startups", "Data", "Product Design"],
  metaphor3d: ["AI", "Generative AI", "3D", "Product Design"],
  fibes: ["Startups", "Marketing", "Product Design", "Consumer"],
  onsite: ["AI", "Startups", "Product Design"],
  mosslayer: ["AI", "Payments", "Consumer"],
  "nyu-shanghai": ["Finance", "Data"],
};

// Direct connections between projects (mirrors frontmatter + non-MDX projects)
const projectConnections: Record<string, string[]> = {
  tildenn: ["coopsight"],
  coopsight: ["fibes"],
  metaphor3d: ["tildenn"],
  fibes: ["coopsight"],
  onsite: ["blue-origin", "tildenn"],
  mosslayer: ["fibes", "onsite"],
  "nyu-shanghai": ["coopsight"],
  "blue-origin": ["nyu-shanghai"],
};

function buildGraphData(): GraphData {
  const topicSet = new Set<string>();
  const links: GraphLink[] = [];

  // Collect all topics
  for (const topics of Object.values(projectTopics)) {
    for (const topic of topics) {
      topicSet.add(topic);
    }
  }

  // Create topic nodes
  const topicNodes: GraphNode[] = Array.from(topicSet).map((topic) => ({
    id: `topic-${topic.toLowerCase().replace(/\s+/g, "-")}`,
    label: topic,
    type: "topic" as const,
  }));

  // Create topic edges
  for (const [projectId, topics] of Object.entries(projectTopics)) {
    for (const topic of topics) {
      links.push({
        source: projectId,
        target: `topic-${topic.toLowerCase().replace(/\s+/g, "-")}`,
        type: "topic",
      });
    }
  }

  // Create direct connection edges (deduplicate bidirectional)
  const seenConnections = new Set<string>();
  for (const [projectId, connections] of Object.entries(projectConnections)) {
    for (const targetId of connections) {
      const key = [projectId, targetId].sort().join("->");
      if (!seenConnections.has(key)) {
        seenConnections.add(key);
        links.push({
          source: projectId,
          target: targetId,
          type: "connection",
        });
      }
    }
  }

  return {
    nodes: [...projectNodes, ...topicNodes],
    links,
  };
}

export const graphData = buildGraphData();
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add graph data module with nodes and edges"
```

---

### Task 6: Create Graph Page

**Files:**
- Create: `src/pages/Graph.tsx`
- Modify: `src/App.tsx` (add route)
- Modify: `src/components/layout/Footer.tsx` (add graph link)

- [ ] **Step 1: Create src/pages/Graph.tsx**

```tsx
import { useCallback, useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowLeft } from "lucide-react";
import ForceGraph2D from "react-force-graph-2d";
import { graphData, type GraphNode } from "@/data/graph";

export function Graph() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const nodeCanvasObject = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const graphNode = node as GraphNode & { x: number; y: number };
      const label = graphNode.label;
      const isProject = graphNode.type === "project";
      const isCurrent = graphNode.current;
      const radius = isProject ? 6 : 3;
      const fontSize = isProject ? 12 / globalScale : 9 / globalScale;

      // Draw node circle
      ctx.beginPath();
      ctx.arc(graphNode.x, graphNode.y, radius, 0, 2 * Math.PI);

      if (isCurrent) {
        ctx.fillStyle = "#4ade80";
        ctx.shadowColor = "#4ade80";
        ctx.shadowBlur = 8;
      } else if (isProject) {
        ctx.fillStyle = "#e5e5e5";
        ctx.shadowColor = "#e5e5e5";
        ctx.shadowBlur = 4;
      } else {
        ctx.fillStyle = "#555555";
        ctx.shadowBlur = 0;
      }

      ctx.fill();
      ctx.shadowBlur = 0;

      // Draw label for project nodes always, topic nodes when zoomed in
      if (isProject || globalScale > 1.5) {
        ctx.font = `${fontSize}px Geist, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isProject ? "#a3a3a3" : "#555555";
        ctx.fillText(label, graphNode.x, graphNode.y + radius + 2);
      }
    },
    []
  );

  const linkColor = useCallback((link: any) => {
    return link.type === "connection"
      ? "rgba(163, 163, 163, 0.4)"
      : "rgba(85, 85, 85, 0.2)";
  }, []);

  const linkWidth = useCallback((link: any) => {
    return link.type === "connection" ? 1.5 : 0.5;
  }, []);

  return (
    <>
      <Helmet>
        <title>Graph — tyeetale</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      {/* Force dark mode on this page */}
      <div
        ref={containerRef}
        className="fixed inset-0 bg-[#0a0a0a]"
      >
        {/* Overlay header */}
        <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-[#0a0a0a] to-transparent">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[#a3a3a3] text-sm hover:text-[#e5e5e5] transition-colors"
            >
              <ArrowLeft size={14} />
              back
            </Link>
            <span className="font-heading font-bold text-sm text-[#e5e5e5] tracking-tight">
              tyeetale
            </span>
          </div>
          <span className="text-[#555555] text-xs">
            drag to explore
          </span>
        </div>

        {/* Force graph */}
        {dimensions.width > 0 && (
          <ForceGraph2D
            graphData={graphData}
            width={dimensions.width}
            height={dimensions.height}
            backgroundColor="#0a0a0a"
            nodeCanvasObject={nodeCanvasObject}
            nodePointerAreaPaint={(node: any, color, ctx) => {
              const radius = (node as GraphNode).type === "project" ? 6 : 3;
              ctx.beginPath();
              ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
              ctx.fillStyle = color;
              ctx.fill();
            }}
            linkColor={linkColor}
            linkWidth={linkWidth}
            d3AlphaDecay={0.02}
            d3VelocityDecay={0.3}
            cooldownTime={3000}
            enableZoomInteraction={true}
            enablePanInteraction={true}
            enableNodeDrag={true}
          />
        )}
      </div>
    </>
  );
}
```

- [ ] **Step 2: Update src/App.tsx to add graph route**

Add the import and route:

```tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/lib/theme";
import { Home } from "@/pages/Home";
import { Project } from "@/pages/Project";
import { QR } from "@/pages/QR";
import { Graph } from "@/pages/Graph";

export function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<Project />} />
            <Route path="/qr" element={<QR />} />
            <Route path="/graph" element={<Graph />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </HelmetProvider>
  );
}
```

- [ ] **Step 3: Update src/components/layout/Footer.tsx to add graph link**

In the Footer component, add a "graph" link next to the QR button in the right-side div:

```tsx
<Link
  to="/graph"
  className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
>
  graph
</Link>
```

Place it before the QR link in the flex container.

- [ ] **Step 4: Verify TypeScript compiles**

```bash
bunx tsc --noEmit
```

Note: react-force-graph-2d may not have perfect types. If there are type errors, add a declaration file `src/types/react-force-graph-2d.d.ts`:

```typescript
declare module "react-force-graph-2d" {
  import { ComponentType } from "react";
  const ForceGraph2D: ComponentType<any>;
  export default ForceGraph2D;
}
```

- [ ] **Step 5: Verify dev server runs and /graph page renders**

```bash
bun run dev
```

Navigate to http://localhost:5173/graph and verify:
- Dark background fills viewport
- Nodes appear and settle with physics
- Project nodes are larger with labels
- Topic nodes are smaller
- Green dot for Blue Origin (current)
- Drag and zoom work

- [ ] **Step 6: Build passes**

```bash
bun run build
```

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "feat: add interactive graph page with force-directed layout"
```

---

## Summary

After all 6 tasks:
- All 4 MDX project narratives rewritten (sharper, problem-focused, showing skill compounding)
- Extended frontmatter with `topics` and `connections` fields
- Graph data module computing nodes and edges
- Full-viewport interactive graph page at `/graph`
- Graph link in footer
- All projects and topics visualized as connected nodes
