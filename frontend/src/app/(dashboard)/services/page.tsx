"use client";

import { useTranslation } from "@/i18n/useTranslation";
import { mockServices } from "@/data/mockServices";
import { Card } from "@/components/ui/Card";

export default function ServicesPage() {
  const { t } = useTranslation("services");
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {mockServices.map((service) => (
          <Card key={service.id} className="transition hover:-translate-y-1">
            <p className="text-sm text-blue-600">{service.category}</p>
            <h3 className="mt-2 font-semibold">{service.name}</h3>
            <p className="mt-1 text-sm text-slate-500">{service.description}</p>
            <p className="mt-4 font-medium">${service.price} • {service.duration}m</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
