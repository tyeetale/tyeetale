"use client";
import { useTheme } from "next-themes";

export default function About() {
  const { setTheme, theme } = useTheme();

  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-12">
      hi
    </main>
  );
}
