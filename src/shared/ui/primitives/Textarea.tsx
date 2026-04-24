import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const textareaVariants = cva(
  [
    "flex min-h-24 w-full rounded-lg border border-input bg-background text-foreground shadow-xs",
    "transition-colors placeholder:text-muted-foreground/70",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "px-3 py-2 text-sm",
        md: "px-3.5 py-2.5 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Textarea({
  className,
  size,
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-size={size}
      className={cn(textareaVariants({ size }), className)}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
