"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button className="rounded-xl border border-slate-300 p-2 lg:hidden dark:border-slate-700" onClick={() => setOpen(true)}>
        <Menu size={16} />
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="h-full w-72 bg-white dark:bg-slate-950" onClick={(e) => e.stopPropagation()}>
            <Sidebar />
          </div>
        </div>
      ) : null}
    </>
  );
}
