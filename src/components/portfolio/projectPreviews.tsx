import { Project } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineEye } from "react-icons/hi";
import { AspectRatio } from "../ui/aspect-ratio";
import { ScrollArea } from "../ui/scroll-area";

const ProjectPreviews = ({ projects }: { projects: Project[] }) => {
  return (
    <section className="w-2/3 h-full">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <div className="flex flex-col space-y-6">
          {projects.map((project) => (
            <Link
              key={project.title}
              href={`/portfolio/${project.slugAsParams}`}
              className="w-full border-zinc-100 dark:border-zinc-900 rounded-2xl overflow-hidden relative border-2 flex flex-col text-zinc-300 hover:text-zinc-900 hover:border-zinc-900"
            >
              <div className="relative w-full">
                <AspectRatio ratio={16 / 9}>
                  <Image
                    src={
                      project.previewImage?.filePath.replace(
                        "../../public/",
                        "/"
                      ) as string
                    }
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
            </Link>
          ))}
        </div>
      </ScrollArea>
    </section>
  );
};

export default ProjectPreviews;
