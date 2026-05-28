"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { formatCurrency } from "@/lib/api";
import { useInvoiceRows } from "@/hooks/useSpaQueries";

export default function InvoicesPage() {
  const { t } = useTranslation("invoices");
  const { data, isLoading, error } = useInvoiceRows();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load invoices" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Card>
        {data?.content.length ? (
          <div className="space-y-2">
            <div className="hidden grid-cols-6 gap-2 rounded-xl px-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:grid">
              <span>{t("columns.id")}</span>
              <span>{t("columns.customer")}</span>
              <span>{t("columns.appointmentId")}</span>
              <span>{t("columns.amount")}</span>
              <span>{t("columns.date")}</span>
              <span>{t("columns.status")}</span>
            </div>
            {data.content.map((invoice) => (
              <div key={invoice.id} className="grid items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700 md:grid-cols-6">
                <span>{invoice.id}</span>
                <span>{invoice.customer}</span>
                <span>{invoice.appointmentId}</span>
                <span>{formatCurrency(invoice.amount)}</span>
                <span>{invoice.date}</span>
                <div className="flex items-center gap-2">
                  <Badge variant={invoice.status}>{t(`status.${invoice.status}`)}</Badge>
                  <Button className="h-8 rounded-lg px-3 text-xs">{t("markPaid")}</Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No invoices found" description="The API returned an empty invoices list." />
        )}
      </Card>
    </div>
  );
}
