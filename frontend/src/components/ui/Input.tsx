import { InputHTMLAttributes } from "react";

export function Input({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm outline-none ring-blue-400 transition focus:ring-2 dark:border-slate-700 dark:bg-slate-900 ${className}`} {...props} />;
}
