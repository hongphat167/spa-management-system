"use client";

import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useRecentAppointmentRows } from "@/hooks/useSpaQueries";

export function RecentAppointments({ title }: { title: string }) {
  const { data, isLoading, error } = useRecentAppointmentRows();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load appointments" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <Card>
      <h3 className="mb-4 font-semibold">{title}</h3>
      {data?.content.length ? (
        <div className="space-y-3">
          {data.content.map((item) => (
            <div key={item.id} className="flex items-center justify-between rounded-xl border border-slate-200 p-3 dark:border-slate-700">
              <div>
                <p className="font-medium">{item.customer}</p>
                <p className="text-xs text-slate-500">
                  {item.service} • {item.time}
                </p>
              </div>
              <Badge variant={item.status}>{item.status}</Badge>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState title="No recent appointments" description="Once the backend returns data, recent appointments will appear here." />
      )}
    </Card>
  );
}
