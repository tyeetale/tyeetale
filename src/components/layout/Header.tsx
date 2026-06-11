import { Mail, Github, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
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

export function Header() {
  return (
    <header className="flex items-center justify-between pb-4 mb-10 border-b border-border">
      <Link to="/" className="font-heading font-bold text-base text-foreground tracking-tight">
        tyeetale
      </Link>
      <div className="flex gap-3">
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
    </header>
  );
}
