"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationItems } from "@/data/navigationItems";
import { useTranslation } from "@/i18n/useTranslation";

export default function Sidebar() {
  const pathname = usePathname();
  const { t } = useTranslation("common");

  return (
    <aside className="hidden w-64 border-r border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950 lg:block">
      <h1 className="mb-6 text-xl font-semibold">Spa Admin</h1>
      <nav className="space-y-1">
        {navigationItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${active ? "bg-blue-600 text-white" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`}>
              <Icon size={16} />
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
