import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-body text-label-md font-semibold uppercase tracking-wider transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-container hover:shadow-lg",
        secondary:
          "bg-secondary-container text-on-secondary-container hover:opacity-90 hover:scale-[1.02]",
        outline:
          "border border-outline text-primary bg-transparent hover:bg-surface-container-high",
        ghost:
          "border border-white/30 bg-white/10 backdrop-blur-md text-white hover:bg-white/20",
        link: "text-secondary hover:underline underline-offset-4 uppercase",
      },
      size: {
        sm: "h-10 px-5 rounded-full",
        md: "h-12 px-7 rounded-full",
        lg: "h-14 px-10 rounded-full",
        square: "h-12 px-8 rounded-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { buttonVariants };
