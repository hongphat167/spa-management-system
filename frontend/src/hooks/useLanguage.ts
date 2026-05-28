"use client";

import { useEffect } from "react";
import i18n from "@/i18n/config";
import { useLanguageStore } from "@/stores/languageStore";

export function useLanguage() {
  const { language, setLanguage } = useLanguageStore();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return { language, setLanguage };
}
