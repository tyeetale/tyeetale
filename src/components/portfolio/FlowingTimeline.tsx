"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { cn } from "~/utils/cn";

interface FlowingTimelineProps {
  projects: Project[];
  className?: string;
}

interface TimelineNode {
  project: Project;
  position: { x: number; y: number };
  rotation: number;
  scale: number;
  phase: number;
}

export default function FlowingTimeline({ projects, className = "" }: FlowingTimelineProps) {
  const [nodes, setNodes] = useState<TimelineNode[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  // Initialize timeline nodes
  useEffect(() => {
    const newNodes: TimelineNode[] = projects.map((project, index) => {
      const angle = (index / projects.length) * Math.PI * 2;
      const radius = 200 + Math.sin(index) * 50;
      
      return {
        project,
        position: {
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
        },
        rotation: angle,
        scale: 0.8 + Math.sin(index) * 0.2,
        phase: index * 0.5,
      };
    });
    
    setNodes(newNodes);
  }, [projects]);

  // Animate timeline
  useEffect(() => {
    const animate = (time: number) => {
      setNodes(prevNodes => 
        prevNodes.map((node, index) => ({
          ...node,
          phase: node.phase + 0.01,
          position: {
            x: node.position.x + Math.sin(time * 0.001 + node.phase) * 0.5,
            y: node.position.y + Math.cos(time * 0.001 + node.phase) * 0.3,
          },
          rotation: node.rotation + Math.sin(time * 0.0005 + node.phase) * 0.02,
          scale: 0.8 + Math.sin(time * 0.001 + node.phase) * 0.1,
        }))
      );
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    });
  };

  const getNodeStyle = (node: TimelineNode, index: number) => {
    const distance = Math.sqrt(
      Math.pow(node.position.x - mousePosition.x, 2) + 
      Math.pow(node.position.y - mousePosition.y, 2)
    );
    
    const isHovered = distance < 100;
    const isSelected = selectedNode === index;
    
    return {
      transform: `translate(${node.position.x}px, ${node.position.y}px) rotate(${node.rotation}rad) scale(${isHovered ? node.scale * 1.2 : node.scale})`,
      zIndex: isSelected ? 10 : isHovered ? 5 : 1,
      opacity: isHovered ? 1 : 0.7,
    };
  };

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full h-full overflow-hidden", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Flowing background lines */}
      <div className="absolute inset-0">
        {Array.from({ length: 8 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-px bg-gradient-to-r from-transparent via-industrial-200 to-transparent"
            style={{
              top: `${20 + i * 10}%`,
              left: 0,
            }}
            animate={{
              x: [0, 100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Timeline nodes */}
      <AnimatePresence>
        {nodes.map((node, index) => (
          <motion.div
            key={node.project.slugAsParams}
            className="absolute cursor-pointer"
            style={getNodeStyle(node, index)}
            onMouseEnter={() => setSelectedNode(index)}
            onMouseLeave={() => setSelectedNode(null)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={`/${node.project.slugAsParams}`}>
              <div className="geometric-surface-elevated p-4 w-48 h-32 group">
                <div className="relative w-full h-20 mb-2 overflow-hidden rounded-organic-md">
                  <Image
                    src={node.project.previewImage?.filePath.replace("../../public/", "/") as string}
                    alt={`${node.project.title} preview`}
                    fill
                    className="object-cover transition-transform group-hover:scale-110"
                  />
                </div>
                
                <div className="space-y-1">
                  <h3 className="text-title font-medium truncate">
                    {node.project.title}
                  </h3>
                  <p className="text-caption text-industrial-600 line-clamp-2">
                    {node.project.slogan}
                  </p>
                </div>

                {/* Connection lines */}
                <motion.div
                  className="absolute -top-2 -left-2 w-4 h-4 bg-industrial-300 rounded-full"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Central hub */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-8 h-8 bg-industrial-900 rounded-full -translate-x-1/2 -translate-y-1/2"
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        }}
      />

      {/* Connection lines to central hub */}
      {nodes.map((node, index) => (
        <motion.div
          key={`connection-${index}`}
          className="absolute top-1/2 left-1/2 w-px bg-gradient-to-r from-industrial-300 to-transparent origin-left"
          style={{
            height: Math.sqrt(
              Math.pow(node.position.x, 2) + Math.pow(node.position.y, 2)
            ),
            transform: `rotate(${Math.atan2(node.position.y, node.position.x)}rad)`,
            transformOrigin: "0 0",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 2 + index * 0.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}