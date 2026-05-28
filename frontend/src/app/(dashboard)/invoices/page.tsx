"use client";

import Link from "next/link";
import { DataTable } from "@/components/common/data-table";
import { Badge } from "@/components/ui/badge";
import { useInvoices } from "@/features/invoices/hooks/use-invoices";
import { formatCurrency, formatDate } from "@/utils/format";

export default function InvoicesPage() {
  const { data = [] } = useInvoices();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Invoices</h1>
      <DataTable
        data={data}
        searchKey="id"
        columns={[
          { key: "id", label: "Invoice", render: (row) => <Link className="underline" href={`/invoices/${row.id}`}>{String(row.id)}</Link> },
          { key: "customerName", label: "Customer" },
          { key: "amount", label: "Amount", render: (row) => formatCurrency(Number(row.amount)) },
          { key: "status", label: "Status", render: (row) => <Badge variant="secondary">{String(row.status)}</Badge> },
          { key: "createdAt", label: "Created", render: (row) => formatDate(String(row.createdAt)) },
        ]}
      />
    </div>
  );
}
