"use client";

import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppointments } from "@/features/appointments/hooks/use-appointments";
import { formatDate } from "@/utils/format";

export default function AppointmentsPage() {
  const { data = [] } = useAppointments();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Appointments</h1>
      <Card>
        <CardHeader>
          <CardTitle>Booking calendar (upcoming slots)</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-2 md:grid-cols-3">
          {data.slice(0, 6).map((appointment) => (
            <div key={appointment.id} className="rounded-md border border-zinc-200 p-3 text-sm dark:border-zinc-800">
              <p className="font-medium">{appointment.customerName}</p>
              <p className="text-zinc-500">{formatDate(appointment.startAt)}</p>
            </div>
          ))}
        </CardContent>
      </Card>
      <DataTable
        data={data}
        searchKey="customerName"
        columns={[
          { key: "customerName", label: "Customer" },
          { key: "serviceName", label: "Service" },
          { key: "therapistName", label: "Therapist" },
          { key: "startAt", label: "Time", render: (row) => formatDate(String(row.startAt)) },
          { key: "status", label: "Status", render: (row) => <Badge variant="secondary">{String(row.status)}</Badge> },
        ]}
      />
    </div>
  );
}
