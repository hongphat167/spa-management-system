"use client";

import { useEffect, useState } from 'react';

type ApiErrorDetail = {
  message: string;
  status?: number;
};

const API_ERROR_EVENT = 'spa-api-error';

export function ToastViewport() {
  const [error, setError] = useState<ApiErrorDetail | null>(null);

  useEffect(() => {
    const handleError = (event: Event) => {
      const customEvent = event as CustomEvent<ApiErrorDetail>;
      setError(customEvent.detail);
    };

    window.addEventListener(API_ERROR_EVENT, handleError as EventListener);
    return () => window.removeEventListener(API_ERROR_EVENT, handleError as EventListener);
  }, []);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = window.setTimeout(() => setError(null), 4500);
    return () => window.clearTimeout(timer);
  }, [error]);

  if (!error) {
    return <div aria-live="polite" className="fixed bottom-4 right-4 z-50" />;
  }

  return (
    <div aria-live="assertive" className="fixed bottom-4 right-4 z-50 max-w-sm">
      <div className="rounded-2xl border border-red-200 bg-white px-4 py-3 shadow-2xl shadow-red-500/10">
        <p className="text-sm font-semibold text-red-600">Backend error</p>
        <p className="mt-1 text-sm text-slate-700">{error.message}</p>
        {typeof error.status === 'number' && <p className="mt-1 text-xs text-slate-500">Status: {error.status}</p>}
      </div>
    </div>
  );
}