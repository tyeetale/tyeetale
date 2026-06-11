import type { ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[640px] px-4 sm:px-6 py-8 sm:py-12 min-h-screen flex flex-col">
      {children}
    </div>
  );
}
