"use client";

import { useEffect, useState } from "react";

type ToastKind = "success" | "error";

type ToastDetail = {
  kind: ToastKind;
  message: string;
  status?: number;
};

const API_TOAST_EVENT = "spa-api-toast";

export function ToastViewport() {
  const [toast, setToast] = useState<ToastDetail | null>(null);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastDetail>;
      setToast(customEvent.detail);
    };

    window.addEventListener(API_TOAST_EVENT, handleToast as EventListener);
    return () => window.removeEventListener(API_TOAST_EVENT, handleToast as EventListener);
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  if (!toast) {
    return <div aria-live="polite" className="fixed bottom-4 right-4 z-50" />;
  }

  const isSuccess = toast.kind === "success";
  const borderClass = isSuccess ? "border-emerald-200" : "border-red-200";
  const backgroundClass = isSuccess ? "bg-emerald-50" : "bg-white";
  const titleClass = isSuccess ? "text-emerald-700" : "text-red-600";
  const shadowClass = isSuccess ? "shadow-emerald-500/10" : "shadow-red-500/10";
  const title = isSuccess ? "Success" : "Backend error";

  return (
    <div aria-live="assertive" className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className={`rounded-2xl border ${borderClass} ${backgroundClass} px-4 py-3 shadow-2xl ${shadowClass}`}>
        <p className={`text-sm font-semibold ${titleClass}`}>{title}</p>
        <p className="mt-1 text-sm text-slate-700">{toast.message}</p>
        {typeof toast.status === "number" && <p className="mt-1 text-xs text-slate-500">Status: {toast.status}</p>}
      </div>
    </div>
  );
}
