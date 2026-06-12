import { SEO } from "@/components/SEO";
import { Container } from "@/components/layout/Container";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { useState, useEffect, useRef } from "react";

export function Uses() {
  return (
    <>
      <SEO
        title="Tools"
        description="Interactive tools and widgets by Thomas Yee."
        path="/tools"
      />
      <Container>
        <Header />
        <h1 className="font-heading font-bold text-xl text-foreground mb-2">Tools</h1>
        <p className="text-muted-foreground text-sm mb-8">
          Interactive things. Play around.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {/* Live Clock */}
          <BentoCard className="sm:col-span-2">
            <LiveClock />
          </BentoCard>

          {/* Interactive color toy */}
          <BentoCard>
            <ColorOrb />
          </BentoCard>

          {/* Keystroke counter */}
          <BentoCard>
            <KeystrokeRipple />
          </BentoCard>

          {/* Gravity dots toy */}
          <BentoCard className="sm:col-span-2">
            <GravityDots />
          </BentoCard>
        </div>

        <Footer />
      </Container>
    </>
  );
}

function BentoCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-border rounded-xl p-4 bg-surface/50 overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function LiveClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  const seconds = time.getSeconds().toString().padStart(2, "0");

  return (
    <div className="flex items-center justify-between">
      <div>
        <span className="text-xs text-muted uppercase tracking-widest">Local time</span>
        <div className="font-heading text-3xl sm:text-4xl text-foreground font-bold tracking-tight tabular-nums">
          {hours}:{minutes}
          <span className="text-muted text-2xl sm:text-3xl">:{seconds}</span>
        </div>
      </div>
      <div className="text-right">
        <span className="text-xs text-muted">
          {time.toLocaleDateString("en-US", { weekday: "long" })}
        </span>
        <div className="text-sm text-muted-foreground">
          {time.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
        </div>
      </div>
    </div>
  );
}

function ColorOrb() {
  const [hue, setHue] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) return;
    const interval = setInterval(() => {
      setHue((h) => (h + 2) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, [isHovering]);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[120px] cursor-pointer select-none"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onTouchStart={() => setIsHovering(true)}
      onTouchEnd={() => setIsHovering(false)}
    >
      <div
        className="w-16 h-16 rounded-full transition-all duration-100"
        style={{
          background: `hsl(${hue}, 70%, 60%)`,
          boxShadow: `0 0 ${isHovering ? 30 : 10}px hsl(${hue}, 70%, 60%)`,
          transform: isHovering ? "scale(1.2)" : "scale(1)",
        }}
      />
      <span className="text-xs text-muted mt-3">
        {isHovering ? `hsl(${hue}, 70%, 60%)` : "hover me"}
      </span>
    </div>
  );
}

function KeystrokeRipple() {
  const [keys, setKeys] = useState<{ key: string; id: number; x: number }[]>([]);
  const nextId = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const width = containerRef.current?.offsetWidth || 400;
      const newKey = {
        key: e.key.length === 1 ? e.key : e.key.slice(0, 3),
        id: nextId.current++,
        x: Math.random() * (width - 40),
      };
      setKeys((prev) => [...prev.slice(-15), newKey]);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (keys.length === 0) return;
    const timer = setTimeout(() => {
      setKeys((prev) => prev.slice(1));
    }, 2000);
    return () => clearTimeout(timer);
  }, [keys]);

  return (
    <div ref={containerRef} className="relative min-h-[80px] flex flex-col justify-center">
      <span className="text-xs text-muted uppercase tracking-widest mb-2">
        Type anywhere — keystrokes ripple here
      </span>
      <div className="relative h-[50px]">
        {keys.map((k) => (
          <span
            key={k.id}
            className="absolute bottom-0 text-lg font-mono text-foreground animate-bounce opacity-70"
            style={{ left: k.x }}
          >
            {k.key}
          </span>
        ))}
      </div>
    </div>
  );
}

function GravityDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; r: number; hue: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * 2;
      canvas.height = canvas.offsetHeight * 2;
      ctx.scale(2, 2);
    };
    resize();

    // Initialize dots
    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    dotsRef.current = Array.from({ length: 30 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: 2 + Math.random() * 3,
      hue: Math.random() * 360,
    }));

    function animate() {
      if (!canvas || !ctx) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      ctx.clearRect(0, 0, w, h);

      const dots = dotsRef.current;
      const mouse = mouseRef.current;

      for (const dot of dots) {
        // Attract toward mouse if active
        if (mouse.active) {
          const dx = mouse.x - dot.x;
          const dy = mouse.y - dot.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            dot.vx += (dx / dist) * 0.15;
            dot.vy += (dy / dist) * 0.15;
          }
        }

        // Friction
        dot.vx *= 0.98;
        dot.vy *= 0.98;

        // Move
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Bounce off walls
        if (dot.x < dot.r) { dot.x = dot.r; dot.vx *= -0.8; }
        if (dot.x > w - dot.r) { dot.x = w - dot.r; dot.vx *= -0.8; }
        if (dot.y < dot.r) { dot.y = dot.r; dot.vy *= -0.8; }
        if (dot.y > h - dot.r) { dot.y = h - dot.r; dot.vy *= -0.8; }

        // Draw
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${dot.hue}, 60%, 60%, 0.8)`;
        ctx.fill();
      }

      // Draw connections between nearby dots
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x;
          const dy = dots[i].y - dots[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 60) {
            ctx.beginPath();
            ctx.moveTo(dots[i].x, dots[i].y);
            ctx.lineTo(dots[j].x, dots[j].y);
            ctx.strokeStyle = `rgba(100, 100, 100, ${0.3 * (1 - dist / 60)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    const handleMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const handleLeave = () => { mouseRef.current.active = false; };
    const handleTouch = (e: TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches[0];
      if (touch) {
        mouseRef.current = { x: touch.clientX - rect.left, y: touch.clientY - rect.top, active: true };
      }
    };

    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);
    canvas.addEventListener("touchmove", handleTouch);
    canvas.addEventListener("touchend", handleLeave);

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseleave", handleLeave);
      canvas.removeEventListener("touchmove", handleTouch);
      canvas.removeEventListener("touchend", handleLeave);
    };
  }, []);

  return (
    <div>
      <span className="text-xs text-muted uppercase tracking-widest">
        Move your cursor — particles follow
      </span>
      <canvas
        ref={canvasRef}
        className="w-full h-[140px] mt-2 rounded-lg cursor-crosshair"
      />
    </div>
  );
}
