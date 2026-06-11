import { Mail, Twitter, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { socialLinks } from "@/data/links";

const iconMap = {
  Mail,
  Twitter,
  Github,
  Linkedin,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border pt-5 mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex gap-4">
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
              <Icon size={16} />
            </a>
          );
        })}
      </div>
      <div className="flex items-center gap-3">
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
        className="px-2 py-0.5 rounded transition-colors text-muted hover:text-muted-foreground"
      >
        machine
      </a>
    </div>
  );
}
