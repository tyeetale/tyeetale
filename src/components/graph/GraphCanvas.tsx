import { useCallback } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { type GraphNode, type GraphData } from "@/data/graph";

interface GraphCanvasProps {
  graphData: GraphData;
  width: number;
  height: number;
  highlightNodeIds: Set<string> | null;
  onNodeClick: (node: GraphNode) => void;
}

export function GraphCanvas({
  graphData,
  width,
  height,
  highlightNodeIds,
  onNodeClick,
}: GraphCanvasProps) {
  const nodeCanvasObject = useCallback(
    (node: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const graphNode = node as GraphNode & { x: number; y: number };
      const isProject = graphNode.type === "project";
      const isCurrent = graphNode.current;
      const count = graphNode.connectionCount || 0;

      const baseRadius = isProject ? 5 : 3;
      const scaleFactor = isProject ? 1.5 : 1;
      const radius = baseRadius + count * scaleFactor;
      const fontSize = isProject ? 12 / globalScale : 9 / globalScale;

      const dimmed = highlightNodeIds !== null && !highlightNodeIds.has(graphNode.id);
      ctx.globalAlpha = dimmed ? 0.15 : 1;

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

      if (isProject || globalScale > 1.5) {
        ctx.font = `${fontSize}px Geist, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillStyle = isProject ? "#a3a3a3" : "#555555";
        ctx.fillText(graphNode.label, graphNode.x, graphNode.y + radius + 2);
      }

      ctx.globalAlpha = 1;
    },
    [highlightNodeIds]
  );

  const linkColor = useCallback(
    (link: any) => {
      const dimmed =
        highlightNodeIds !== null &&
        (!highlightNodeIds.has(link.source?.id || link.source) ||
          !highlightNodeIds.has(link.target?.id || link.target));
      if (dimmed) return "rgba(85, 85, 85, 0.05)";
      return link.type === "connection"
        ? "rgba(163, 163, 163, 0.4)"
        : "rgba(85, 85, 85, 0.2)";
    },
    [highlightNodeIds]
  );

  const linkWidth = useCallback((link: any) => {
    return link.type === "connection" ? 1.5 : 0.5;
  }, []);

  return (
    <ForceGraph2D
      graphData={graphData}
      width={width}
      height={height}
      backgroundColor="#0a0a0a"
      nodeCanvasObject={nodeCanvasObject}
      nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
        const graphNode = node as GraphNode & { x: number; y: number };
        const baseRadius = graphNode.type === "project" ? 5 : 3;
        const scaleFactor = graphNode.type === "project" ? 1.5 : 1;
        const radius = baseRadius + (graphNode.connectionCount || 0) * scaleFactor;
        ctx.beginPath();
        ctx.arc(node.x, node.y, radius + 4, 0, 2 * Math.PI);
        ctx.fillStyle = color;
        ctx.fill();
      }}
      onNodeClick={(node: any) => onNodeClick(node as GraphNode)}
      linkColor={linkColor}
      linkWidth={linkWidth}
      d3AlphaDecay={0.02}
      d3VelocityDecay={0.3}
      cooldownTime={3000}
      enableZoomInteraction={true}
      enablePanInteraction={true}
      enableNodeDrag={true}
    />
  );
}
