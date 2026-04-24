import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const labelVariants = cva(
  "flex items-center gap-2 font-medium leading-none text-foreground select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

function Label({
  className,
  size,
  ...props
}: React.ComponentProps<"label"> & VariantProps<typeof labelVariants>) {
  return (
    <label
      data-slot="label"
      data-size={size}
      className={cn(labelVariants({ size }), className)}
      {...props}
    />
  );
}

export { Label, labelVariants };
