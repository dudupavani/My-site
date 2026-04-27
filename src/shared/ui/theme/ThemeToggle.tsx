"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { Button } from "@/src/shared/ui/primitives/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && theme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = isDark ? "Ativar tema claro" : "Ativar tema escuro";

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      aria-label={label}
      title={label}
      onClick={() => setTheme(nextTheme)}
    >
      {isDark ? <Sun /> : <Moon />}
    </Button>
  );
}
