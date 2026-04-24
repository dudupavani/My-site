import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const badgeVariants = cva(
  [
    "inline-flex w-fit shrink-0 items-center justify-center rounded-full border",
    "font-medium leading-none whitespace-nowrap transition-colors",
  ].join(" "),
  {
    variants: {
      variant: {
        "gray-light": "border-transparent bg-zinc-100 text-zinc-700",
        "gray-dark": "border-transparent bg-zinc-900 text-zinc-100",
        "gray-outline":
          "border-zinc-300 bg-transparent text-zinc-700 dark:border-zinc-700 dark:text-zinc-300",
        "gold-dark": "border-transparent bg-gold-900 text-gold-100",
        "gold-light": "border-transparent bg-gold-100 text-gold-900",
        "gold-outline":
          "border-gold-500/40 bg-transparent text-gold-600 dark:text-gold-400",
      },
      size: {
        sm: "h-6 px-2 text-[10px]",
        md: "h-7 px-2.5 text-xs",
        lg: "h-8 px-3 text-sm",
      },
    },
    defaultVariants: {
      variant: "gray-light",
      size: "md",
    },
  },
);

function Badge({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
