"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useInvoices } from "@/features/invoices/hooks/use-invoices";
import { formatCurrency, formatDate } from "@/utils/format";

export default function InvoiceDetailPage() {
  const params = useParams<{ id: string }>();
  const { data = [] } = useInvoices();

  const invoice = useMemo(() => data.find((item) => item.id === params.id), [data, params.id]);

  if (!invoice) {
    return <p className="text-sm text-zinc-500">Invoice not found.</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice {invoice.id}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <p><span className="font-medium">Customer:</span> {invoice.customerName}</p>
        <p><span className="font-medium">Amount:</span> {formatCurrency(invoice.amount)}</p>
        <p><span className="font-medium">Status:</span> {invoice.status}</p>
        <p><span className="font-medium">Created:</span> {formatDate(invoice.createdAt)}</p>
        <Button onClick={() => toast.success("Invoice marked as paid")}>Mark as paid</Button>
      </CardContent>
    </Card>
  );
}
