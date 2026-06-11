import { Mail, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { socialLinks } from "@/data/links";

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const iconMap = {
  Mail,
  XIcon,
  Github,
  Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border pt-5 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon];
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              <Icon size={15} />
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
        <ThemeToggle />
        <HumanMachineToggle />
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
