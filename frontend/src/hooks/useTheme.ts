"use client";

import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function useTheme() {
  const store = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", store.theme === "dark");
  }, [store.theme]);

  return store;
}
