import { useRef, useCallback } from 'react';

export default function Wordmark() {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    clickCountRef.current += 1;

    if (clickCountRef.current >= 5) {
      e.preventDefault();
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      window.location.href = '/experiments';
      return;
    }

    // First click navigates home (default link behavior)
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 2000);
  }, []);

  return (
    <a
      href="/"
      onClick={handleClick}
      className="flex items-center gap-2 font-heading font-bold text-base text-foreground tracking-tight"
    >
      <img src="/profile.png" alt="tyeetale" className="w-6 h-6 rounded-full" />
      tyeetale
    </a>
  );
}
