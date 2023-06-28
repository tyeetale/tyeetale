"use client";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { useTheme } from "next-themes";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { HiMoon, HiSun } from "react-icons/hi";
import { cn } from "~/utils/cn";
import { projects } from "../portfolio/projectPreviews";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Separator } from "../ui/separator";

const projectSkillset = [
  "Product Design",
  "Analytics",
  "UI/UX",
  "Web Dev",
  "Branding",
  "Marketing",
  "Startup Experience",
  "User Journey",
];

const ProjectIntro = () => {
  const { setTheme } = useTheme();

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
                      href={project.href}
                    >
                      {project.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <HiSun className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <HiMoon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      <div className="flex flex-col space-y-10 mt-10">
        <div>
          <h1 className="font-bold text-4xl">Project Name</h1>
          <p className="font-light font-lg">Designer + Developer</p>
        </div>

        <p className="font-lg flex-wrap">description of the project</p>

        <div className="flex flex-wrap">
          {projectSkillset.map((skill) => (
            <Badge
              variant="outline"
              key={skill}
              className="text-sm font-light w-fit h-fit m-1"
            >
              {skill}
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
