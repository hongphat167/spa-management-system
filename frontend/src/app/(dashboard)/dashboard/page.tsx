"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { useDashboardSummary } from "@/features/dashboard/hooks/use-dashboard-summary";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { formatDate } from "@/utils/format";

export default function DashboardPage() {
  const { data: summary, isLoading: summaryLoading } = useDashboardSummary();
  const { data: appointments } = useAppointments();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-sm text-zinc-500">Revenue, bookings and customer insights.</p>
      </div>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {summaryLoading && [1, 2, 3, 4].map((item) => <Skeleton key={item} className="h-28" />)}
        {summary?.map((card) => (
          <Card key={card.title}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-zinc-500">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{card.value}</p>
              <p className="text-sm text-emerald-600">{card.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {appointments?.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                <div>
                  <p className="text-sm font-medium">{appointment.customerName}</p>
                  <p className="text-xs text-zinc-500">{appointment.serviceName} · {formatDate(appointment.startAt)}</p>
                </div>
                <Badge variant="secondary">{appointment.status}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">Create appointment</div>
            <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">Add customer</div>
            <div className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">Generate invoice</div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
