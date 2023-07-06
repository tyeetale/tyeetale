"use client";

import { Project } from "contentlayer/generated";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { HiArrowLeft } from "react-icons/hi";

import { cn } from "~/utils/cn";
import { getAllProjects } from "~/utils/getAllProjects";
import { Badge } from "../ui/badge";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

const ProjectIntro = async ({
  title,
  slogan,
  description,
  badges,
}: Pick<Project, "title" | "slogan" | "description" | "badges">) => {
  // const { setTheme } = useTheme();

  const projects = await getAllProjects();

  return (
    <section className="w-1/3 border-zinc-300 relative">
      <header className="flex items-center justify-start space-x-4 h-fit">
        <Link href="/portfolio" className="mr-2">
          tyeetale
        </Link>

        <Separator orientation="vertical" className="h-6 w-[2px]" />

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Projects</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col min-w-fit w-80 space-y-2 p-4 ">
                  {projects.map((project) => (
                    <ListItem
                      key={project.title}
                      title={project.title}
                      href={`/portfolio/${project.slugAsParams}`}
                    >
                      {project.slogan}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <ThemeToggle setTheme={setTheme}/> */}
      </header>

      <div className="flex flex-col space-y-10 mt-10">
        <Link href="/portfolio" className="flex space-x-2 items-center">
          <HiArrowLeft />
          <span>Return to Portfolio</span>
        </Link>
        <div>
          <h1 className="font-bold text-4xl">{title}</h1>
          <p className="font-light font-lg">{slogan}</p>
        </div>

        <p className="font-lg flex-wrap">{description}</p>

        <Separator />
        <div className="flex flex-wrap">
          {(badges as string[]).map((badge) => (
            <Badge
              variant="outline"
              key={badge}
              className="text-sm font-light w-fit h-fit m-1"
            >
              {badge}
            </Badge>
          ))}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 flex justify-center space-x-2">
        <a
          className=" p-2 rounded-lg border border-zinc-200"
          href="mailto:tyeetale@gmail.com?subject=Contact Thomas"
          target="_blank"
        >
          Contact
        </a>
        <a
          className=" p-2 rounded-lg border border-zinc-200"
          href="https://linktr.ee/tyeetale"
          target="_blank"
        >
          Socials
        </a>
        <a
          className=" p-2 rounded-lg border border-zinc-200"
          href="https://drive.google.com/file/d/1Hf3BjqRWI9Xhy34pKhb5U8TFt3blG4W-/view?usp=sharing"
          target="_blank"
        >
          Resume
        </a>
      </div>
    </section>
  );
};

const ListItem = forwardRef<ElementRef<"a">, ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none hover:bg-zinc-100 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

export default ProjectIntro;
