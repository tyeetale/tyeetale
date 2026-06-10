import { Sun, Moon, Monitor } from "lucide-react";
import { useTheme } from "@/lib/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const options = [
    { value: "light" as const, icon: Sun },
    { value: "dark" as const, icon: Moon },
    { value: "system" as const, icon: Monitor },
  ];

  return (
    <div className="flex gap-0.5 bg-surface rounded-md p-0.5">
      {options.map(({ value, icon: Icon }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          className={`p-1.5 rounded transition-colors ${
            theme === value
              ? "bg-border text-foreground"
              : "text-muted hover:text-muted-foreground"
          }`}
          aria-label={`Switch to ${value} theme`}
        >
          <Icon size={14} />
        </button>
      ))}
    </div>
  );
}
