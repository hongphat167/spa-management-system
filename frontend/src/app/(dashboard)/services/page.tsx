"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { formatCurrency } from "@/lib/api";
import { useServiceRows } from "@/hooks/useSpaQueries";

export default function ServicesPage() {
  const { t } = useTranslation("services");
  const { data, isLoading, error } = useServiceRows();

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load services" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.content.length ? (
          data.content.map((service) => (
            <Card key={service.id} className="transition hover:-translate-y-1">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{service.name}</h3>
                <Badge variant={service.isActive ? "completed" : "cancelled"}>{service.isActive ? t("active") : t("inactive")}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{service.description || "No description provided."}</p>
              <p className="mt-4 font-medium">
                {formatCurrency(service.price)} • {service.durationMinutes}m
              </p>
            </Card>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState title="No services found" description="The API returned an empty services list." />
          </div>
        )}
      </div>
    </div>
  );
}
