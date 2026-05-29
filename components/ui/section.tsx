import * as React from "react";
import { cn } from "@/lib/utils";

type SectionProps = React.HTMLAttributes<HTMLElement> & {
  as?: "section" | "header" | "footer" | "div";
  container?: boolean;
};

export function Section({
  className,
  as: Tag = "section",
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <Tag className={cn("w-full", className)} {...props}>
      {container ? (
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8 lg:px-margin-desktop">
          {children}
        </div>
      ) : (
        children
      )}
    </Tag>
  );
}

export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-body text-label-md font-semibold uppercase tracking-widest text-secondary">
      {children}
    </span>
  );
}
