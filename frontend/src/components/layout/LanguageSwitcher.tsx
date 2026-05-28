"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
      onClick={() => setLanguage(language === "en" ? "vi" : "en")}
    >
      <Languages size={16} />
      {language === "en" ? "EN" : "VI"}
    </button>
  );
}
