import { ReactNode } from "react";

const variants: Record<string, string> = {
  paid: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
  overdue: "bg-rose-100 text-rose-700",
  scheduled: "bg-sky-100 text-sky-700",
  inProgress: "bg-violet-100 text-violet-700",
  completed: "bg-emerald-100 text-emerald-700",
  cancelled: "bg-slate-200 text-slate-700",
};

export function Badge({ children, variant }: { children: ReactNode; variant: string }) {
  return <span className={`rounded-full px-2 py-1 text-xs font-medium ${variants[variant] || "bg-slate-100 text-slate-700"}`}>{children}</span>;
}
