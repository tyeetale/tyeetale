import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="flex items-center justify-between pb-4 mb-10 border-b border-border">
      <Link to="/" className="font-heading font-bold text-base text-foreground tracking-tight">
        tyeetale
      </Link>
      <ThemeToggle />
    </header>
  );
}
