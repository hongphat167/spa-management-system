"use client";

import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { useEffect, useState } from "react";

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button
      className="inline-flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-sm dark:border-slate-700"
      onClick={() => setLanguage(language === "en" ? "vi" : "en")}
    >
      <Languages size={16} />
      {mounted ? (language === "en" ? "EN" : "VI") : null}
    </button>
  );
}
