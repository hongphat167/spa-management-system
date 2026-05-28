"use client";

import { Input } from "@/components/ui/Input";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";
import MobileSidebar from "./MobileSidebar";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <Input placeholder="Search..." className="w-48 sm:w-72" />
      </div>
      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
}
