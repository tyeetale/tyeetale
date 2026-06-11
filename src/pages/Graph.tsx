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
            nodePointerAreaPaint={(node: any, color: string, ctx: CanvasRenderingContext2D) => {
              const radius = (node as GraphNode & { x: number; y: number }).type === "project" ? 6 : 3;
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
