import { Card } from "@/components/ui/Card";

export function StatCard({ title, value, hint }: { title: string; value: string; hint: string }) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{title}</p>
      <p className="mt-2 text-3xl font-semibold">{value}</p>
      <p className="mt-1 text-xs text-emerald-600">{hint}</p>
    </Card>
  );
}
