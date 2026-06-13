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

      {dimensions.width > 0 && dimensions.width < 768 ? (
        <div className="p-6 overflow-y-auto h-full pt-16">
          <div className="max-w-md mx-auto">
            <h2 className="text-[#e5e5e5] font-heading font-bold text-lg mb-6">Knowledge Graph</h2>
            <p className="text-[#555] text-xs mb-6">View on desktop for the interactive graph experience.</p>

            <div className="mb-6">
              <h3 className="text-[#555] text-xs uppercase tracking-wider mb-3">Projects</h3>
              {graphData.nodes.filter(n => n.type === 'project').map(node => (
                <div key={node.id} className="flex items-center gap-2 py-2 border-b border-[#1a1a1a]">
                  <div className={`w-2 h-2 rounded-full ${node.current ? 'bg-[#4ade80]' : 'bg-[#e5e5e5]'}`} />
                  <span className="text-[#e5e5e5] text-sm">{node.label}</span>
                  {node.tagline && <span className="text-[#555] text-xs ml-auto">{node.tagline}</span>}
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-[#555] text-xs uppercase tracking-wider mb-3">Topics</h3>
              <div className="flex flex-wrap gap-1.5">
                {graphData.nodes.filter(n => n.type === 'topic').map(node => (
                  <span key={node.id} className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-[#a3a3a3] border border-[#333]">
                    {node.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
