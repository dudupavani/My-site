import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/modules/blog-admin/ui/lib/utils";

const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-background shadow-xs transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
  {
    variants: {
      size: {
        default: "h-8 px-3 py-1 text-sm text-foreground",
        lg: "h-10 px-3.5 py-2 text-base text-foreground",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

function Input({
  className,
  type,
  size = "default",
  ...props
}: Omit<React.ComponentProps<"input">, "size"> &
  VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-size={size ?? undefined}
      className={cn(inputVariants({ size, className }))}
      {...props}
    />
  );
}

export { Input, inputVariants };
