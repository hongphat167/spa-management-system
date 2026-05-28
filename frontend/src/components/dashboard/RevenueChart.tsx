import { Card } from "@/components/ui/Card";

export function RevenueChart({ title }: { title: string }) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="flex h-48 items-end gap-2">
        {[35, 60, 40, 85, 50, 90, 70].map((h, i) => (
          <div key={i} className="flex-1 rounded-t-md bg-gradient-to-t from-blue-500 to-violet-500" style={{ height: `${h}%` }} />
        ))}
      </div>
    </Card>
  );
}
