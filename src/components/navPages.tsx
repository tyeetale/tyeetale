import { cn } from "@/lib/utils";
import Link from "next/link";
import { TbMail, TbPencil, TbStar, TbUser } from "react-icons/tb";
import { buttonVariants } from "./ui/button";

export default function NavPages({ className }: { className?: string }) {
  return (
    <nav
      className={cn("flex items-center justify-center space-x-4", className)}
    >
      <Link
        href={"/dashboard/about"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-blue-500 hover:bg-blue-200 hover:text-blue-500 dark:hover:text-blue-500"
        )}
      >
        <TbUser className="mr-2 h-4 w-4" /> About
      </Link>
      <Link
        href={"/dashboard/projects"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-orange-500 hover:bg-orange-200 hover:text-orange-500 dark:hover:text-orange-500"
        )}
      >
        <TbStar className="mr-2 h-4 w-4" /> Projects
      </Link>
      <Link
        href={"/dashboard/blog"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-purple-500 hover:bg-purple-200 hover:text-purple-500 dark:hover:text-purple-500"
        )}
      >
        <TbPencil className="mr-2 h-4 w-4" /> Blog
      </Link>
      <Link
        href={"/dashboard/contact"}
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-500 dark:text-neutral-300 dark:hover:text-neutral-300"
        )}
      >
        <TbMail className="mr-2 h-4 w-4" /> Contact
      </Link>
    </nav>
  );
}
