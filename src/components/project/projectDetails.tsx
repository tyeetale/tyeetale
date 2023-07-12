import { Mdx } from "../mdx/mdx-components";
import { ScrollArea } from "../ui/scroll-area";

const ProjectDetails = ({ code }: { code: string }) => {
  return (
    <section className="lg:w-2/3 lg:h-full lg:flex w-full">
      <ScrollArea className="lg:h-[calc(100vh-8rem)] hidden lg:block lg:w-full">
        <Mdx code={code} />
      </ScrollArea>

      <div className="lg:hidden mt-8 md:pb-16 w-full">
        <Mdx code={code} />
      </div>
    </section>
  );
};

export default ProjectDetails;
