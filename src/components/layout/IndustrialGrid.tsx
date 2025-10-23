"use client";

import { useEffect, useRef } from "react";

interface IndustrialGridProps {
  className?: string;
  opacity?: number;
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
  visible?: boolean;
  animated?: boolean;
}

export default function IndustrialGrid({
  className = "",
  opacity = 0.1,
  spacing = "md",
  visible = true,
  animated = false,
}: IndustrialGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  const spacingMap = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    const drawGrid = (time = 0) => {
      if (!ctx) return;

      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (!visible) return;

      const gridSize = spacingMap[spacing];
      const offset = animated ? Math.sin(time * 0.001) * 2 : 0;

      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
      ctx.lineWidth = 0.5;
      ctx.setLineDash([]);

      // Vertical lines
      for (let x = 0; x < rect.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, rect.height);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < rect.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y + offset);
        ctx.lineTo(rect.width, y + offset);
        ctx.stroke();
      }

      // Draw subtle crosshairs at intersections
      ctx.strokeStyle = `rgba(0, 0, 0, ${opacity * 0.5})`;
      ctx.lineWidth = 0.25;
      
      for (let x = 0; x < rect.width; x += gridSize) {
        for (let y = 0; y < rect.height; y += gridSize) {
          if ((x / gridSize + y / gridSize) % 4 === 0) {
            const crossSize = 2;
            ctx.beginPath();
            ctx.moveTo(x + offset - crossSize, y + offset);
            ctx.lineTo(x + offset + crossSize, y + offset);
            ctx.moveTo(x + offset, y + offset - crossSize);
            ctx.lineTo(x + offset, y + offset + crossSize);
            ctx.stroke();
          }
        }
      }
    };

    const animate = (time: number) => {
      drawGrid(time);
      if (animated) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    resizeCanvas();
    drawGrid();

    const handleResize = () => {
      resizeCanvas();
      drawGrid();
    };

    window.addEventListener("resize", handleResize);

    if (animated) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [opacity, spacing, visible, animated]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 1 }}
    />
  );
}