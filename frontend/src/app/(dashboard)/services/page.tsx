"use client";

import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { useServices } from "@/features/services/hooks/use-services";
import { formatCurrency } from "@/utils/format";

export default function ServicesPage() {
  const { data = [] } = useServices();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Services</h1>
      <DataTable
        data={data}
        searchKey="name"
        columns={[
          { key: "name", label: "Service" },
          { key: "category", label: "Category" },
          { key: "price", label: "Price", render: (row) => formatCurrency(Number(row.price)) },
          { key: "durationMinutes", label: "Duration" },
          {
            key: "active",
            label: "Status",
            render: (row) => <Badge variant={row.active ? "default" : "secondary"}>{row.active ? "Active" : "Inactive"}</Badge>,
          },
        ]}
      />
    </div>
  );
}
