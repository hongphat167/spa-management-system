"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { mockInvoices } from "@/data/mockInvoices";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function InvoicesPage() {
  const { t } = useTranslation("invoices");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Card>
        <div className="space-y-2">
          {mockInvoices.map((invoice) => (
            <div key={invoice.id} className="grid items-center gap-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700 md:grid-cols-6">
              <span>{invoice.id}</span><span>{invoice.customer}</span><span>${invoice.amount}</span><Badge variant={invoice.status}>{t(`status.${invoice.status}`)}</Badge><span>{invoice.date}</span>
              <div className="flex gap-2"><Button className="h-8 rounded-lg px-3 text-xs">{t("markPaid")}</Button><Button className="h-8 rounded-lg bg-slate-700 px-3 text-xs">{t("print")}</Button></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
