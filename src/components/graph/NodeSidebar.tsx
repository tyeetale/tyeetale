import { X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { type GraphNode, getNodeConnections } from "@/data/graph";

interface NodeSidebarProps {
  node: GraphNode | null;
  onClose: () => void;
  onNodeSelect: (nodeId: string) => void;
}

export function NodeSidebar({ node, onClose, onNodeSelect }: NodeSidebarProps) {
  if (!node) return null;

  const connections = getNodeConnections(node.id);
  const isProject = node.type === "project";

  return (
    <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-[#0a0a0a]/95 backdrop-blur-sm border-l border-[#1a1a1a] z-20 overflow-y-auto p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <div className={`w-2.5 h-2.5 rounded-full ${node.current ? "bg-[#4ade80]" : isProject ? "bg-[#e5e5e5]" : "bg-[#555555]"}`} />
            <span className="text-xs text-[#555555] uppercase tracking-wider">{node.type}</span>
          </div>
          <h3 className="font-heading font-bold text-lg text-[#e5e5e5] mt-1">{node.label}</h3>
          {node.tagline && <p className="text-[#a3a3a3] text-sm mt-1">{node.tagline}</p>}
        </div>
        <button onClick={onClose} className="text-[#555555] hover:text-[#e5e5e5] transition-colors p-1">
          <X size={16} />
        </button>
      </div>

      {node.href && (
        <div>
          {node.external ? (
            <a href={node.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[#a3a3a3] hover:text-[#e5e5e5] underline underline-offset-2 transition-colors">
              Visit site <ExternalLink size={12} />
            </a>
          ) : (
            <Link to={node.href} className="inline-flex items-center gap-1.5 text-sm text-[#a3a3a3] hover:text-[#e5e5e5] underline underline-offset-2 transition-colors">
              View project →
            </Link>
          )}
        </div>
      )}

      {connections.topics.length > 0 && (
        <div>
          <h4 className="text-xs text-[#555555] uppercase tracking-wider mb-2">Topics</h4>
          <div className="flex flex-wrap gap-1.5">
            {connections.topics.map((topic) => (
              <button key={topic} onClick={() => onNodeSelect(`topic-${topic.toLowerCase().replace(/\s+/g, "-")}`)} className="text-xs px-2 py-0.5 rounded bg-[#1a1a1a] text-[#a3a3a3] border border-[#333] hover:text-[#e5e5e5] hover:border-[#555] transition-colors">
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {connections.projects.length > 0 && (
        <div>
          <h4 className="text-xs text-[#555555] uppercase tracking-wider mb-2">Connected Projects</h4>
          <div className="flex flex-col gap-1.5">
            {connections.projects.map((project) => (
              <button key={project.id} onClick={() => onNodeSelect(project.id)} className="text-left text-sm text-[#a3a3a3] hover:text-[#e5e5e5] transition-colors">
                {project.label}
                {project.tagline && <span className="text-[#555555] text-xs ml-2">{project.tagline}</span>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
