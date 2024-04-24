import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  TbBrandGithub,
  TbBrandInstagram,
  TbBrandLinkedin,
  TbBrandX,
} from "react-icons/tb";
import { buttonVariants } from "./ui/button";

export default function NavSocial({ className }: { className?: string }) {
  return (
    <aside
      className={cn("flex items-center justify-center space-x-12", className)}
    >
      <Link
        href={"https://github.com/tyeetale"}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
        )}
      >
        <TbBrandGithub size={24} />
      </Link>

      <Link
        href={"https://www.linkedin.com/in/tyeetyee/"}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
        )}
      >
        <TbBrandLinkedin size={24} />
      </Link>
      <Link
        href={"https://twitter.com/tyeetale"}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
        )}
      >
        <TbBrandX size={24} />
      </Link>
      <Link
        href={"https://www.instagram.com/tyeetale/"}
        target="_blank"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-500 dark:hover:bg-transparent dark:hover:ring-1 dark:hover:ring-neutral-300 dark:hover:text-neutral-300"
        )}
      >
        <TbBrandInstagram size={24} />
      </Link>
    </aside>
  );
}
