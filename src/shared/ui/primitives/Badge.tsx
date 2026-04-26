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
        default: "border-transparent bg-primary/10 text-primary",
        primary: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive:
          "border-destructive/40 bg-destructive/10 text-destructive",
        outline: "border-border bg-transparent text-foreground",
        success: "border-green-400 bg-green-100 text-green-900",
        warning: "border-orange-400 bg-orange-100 text-orange-900",
        "gray-light": "border-transparent bg-zinc-400 text-zinc-800",
        "gray-dark": "border-transparent bg-zinc-800 text-zinc-400",
        "gray-outline":
          "border-zinc-700 text-zinc-500 dark:border-zinc-700",
        "gold-dark": "border-transparent bg-gold-800 text-white/80",
        "gold-light": "border-transparent bg-gold-400 text-gold-950",
        "gold-outline":
          "border-gold-700/50 bg-transparent text-gold-500",
      },
      size: {
        sm: "h-6 px-2 text-xs",
        md: "h-7 px-2.5 text-sm",
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
