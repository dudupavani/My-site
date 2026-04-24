import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const inputVariants = cva(
  [
    "flex w-full rounded-lg border border-input bg-background text-foreground shadow-xs",
    "transition-colors placeholder:text-muted-foreground/70",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-10 px-3.5 text-sm",
        lg: "h-12 px-4 text-base",
        xl: "h-14 px-4 text-lg",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Input({
  className,
  size,
  type = "text",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size}
      className={cn(inputVariants({ size }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
