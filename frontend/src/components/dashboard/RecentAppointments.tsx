import { mockAppointments } from "@/data/mockAppointments";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export function RecentAppointments({ title }: { title: string }) {
  return (
    <Card>
      <h3 className="mb-4 font-semibold">{title}</h3>
      <div className="space-y-3">
        {mockAppointments.slice(0, 5).map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
            <div>
              <p className="font-medium">{item.customer}</p>
              <p className="text-xs text-slate-500">{item.service}</p>
            </div>
            <Badge variant={item.status}>{item.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}
