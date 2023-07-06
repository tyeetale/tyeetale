import { Mdx } from "../mdx/mdx-components";
import { ScrollArea } from "../ui/scroll-area";

const ProjectDetails = ({ code }: { code: string }) => {
  return (
    <section className="w-2/3 h-full flex">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <div className="flex flex-col space-y-6 overflow-hidden">
          <Mdx code={code} />
        </div>
      </ScrollArea>
    </section>
  );
};

export default ProjectDetails;
