"use client";

import { useEffect, useRef } from "react";
import p5 from "p5";

interface OrganicPatternProps {
  className?: string;
  width?: number;
  height?: number;
  intensity?: number;
  color?: string;
  animated?: boolean;
}

export default function OrganicPattern({
  className = "",
  width = 400,
  height = 300,
  intensity = 0.5,
  color = "#737373",
  animated = true,
}: OrganicPatternProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const p5InstanceRef = useRef<p5 | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const sketch = (p: p5) => {
      let time = 0;
      const particles: Array<{
        x: number;
        y: number;
        vx: number;
        vy: number;
        size: number;
        opacity: number;
        phase: number;
      }> = [];

      p.setup = () => {
        p.createCanvas(width, height);
        p.colorMode(p.HSB, 360, 100, 100, 1);
        
        // Initialize particles for organic movement
        for (let i = 0; i < 50; i++) {
          particles.push({
            x: p.random(width),
            y: p.random(height),
            vx: p.random(-0.5, 0.5),
            vy: p.random(-0.5, 0.5),
            size: p.random(2, 8),
            opacity: p.random(0.1, 0.4),
            phase: p.random(0, p.TWO_PI),
          });
        }
      };

      p.draw = () => {
        p.background(0, 0, 0, 0); // Transparent background
        
        if (animated) {
          time += 0.01;
        }

        // Draw organic grid system
        p.stroke(0, 0, 20, 0.1);
        p.strokeWeight(0.5);
        
        for (let x = 0; x < width; x += 20) {
          const waveOffset = Math.sin(time + x * 0.01) * 5;
          p.line(x, 0, x + waveOffset, height);
        }
        
        for (let y = 0; y < height; y += 20) {
          const waveOffset = Math.cos(time + y * 0.01) * 5;
          p.line(0, y, width, y + waveOffset);
        }

        // Draw organic geometric shapes
        p.noFill();
        p.stroke(0, 0, 30, 0.2);
        p.strokeWeight(1);
        
        for (let i = 0; i < 8; i++) {
          const x = width * 0.2 + (i * width * 0.1);
          const y = height * 0.5 + Math.sin(time + i) * 20;
          const size = 20 + Math.sin(time * 2 + i) * 10;
          
          p.push();
          p.translate(x, y);
          p.rotate(time + i);
          
          // Organic shape generation
          p.beginShape();
          for (let angle = 0; angle < p.TWO_PI; angle += 0.1) {
            const radius = size + Math.sin(angle * 3 + time) * 5;
            const xPos = Math.cos(angle) * radius;
            const yPos = Math.sin(angle) * radius;
            p.vertex(xPos, yPos);
          }
          p.endShape(p.CLOSE);
          p.pop();
        }

        // Animate particles
        particles.forEach((particle) => {
          particle.x += particle.vx;
          particle.y += particle.vy;
          particle.phase += 0.02;
          
          // Wrap around screen
          if (particle.x < 0) particle.x = width;
          if (particle.x > width) particle.x = 0;
          if (particle.y < 0) particle.y = height;
          if (particle.y > height) particle.y = 0;
          
          // Organic movement
          particle.vx += Math.sin(particle.phase) * 0.01;
          particle.vy += Math.cos(particle.phase) * 0.01;
          
          // Constrain velocity
          particle.vx = Math.max(-1, Math.min(1, particle.vx));
          particle.vy = Math.max(-1, Math.min(1, particle.vy));
          
          // Draw particle
          p.fill(0, 0, 40, particle.opacity);
          p.noStroke();
          p.ellipse(particle.x, particle.y, particle.size);
        });

        // Draw flowing lines
        p.stroke(0, 0, 25, 0.3);
        p.strokeWeight(0.5);
        p.noFill();
        
        for (let i = 0; i < 5; i++) {
          p.beginShape();
          for (let x = 0; x < width; x += 2) {
            const y = height * 0.3 + 
              Math.sin(x * 0.02 + time + i) * 30 +
              Math.cos(x * 0.01 + time * 0.5 + i) * 15;
            p.vertex(x, y);
          }
          p.endShape();
        }
      };

      p.windowResized = () => {
        p.resizeCanvas(width, height);
      };
    };

    p5InstanceRef.current = new p5(sketch, canvasRef.current);

    return () => {
      if (p5InstanceRef.current) {
        p5InstanceRef.current.remove();
        p5InstanceRef.current = null;
      }
    };
  }, [width, height, intensity, color, animated]);

  return (
    <div 
      ref={canvasRef} 
      className={`absolute inset-0 ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        opacity: intensity 
      }}
    />
  );
}