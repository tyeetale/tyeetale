"use client";
import { useTheme } from "next-themes";
import { TbMoon, TbSun } from "react-icons/tb";
import { Button } from "./button";

export default function DarkLightToggle() {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      variant="link"
      color="neutral-700"
      className="text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-300 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-100 dark:hover:text-neutral-100"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <TbMoon size={24} /> : <TbSun size={24} />}
    </Button>
  );
}
