"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useAppointmentRows } from "@/hooks/useSpaQueries";

export default function AppointmentsPage() {
  const { t } = useTranslation("appointments");
  const { data, isLoading, error } = useAppointmentRows();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load appointments" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <Card>
        <div className="mb-4 inline-flex rounded-xl border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">{t("calendar")}: 2026-05-28</div>
        {data?.content.length ? (
          <div className="space-y-2">
            <div className="hidden grid-cols-5 gap-2 rounded-xl px-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:grid">
              <span>{t("columns.customer")}</span>
              <span>{t("columns.therapist")}</span>
              <span>{t("columns.service")}</span>
              <span>{t("columns.time")}</span>
              <span>{t("columns.status")}</span>
            </div>
            {data.content.map((item) => (
              <div key={item.id} className="grid gap-2 rounded-xl border border-slate-200 p-3 text-sm dark:border-slate-700 md:grid-cols-5">
                <span className="font-medium">{item.customer}</span>
                <span>{item.therapist}</span>
                <span>{item.service}</span>
                <span>{item.time}</span>
                <Badge variant={item.status}>{t(`status.${item.status}`)}</Badge>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="No appointments found" description="The API returned an empty appointments list." />
        )}
      </Card>
    </div>
  );
}
