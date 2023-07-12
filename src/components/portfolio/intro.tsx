import { Project } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from "react";
import { cn } from "~/utils/cn";
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

const skillset = [
  "Product Design",
  "Analytics",
  "UI/UX",
  "Web Dev",
  "Branding",
  "Marketing",
  "Startup Experience",
  "User Journey",
];

const Intro = ({ projects }: { projects: Project[] }) => {
  // const {setTheme} = useTheme();
  return (
    <section className="lg:w-1/3 border-zinc-300 relative">
      <header className="flex items-center justify-start space-x-4 h-fit">
        <Link href="/" className="mr-2">
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
                      href={`/${project.slugAsParams}`}
                    >
                      {project.slogan}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <ThemeToggle setTheme={setTheme} /> */}
      </header>

      <div className="flex flex-col space-y-10 mt-10">
        <Image
          src="/profile.png"
          alt="profile picture"
          width={84}
          height={84}
        />
        <div>
          <h1 className="font-bold text-4xl">Thomas Yee</h1>
          <p className="font-light font-lg">Designer + Developer</p>
        </div>

        <div className="space-y-4">
          <p className="font-lg flex-wrap">
            {`Hi, I'm Thomas, a designer and developer with over 5 years of
            experience. I enjoy building cool things from scratch, ranging from`}
            <span className="ml-1 font-bold">ideas</span>,
            <span className="ml-1 font-bold">products</span>, to
            <span className="ml-1 font-bold">marketing strategies</span>.{" "}
            {`I'm a extreme generalist focused on adapting and scaling my work across
            different mediums, infrastructures, and tech stacks.`}
          </p>
          <p className="font-lg flex-wrap">
            {`I'm also an avid adventurer, always seeking new experiences and
            perspectives. I love to chat about food, culture, and tech.`}
          </p>
        </div>
        <Separator />

        <div className="lg:flex lg:flex-wrap hidden">
          {skillset.map((skill) => (
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
      <div className="absolute top-0 right-0 lg:hidden flex justify-center space-x-2">
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

      <div className="absolute hidden lg:bottom-0 lg:left-0 lg:flex justify-center space-x-2">
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

export default Intro;
