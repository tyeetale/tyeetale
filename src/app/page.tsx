"use client";
import LogoIcon from "@/components/logoIcon";
import NavPages from "@/components/navPages";
import NavSocial from "@/components/navSocial";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import DarkLightToggle from "@/components/ui/darkLightToggle";

export default function Landing() {
  return (
    <main className="flex min-h-screen h-screen flex-col items-center justify-between p-12 bg-neutral-200 dark:bg-neutral-950">
      <div className="w-full h-full flex flex-col justify-between items-center">
        <NavPages />
        <section>
          <CardContainer className="relative min-w-96">
            <CardBody className="bg-gradient-to-br from-cyan-50 from-10% via-yellow-50 via-30% to-purple-50 justify-center relative flex flex-col group/card h-96 shadow-2xl dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1] dark:from-black/[0.1] dark:via-bg-neutral-900 dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] rounded-xl p-12 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-black dark:text-white py-4"
              >
                <LogoIcon />
              </CardItem>{" "}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-black dark:text-white"
              >
                👋 Hello World, I’m Thomas!
              </CardItem>{" "}
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-neutral-600 dark:text-neutral-300"
              >
                Consistent Output + Improvement.
              </CardItem>
              <CardItem
                as="p"
                translateZ="60"
                className="text-neutral-800 dark:text-neutral-400 text-s max-w-sm mt-2"
              >
                Developer & Analyst with over 5+ years of startup experience,
                creating simple fun user experiences for multiple industries,
                infrastructures, and tech stacks.
              </CardItem>
            </CardBody>
          </CardContainer>

          <NavSocial />
        </section>
        <section className="flex items-center justify-center space-x-12">
          <DarkLightToggle />
        </section>
      </div>
    </main>
  );
}
