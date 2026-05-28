"use client";

import { create } from "zustand";
import i18n from "@/i18n/config";

export type Language = "en" | "vi";

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

const getInitialLanguage = (): Language => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("spa-language");
  return stored === "vi" ? "vi" : "en";
};

export const useLanguageStore = create<LanguageState>((set) => ({
  language: getInitialLanguage(),
  setLanguage: (language) => {
    localStorage.setItem("spa-language", language);
    i18n.changeLanguage(language);
    set({ language });
  },
}));
