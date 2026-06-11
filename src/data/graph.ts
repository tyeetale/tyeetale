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
