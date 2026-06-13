import { useRef, useEffect } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hue: number;
}

export default function PhysicsWorld() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    const gravity = 0.3;
    const damping = 0.85;
    const balls: Ball[] = [];

    // Create initial balls
    for (let i = 0; i < 20; i++) {
      balls.push({
        x: Math.random() * w,
        y: Math.random() * h * 0.5,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 2,
        r: 6 + Math.random() * 12,
        hue: Math.random() * 360,
      });
    }

    // Click to add balls
    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      balls.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        vx: (Math.random() - 0.5) * 8,
        vy: -5 - Math.random() * 5,
        r: 8 + Math.random() * 10,
        hue: Math.random() * 360,
      });
    };
    canvas.addEventListener('click', handleClick);

    let animId: number;

    function animate() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
      ctx.fillRect(0, 0, w, h);

      for (const ball of balls) {
        // Gravity
        ball.vy += gravity;

        // Move
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off walls
        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx *= -damping; }
        if (ball.x + ball.r > w) { ball.x = w - ball.r; ball.vx *= -damping; }
        if (ball.y + ball.r > h) { ball.y = h - ball.r; ball.vy *= -damping; }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy *= -damping; }

        // Ball-to-ball collision
        for (const other of balls) {
          if (other === ball) continue;
          const dx = other.x - ball.x;
          const dy = other.y - ball.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = ball.r + other.r;
          if (dist < minDist && dist > 0) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            ball.x -= nx * overlap * 0.5;
            ball.y -= ny * overlap * 0.5;
            other.x += nx * overlap * 0.5;
            other.y += ny * overlap * 0.5;
            const dvx = ball.vx - other.vx;
            const dvy = ball.vy - other.vy;
            const dot = dvx * nx + dvy * ny;
            ball.vx -= dot * nx * damping;
            ball.vy -= dot * ny * damping;
            other.vx += dot * nx * damping;
            other.vy += dot * ny * damping;
          }
        }

        // Draw
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${ball.hue}, 60%, 60%, 0.9)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animId);
      canvas.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div>
      <h3 className="text-xs text-[#555] uppercase tracking-widest mb-2">Physics Simulation</h3>
      <canvas
        ref={canvasRef}
        className="w-full h-[250px] rounded-lg cursor-crosshair bg-[#0a0a0a]"
      />
      <p className="text-xs text-[#555] mt-2">Click to add balls. Gravity, collisions, and damping.</p>
    </div>
  );
}
