"use client";
import { useTheme } from "next-themes";

export default function About() {
  const { setTheme, theme } = useTheme();

  return (
    <main className="bg-red-500 h-full rounded-3xl py-24">
      <div className="w-full h-full bg-green-500 p-8">hi</div>
    </main>
  );
}
