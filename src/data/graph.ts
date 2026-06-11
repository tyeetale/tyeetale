export interface GraphNode {
  id: string;
  label: string;
  type: "project" | "topic";
  current?: boolean;
  connectionCount?: number;
  tagline?: string;
  href?: string;
  external?: boolean;
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

const projectNodes: GraphNode[] = [
  { id: "blue-origin", label: "Blue Origin", type: "project", current: true, tagline: "Data infrastructure for New Glenn FP&A", href: "https://www.blueorigin.com/new-glenn", external: true },
  { id: "tildenn", label: "Tildenn", type: "project", tagline: "AI travel planner, built at the dawn of GPT-3", href: "/projects/tildenn", external: false },
  { id: "coopsight", label: "Coopsight", type: "project", tagline: "ML-powered startup ecosystem matching", href: "/projects/coopsight", external: false },
  { id: "metaphor3d", label: "Metaphor3D", type: "project", tagline: "AI-generated 3D mesh assets", href: "/projects/metaphor3d", external: false },
  { id: "fibes", label: "Fibes", type: "project", tagline: "UGC influencer marketplace", href: "/projects/fibes", external: false },
  { id: "onsite", label: "Onsite", type: "project", tagline: "AI business brain for contractors", href: "https://getonsiteai.com", external: true },
  { id: "mosslayer", label: "Mosslayer", type: "project", tagline: "Agentic payments & intent mapping", href: "https://mosslayer.com", external: true },
  { id: "nyu-shanghai", label: "NYU Shanghai", type: "project", tagline: "BS Finance, Data Analysis", href: "https://shanghai.nyu.edu/", external: true },
];

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
  const connectionCounts: Record<string, number> = {};

  for (const topics of Object.values(projectTopics)) {
    for (const topic of topics) {
      topicSet.add(topic);
    }
  }

  const topicNodes: GraphNode[] = Array.from(topicSet).map((topic) => ({
    id: `topic-${topic.toLowerCase().replace(/\s+/g, "-")}`,
    label: topic,
    type: "topic" as const,
  }));

  for (const [projectId, topics] of Object.entries(projectTopics)) {
    for (const topic of topics) {
      const topicId = `topic-${topic.toLowerCase().replace(/\s+/g, "-")}`;
      links.push({ source: projectId, target: topicId, type: "topic" });
      connectionCounts[projectId] = (connectionCounts[projectId] || 0) + 1;
      connectionCounts[topicId] = (connectionCounts[topicId] || 0) + 1;
    }
  }

  const seenConnections = new Set<string>();
  for (const [projectId, connections] of Object.entries(projectConnections)) {
    for (const targetId of connections) {
      const key = [projectId, targetId].sort().join("->");
      if (!seenConnections.has(key)) {
        seenConnections.add(key);
        links.push({ source: projectId, target: targetId, type: "connection" });
        connectionCounts[projectId] = (connectionCounts[projectId] || 0) + 1;
        connectionCounts[targetId] = (connectionCounts[targetId] || 0) + 1;
      }
    }
  }

  const allNodes = [...projectNodes, ...topicNodes].map((node) => ({
    ...node,
    connectionCount: connectionCounts[node.id] || 0,
  }));

  return { nodes: allNodes, links };
}

export const graphData = buildGraphData();

export const allTopics: string[] = Array.from(
  new Set(Object.values(projectTopics).flat())
).sort();

export function getNodeConnections(nodeId: string): { projects: GraphNode[]; topics: string[] } {
  const topics = projectTopics[nodeId] || [];
  const directConnections = projectConnections[nodeId] || [];
  const inboundConnections = Object.entries(projectConnections)
    .filter(([, targets]) => targets.includes(nodeId))
    .map(([source]) => source);

  const allConnectedProjectIds = [...new Set([...directConnections, ...inboundConnections])];
  const connectedProjects = projectNodes.filter((n) => allConnectedProjectIds.includes(n.id));

  // If this is a topic node, find projects with that topic
  const topicLabel = graphData.nodes.find((n) => n.id === nodeId)?.label;
  if (topicLabel && !projectNodes.find((n) => n.id === nodeId)) {
    const projectsWithTopic = Object.entries(projectTopics)
      .filter(([, t]) => t.includes(topicLabel))
      .map(([id]) => projectNodes.find((n) => n.id === id)!)
      .filter(Boolean);
    return { projects: projectsWithTopic, topics: [] };
  }

  return { projects: connectedProjects, topics };
}
