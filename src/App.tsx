import { ThemeProvider } from "@/lib/theme";

export function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground">tyeetale</p>
      </div>
    </ThemeProvider>
  );
}
