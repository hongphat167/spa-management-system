"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { mockAppointments } from "@/data/mockAppointments";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export default function AppointmentsPage() {
  const { t } = useTranslation("appointments");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Card>
        <div className="mb-4 inline-flex rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">{t("calendar")}: 2026-05-28</div>
        <div className="space-y-2">
          {mockAppointments.map((item) => (
            <div key={item.id} className="grid gap-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700 md:grid-cols-5">
              <span>{item.customer}</span><span>{item.therapist}</span><span>{item.service}</span><span>{item.time}</span><Badge variant={item.status}>{t(`status.${item.status}`)}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
