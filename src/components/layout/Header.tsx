import { Link, useNavigate } from "react-router-dom";
import { useRef, useCallback } from "react";

export function Header() {
  const navigate = useNavigate();
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleWordmarkClick = useCallback(() => {
    clickCountRef.current += 1;
    if (clickCountRef.current >= 5) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      navigate("/experiments");
      return;
    }
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  }, [navigate]);

  const navLinks = [
    { label: "home", to: "/" },
    { label: "about", to: "/about" },
    { label: "projects", to: "/projects" },
    { label: "notes", to: "/notes" },
    { label: "tools", to: "/tools" },
  ];

  return (
    <header className="flex items-center justify-between pb-4 mb-10 border-b border-border">
      <button
        onClick={handleWordmarkClick}
        className="flex items-center gap-2 font-heading font-bold text-base text-foreground tracking-tight"
      >
        <img src="/profile.png" alt="tyeetale" className="w-6 h-6 rounded-full" />
        tyeetale
      </button>
      <nav className="flex items-center gap-3">
        {navLinks.map((link, idx) => (
          <span key={link.to} className="flex items-center gap-3">
            <Link
              to={link.to}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
            {idx < navLinks.length - 1 && (
              <span className="text-border text-xs">·</span>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}
