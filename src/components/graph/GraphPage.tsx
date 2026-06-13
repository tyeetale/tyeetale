import { useEffect, useState, useMemo, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { graphData, type GraphNode } from "@/data/graph";
import { GraphCanvas } from "@/components/graph/GraphCanvas";
import { NodeSidebar } from "@/components/graph/NodeSidebar";
import { GraphSearch } from "@/components/graph/GraphSearch";
import { GraphChat } from "@/components/graph/GraphChat";

export default function GraphPage() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTopics, setActiveTopics] = useState<Set<string>>(new Set());

  useEffect(() => {
    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const highlightNodeIds = useMemo(() => {
    const hasSearch = searchQuery.trim().length > 0;
    const hasTopicFilter = activeTopics.size > 0;
    if (!hasSearch && !hasTopicFilter) return null;

    const ids = new Set<string>();
    graphData.nodes.forEach((node) => {
      let matches = true;
      if (hasSearch) {
        matches = node.label.toLowerCase().includes(searchQuery.toLowerCase());
      }
      if (hasTopicFilter && matches) {
        const isActiveTopic = activeTopics.has(node.label);
        const nodeTopicIds = Array.from(activeTopics).map(
          (t) => `topic-${t.toLowerCase().replace(/\s+/g, "-")}`
        );
        const isConnectedToActiveTopic = graphData.links.some(
          (link) =>
            ((link.source === node.id || (link.source as any)?.id === node.id) &&
              nodeTopicIds.includes(typeof link.target === "string" ? link.target : (link.target as any)?.id)) ||
            ((link.target === node.id || (link.target as any)?.id === node.id) &&
              nodeTopicIds.includes(typeof link.source === "string" ? link.source : (link.source as any)?.id))
        );
        matches = isActiveTopic || isConnectedToActiveTopic;
      }
      if (matches) ids.add(node.id);
    });

    return ids.size > 0 ? ids : null;
  }, [searchQuery, activeTopics]);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode(node);
  }, []);

  const handleNodeSelect = useCallback((nodeId: string) => {
    const node = graphData.nodes.find((n) => n.id === nodeId);
    if (node) setSelectedNode(node);
  }, []);

  const handleTopicToggle = useCallback((topic: string) => {
    setActiveTopics((prev) => {
      const next = new Set(prev);
      if (next.has(topic)) next.delete(topic);
      else next.add(topic);
      return next;
    });
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveTopics(new Set());
    setSearchQuery("");
  }, []);

  return (
    <div className="fixed inset-0 bg-[#0a0a0a]">
      <div className="absolute top-0 left-0 right-0 z-10 p-4 flex items-center justify-between bg-gradient-to-b from-[#0a0a0a] to-transparent">
        <div className="flex items-center gap-4">
          <a href="/" className="inline-flex items-center gap-1.5 text-[#a3a3a3] text-sm hover:text-[#e5e5e5] transition-colors">
            <ArrowLeft size={14} />
            back
          </a>
          <span className="font-heading font-bold text-sm text-[#e5e5e5] tracking-tight">tyeetale</span>
        </div>
        <span className="text-[#555555] text-xs">drag to explore</span>
      </div>

      <GraphSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        activeTopics={activeTopics}
        onTopicToggle={handleTopicToggle}
        onClearFilters={handleClearFilters}
      />

      {dimensions.width > 0 && (
        <GraphCanvas
          graphData={graphData}
          width={dimensions.width}
          height={dimensions.height}
          highlightNodeIds={highlightNodeIds}
          onNodeClick={handleNodeClick}
        />
      )}

      <NodeSidebar
        node={selectedNode}
        onClose={() => setSelectedNode(null)}
        onNodeSelect={handleNodeSelect}
      />

      <GraphChat />
    </div>
  );
}
