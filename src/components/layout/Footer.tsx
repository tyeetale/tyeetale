import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export function Footer() {
  return (
    <footer className="border-t border-border pt-5 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <ThemeToggle />
      <div className="flex items-center gap-3">
        <HumanMachineToggle />
        <Link
          to="/building"
          className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
        >
          building
        </Link>
        <Link
          to="/uses"
          className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
        >
          uses
        </Link>
        <Link
          to="/graph"
          className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
        >
          graph
        </Link>
        <Link
          to="/qr"
          className="text-xs text-muted border border-border px-2 py-0.5 rounded hover:text-foreground transition-colors"
        >
          QR
        </Link>
      </div>
    </footer>
  );
}

function HumanMachineToggle() {
  return (
    <div className="flex gap-0.5 bg-surface rounded-md p-0.5 text-xs">
      <Link
        to="/"
        className="px-2 py-0.5 rounded transition-colors bg-border text-foreground"
      >
        human
      </Link>
      <a
        href="/llms.txt"
        target="_blank"
        rel="noopener noreferrer"
        className="px-2 py-0.5 rounded transition-colors text-muted hover:text-muted-foreground"
      >
        machine
      </a>
    </div>
  );
}
