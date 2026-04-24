import * as React from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

type ButtonVariant =
  | "primary"
  | "default"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "link";

type ButtonSize =
  | "xs"
  | "sm"
  | "md"
  | "default"
  | "lg"
  | "icon-xs"
  | "icon-sm"
  | "icon"
  | "icon-lg";

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
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline:
          "border border-input bg-transparent text-foreground hover:bg-muted",
        ghost: "bg-transparent text-foreground hover:bg-muted",
        destructive:
          "border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "h-auto p-0 text-primary underline-offset-4 hover:underline",
      },
      size: {
        xs: "h-7 gap-1 px-2 text-xs [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 gap-1.5 px-3 text-sm",
        md: "h-10 gap-2 px-4 text-sm",
        default: "h-9 gap-1.5 px-2.5 text-sm",
        lg: "h-12 gap-2.5 px-5 text-base",
        "icon-xs": "size-6 p-0 [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-7 p-0 [&_svg:not([class*='size-'])]:size-4",
        icon: "size-8 p-0 [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-9 p-0 [&_svg:not([class*='size-'])]:size-5",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = Omit<React.ComponentProps<"button">, "size"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  iconOnly?: boolean;
  asChild?: boolean;
};

function resolveButtonSize(
  size: ButtonSize | undefined,
  iconOnly: boolean | undefined,
): ButtonSize | undefined {
  if (!iconOnly) return size;
  if (size === "xs") return "icon-xs";
  if (size === "sm") return "icon";
  if (size === "lg") return "icon-lg";
  if (size === "default") return "icon";
  return size ?? "icon";
}

function Button({
  className,
  variant,
  size,
  iconOnly,
  asChild = false,
  children,
  ...props
}: ButtonProps) {
  const resolvedSize = resolveButtonSize(size, iconOnly);
  const buttonClassName = cn(
    buttonVariants({ variant, size: resolvedSize }),
    className,
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<
      {
        className?: string;
      } & Record<string, unknown>
    >;
    const childProps: {
      className?: string;
    } & Record<string, unknown> = {
      ...props,
      "data-slot": "button",
      "data-variant": variant,
      "data-size": resolvedSize,
      "data-icon-only": iconOnly ? "true" : undefined,
      className: cn(buttonClassName, child.props.className),
    };

    return React.cloneElement(child, childProps);
  }

  return (
    <button
      data-slot="button"
      data-variant={variant}
      data-size={resolvedSize}
      data-icon-only={iconOnly ? "true" : undefined}
      className={buttonClassName}
      {...props}
    >
      {children}
    </button>
  );
}

export { Button, buttonVariants };
