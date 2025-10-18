"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "~/utils/cn";

interface ModularSectionProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "floating";
  morphing?: boolean;
  draggable?: boolean;
  resizable?: boolean;
  onResize?: (size: { width: number; height: number }) => void;
}

export default function ModularSection({
  children,
  className = "",
  variant = "default",
  morphing = false,
  draggable = false,
  resizable = false,
  onResize,
}: ModularSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [size, setSize] = useState({ width: 0, height: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef({ x: 0, y: 0 });

  const variantClasses = {
    default: "geometric-surface",
    elevated: "geometric-surface-elevated",
    floating: "geometric-surface-floating",
  };

  useEffect(() => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!draggable) return;
    
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && draggable) {
      setPosition({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResize = (e: React.MouseEvent, direction: string) => {
    if (!resizable) return;
    
    e.stopPropagation();
    setIsResizing(true);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction.includes("right")) newWidth += deltaX;
      if (direction.includes("left")) newWidth -= deltaX;
      if (direction.includes("bottom")) newHeight += deltaY;
      if (direction.includes("top")) newHeight -= deltaY;

      newWidth = Math.max(200, newWidth);
      newHeight = Math.max(150, newHeight);

      setSize({ width: newWidth, height: newHeight });
      onResize?.({ width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <motion.div
      ref={sectionRef}
      className={cn(
        "relative group",
        variantClasses[variant],
        morphing && "geometric-morph",
        draggable && "cursor-move",
        className
      )}
      style={{
        transform: draggable ? `translate(${position.x}px, ${position.y}px)` : undefined,
        width: resizable ? `${size.width}px` : undefined,
        height: resizable ? `${size.height}px` : undefined,
      }}
      onMouseDown={handleMouseDown}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      animate={morphing ? { 
        borderRadius: ["1.5rem", "2.5rem", "1.5rem"],
        rotate: [0, 1, 0],
      } : {}}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}

      {/* Resize handles */}
      {resizable && (
        <>
          <div
            className="absolute top-0 right-0 w-2 h-2 bg-industrial-300 opacity-0 group-hover:opacity-100 cursor-se-resize transition-opacity"
            onMouseDown={(e) => handleResize(e, "bottom-right")}
          />
          <div
            className="absolute bottom-0 right-0 w-2 h-2 bg-industrial-300 opacity-0 group-hover:opacity-100 cursor-se-resize transition-opacity"
            onMouseDown={(e) => handleResize(e, "bottom-right")}
          />
          <div
            className="absolute bottom-0 left-0 w-2 h-2 bg-industrial-300 opacity-0 group-hover:opacity-100 cursor-sw-resize transition-opacity"
            onMouseDown={(e) => handleResize(e, "bottom-left")}
          />
        </>
      )}

      {/* Drag indicator */}
      {draggable && (
        <div className="absolute top-2 left-2 w-1 h-1 bg-industrial-400 opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
    </motion.div>
  );
}