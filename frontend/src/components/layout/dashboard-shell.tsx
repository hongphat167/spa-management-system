"use client";

import { useState } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { TopNav } from "@/components/layout/top-nav";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <AppSidebar collapsed={collapsed} />
      <div className="flex min-h-screen flex-1 flex-col">
        <TopNav onToggleSidebar={() => setCollapsed((value) => !value)} />
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
