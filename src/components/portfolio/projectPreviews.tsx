import Image from "next/image";
import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";

export const projects: {
  title: string;
  href: string;
  previewImage: string;
  description: string;
}[] = [
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
  {
    title: "Tildenn",
    href: "/portfolio/tildenn",
    previewImage: "/images/tildenn.png",
    description: "The flexible travel app",
  },
];

const ProjectPreviews = () => {
  return (
    <section className="w-2/3 h-full">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <div className="flex flex-col space-y-6">
          {projects.map((project) => (
            <a
              key={project.title}
              href={project.href}
              className="mx-auto w-full border-zinc-100 rounded-2xl relative border-2 overflow-hidden flex flex-col"
            >
              <div className="relative w-full">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={project.previewImage}
                    fill={true}
                    alt={`${project.title} preview`}
                  />
                </AspectRatio>
              </div>
              <div className="h-max p-4 w-full">{project.title}</div>
            </a>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ProjectPreviews;
