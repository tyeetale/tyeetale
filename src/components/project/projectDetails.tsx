import Image from "next/image";
import { HiOutlineEye } from "react-icons/hi";
import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";

export const projectSections: {
  title: string;
  previewImage: string;
  description: string;
}[] = [
  {
    title: "Tildenn",
    previewImage: "/images/tildenn.png",
    description: "the flexible travel app",
  },
  {
    title: "Metaphor3d",
    previewImage: "/images/metaphor3d.png",
    description: "ai 3d generated assets",
  },
  {
    title: "GetFibes",
    previewImage: "/images/getfibes.png",
    description: "influencer affiliate platform",
  },
  {
    title: "Coopsight",
    previewImage: "/images/coopsight.png",
    description: "startup ecosystem matchmaker",
  },
  {
    title: "NYU Course Search",
    previewImage: "/images/nyu-course-search.png",
    description: "a better NYU class registrar",
  },
  {
    title: "Deshihou",
    previewImage: "/images/deshihou.png",
    description: "anime reminder app",
  },
];

const ProjectDetails = () => {
  return (
    <section className="w-2/3 h-full flex">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <div className="flex flex-col space-y-6">
          {projectSections.map((project) => (
            <div
              key={project.title}
              className="w-full border-zinc-100 dark:border-zinc-900 rounded-2xl relative border-2 overflow-hidden flex flex-col text-zinc-300 hover:text-zinc-900 hover:border-zinc-900"
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
              <div className="h-max p-4 w-full flex justify-between items-center ">
                <p className="font-bold text-lg ">{project.title}</p>
                <div className="p-2 flex space-x-4 items-center">
                  <HiOutlineEye size={24} className="stroke-[1.5px]" />
                  <span className="">View</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ProjectDetails;
