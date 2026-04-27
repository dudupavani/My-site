"use client";

import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

type AdminThemeProviderProps = {
  children: ReactNode;
};

export function AdminThemeProvider({ children }: AdminThemeProviderProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      disableTransitionOnChange
      enableSystem={false}
      storageKey="admin-theme"
    >
      {children}
    </ThemeProvider>
  );
}
