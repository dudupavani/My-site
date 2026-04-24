"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const toggleVariants = cva(
  [
    "inline-flex items-center justify-center gap-1 rounded-lg border border-transparent",
    "font-medium whitespace-nowrap transition-colors outline-none",
    "hover:bg-muted hover:text-foreground",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:pointer-events-none disabled:opacity-50",
    "aria-pressed:bg-primary/20 aria-pressed:border-primary/40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border-input bg-transparent",
      },
      size: {
        sm: "h-8 min-w-8 px-2.5 text-sm",
        md: "h-10 min-w-10 px-3 text-sm",
        lg: "h-12 min-w-12 px-4 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

type ToggleProps = Omit<React.ComponentProps<"button">, "onChange"> &
  VariantProps<typeof toggleVariants> & {
    pressed?: boolean;
    defaultPressed?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  };

function Toggle({
  className,
  variant,
  size,
  pressed,
  defaultPressed = false,
  onPressedChange,
  disabled,
  onClick,
  ...props
}: ToggleProps) {
  const [uncontrolledPressed, setUncontrolledPressed] =
    React.useState(defaultPressed);
  const isControlled = pressed !== undefined;
  const isPressed = isControlled ? pressed : uncontrolledPressed;

  function setNextPressed(nextPressed: boolean) {
    if (!isControlled) setUncontrolledPressed(nextPressed);
    onPressedChange?.(nextPressed);
  }

  return (
    <button
      type="button"
      aria-pressed={isPressed}
      data-slot="toggle"
      disabled={disabled}
      className={cn(toggleVariants({ variant, size }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          setNextPressed(!isPressed);
        }
      }}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
