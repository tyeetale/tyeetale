import { Mdx } from "../mdx/mdx-components";
import { ScrollArea } from "../ui/scroll-area";

const ProjectDetails = ({ code }: { code: string }) => {
  return (
    <section className="w-2/3 h-full flex">
      <ScrollArea className="h-[calc(100vh-8rem)] w-full">
        <Mdx code={code} />
      </ScrollArea>
    </section>
  );
};

export default ProjectDetails;
