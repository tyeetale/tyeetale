# Graph Page v2 — Design Spec

**Date:** 2025-06-10  
**Status:** Draft  
**Depends on:** Graph page v1 (completed)

---

## Overview

Upgrade the `/graph` page with four new features:
1. Sidebar preview panel (click a node to see details + navigate)
2. Search/filter input (find and highlight nodes)
3. Topic filter + connection-based sizing (sortability)
4. AI chat (small conversational interface powered by Cloudflare Workers AI)

---

## 1. Sidebar Preview Panel

### Trigger
- Click any node in the graph

### Behavior
- Opens a panel on the right side (desktop) or bottom sheet (mobile)
- Panel slides in, doesn't replace the graph
- Clicking the graph background or an "x" closes the panel
- Clicking a different node updates the panel content

### Panel Content (Project Node)
- Project name (large, Outfit)
- Tagline
- Type badge: "project" with green/grey dot (current or past)
- List of connected topics (as small pills)
- List of connected projects (clickable — clicking focuses that node in the graph)
- "View project →" link (navigates to `/projects/:slug` for internal, external URL for external)
- For non-navigable topic nodes: just show the topic name + which projects share it

### Panel Content (Topic Node)
- Topic name
- List of projects connected to this topic (clickable to focus/select that project node)

### Visual Style
- Semi-transparent dark background (blur backdrop)
- Max-width: 320px on desktop
- Subtle border-left separator
- Close button (X) top-right of panel

---

## 2. Search / Filter Input

### Location
- Top of graph page, overlaid (next to or below the existing header bar)

### Behavior
- Text input with placeholder "Search nodes..."
- As user types, matching nodes are highlighted (others dim/fade)
- Matches on node label (project names and topic names)
- Empty input = all nodes visible (reset)
- Pressing Enter or clicking a search result focuses/centers the graph on that node

### Visual
- Small input field, dark surface background, subtle border
- Matching nodes get full opacity, non-matching nodes get reduced opacity (0.2)
- Non-matching edges also dim

---

## 3. Topic Filter + Connection-Based Sizing

### Topic Filter
- Row of topic pills/buttons below the search input (or as a collapsible filter row)
- Clicking a topic pill filters the graph to show only:
  - That topic node
  - All project nodes connected to it
  - Edges between them
- Multiple topics can be selected (union: show projects matching ANY selected topic)
- "All" button to reset filter
- Active topics are highlighted, inactive are dimmed

### Connection-Based Sizing
- Node radius scales with number of connections
- More connections = larger node
- Formula: `radius = baseRadius + (connectionCount * scaleFactor)`
  - Project base: 5, scale: 1.5 (so a project with 4 connections = 11px radius)
  - Topic base: 3, scale: 1 (so a topic with 5 connections = 8px radius)
- This replaces the fixed radius from v1

---

## 4. AI Chat

### Architecture
- **Frontend:** Small chat interface at the bottom of the graph page
- **Backend:** Cloudflare Worker calling Workers AI (Llama 3.1 8B or similar free-tier model)
- **Context:** System prompt with all project/work info baked in (from llms.txt content + graph relationships)

### Cloudflare Worker
- Deployed as a standalone Worker (separate from Vercel site)
- Endpoint: `POST /chat` with `{ message: string }` body
- Returns streamed text response
- CORS configured to allow requests from the Vercel domain
- System prompt includes: bio, all project descriptions, timeline, connections, topics
- No conversation history (stateless, each message is independent with full context)

### Frontend Chat UI
- Positioned: bottom-center of the graph page, overlaid
- Collapsed state: small pill/button "Ask about my work" 
- Expanded state: input field + response area (max-height ~200px, scrollable)
- Typing indicator while streaming
- Responses rendered as plain text (no markdown rendering needed for v1)
- Close/collapse button

### System Prompt (baked into Worker)
```
You are an AI assistant on Thomas Yee's personal site. Answer questions about his work, projects, and career based on the following context. Be concise, conversational, and helpful. If you don't know something, say so.

[Full content from llms.txt + relationship data from graph]
```

### Limits
- Max input: 500 characters
- Max response: ~300 tokens
- Rate limit: basic (10 req/min per IP, handled by Worker)

---

## Technical Implementation

### Dependencies (new)
- None on the frontend beyond what exists (fetch for API calls)
- Cloudflare Worker (separate project/deploy, `wrangler` CLI)

### File Changes (frontend)
```
src/
├── pages/
│   └── Graph.tsx              # Major refactor: add sidebar, search, filters, chat
├── components/
│   └── graph/
│       ├── NodeSidebar.tsx    # Sidebar panel component
│       ├── GraphSearch.tsx    # Search input + filter pills
│       ├── GraphChat.tsx      # Chat interface
│       └── GraphCanvas.tsx    # Extracted force graph canvas (from current Graph.tsx)
├── data/
│   └── graph.ts              # Add connection count computation
```

### Cloudflare Worker (new project)
```
workers/
└── graph-chat/
    ├── wrangler.toml
    ├── src/
    │   └── index.ts          # Worker entry: handles /chat POST
    └── package.json
```

Or deployed as a separate repo/directory. The Worker URL is hardcoded in the frontend (can be env var later).

---

## Responsive Behavior

| Viewport | Sidebar | Search/Filters | Chat |
|----------|---------|----------------|------|
| Desktop (>768px) | Right panel, 320px | Top overlay bar | Bottom center overlay |
| Mobile (<768px) | Bottom sheet (60% height) | Top overlay, filters scroll horizontal | Bottom sheet, takes priority over sidebar |

---

## Out of Scope

- Conversation history / memory
- User authentication for chat
- Custom model fine-tuning
- Graph page SSR
- Animated node transitions on filter
