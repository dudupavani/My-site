"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/src/shared/ui/lib/cn";

const switchVariants = cva(
  [
    "relative inline-flex shrink-0 items-center rounded-full border border-transparent",
    "transition-colors outline-none",
    "focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20",
    "data-[checked=true]:bg-primary data-[checked=false]:bg-input",
  ].join(" "),
  {
    variants: {
      size: {
        sm: "h-4 w-7",
        md: "h-5 w-9",
        lg: "h-6 w-11",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const thumbVariants = cva(
  "pointer-events-none block rounded-full bg-background transition-transform",
  {
    variants: {
      size: {
        sm: "size-3 data-[checked=true]:translate-x-3 data-[checked=false]:translate-x-0",
        md: "size-4 data-[checked=true]:translate-x-4 data-[checked=false]:translate-x-0",
        lg: "size-5 data-[checked=true]:translate-x-5 data-[checked=false]:translate-x-0",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

type SwitchProps = Omit<React.ComponentProps<"button">, "onChange"> &
  VariantProps<typeof switchVariants> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  };

function Switch({
  className,
  checked,
  defaultChecked = false,
  onCheckedChange,
  size,
  disabled,
  onClick,
  ...props
}: SwitchProps) {
  const [uncontrolledChecked, setUncontrolledChecked] =
    React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : uncontrolledChecked;

  function setNextChecked(nextChecked: boolean) {
    if (!isControlled) setUncontrolledChecked(nextChecked);
    onCheckedChange?.(nextChecked);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isChecked}
      data-slot="switch"
      data-size={size}
      data-checked={isChecked}
      disabled={disabled}
      className={cn(switchVariants({ size }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented && !disabled) {
          setNextChecked(!isChecked);
        }
      }}
      {...props}
    >
      <span
        data-slot="switch-thumb"
        data-checked={isChecked}
        className={thumbVariants({ size })}
      />
    </button>
  );
}

export { Switch, switchVariants };
