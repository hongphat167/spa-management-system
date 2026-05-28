export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-violet-100 px-4 dark:from-slate-950 dark:to-slate-900">
      {children}
    </main>
  );
}
