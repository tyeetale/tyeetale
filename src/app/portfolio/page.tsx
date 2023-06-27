"use client";

import Intro from "~/components/portfolio/intro";
import { Separator } from "~/components/ui/separator";

const Portfolio = () => {
  return (
    <main className="w-screen h-screen p-8">
      <div className="w-full h-full rounded-3xl border border-zinc-300 p-8 flex space-x-4">
        <Intro />

        <Separator
          orientation="vertical"
          className="h-full w-[2px] bg-zinc-300"
        />

        <section className="w-2/3 border">hi</section>
      </div>
    </main>
  );
};
export default Portfolio;
