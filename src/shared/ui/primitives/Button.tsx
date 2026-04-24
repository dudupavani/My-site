import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@/src/shared/ui/lib/cn";

const buttonVariants = cva(
  [
    "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg",
    "font-medium whitespace-nowrap transition-colors outline-none select-none",
    "focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent text-foreground hover:bg-muted",
      },
      size: {
        sm: "",
        md: "",
        lg: "",
      },
      iconOnly: {
        true: "",
        false: "",
      },
    },
    compoundVariants: [
      {
        size: "sm",
        iconOnly: false,
        className: "h-8 gap-1.5 px-3 text-sm",
      },
      {
        size: "md",
        iconOnly: false,
        className: "h-10 gap-2 px-4 text-sm",
      },
      {
        size: "lg",
        iconOnly: false,
        className: "h-12 gap-2.5 px-5 text-base",
      },
      {
        size: "sm",
        iconOnly: true,
        className: "size-8 p-0 [&_svg:not([class*='size-'])]:size-4",
      },
      {
        size: "md",
        iconOnly: true,
        className: "size-10 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
      {
        size: "lg",
        iconOnly: true,
        className: "size-12 p-0 [&_svg:not([class*='size-'])]:size-6",
      },
    ],
    defaultVariants: {
      variant: "primary",
      size: "md",
      iconOnly: false,
    },
  },
);

function Button({
  className,
  variant,
  size,
  iconOnly,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-icon-only={iconOnly ? "true" : undefined}
      className={cn(buttonVariants({ variant, size, iconOnly }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
