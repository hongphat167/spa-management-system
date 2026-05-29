"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useTranslation } from "@/i18n/useTranslation";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { deleteService, formatCurrency, ServiceRow } from "@/lib/api";
import { useServiceRows } from "@/hooks/useSpaQueries";
import ServiceModal from "@/components/services/ServiceModal";
import { Pencil, Trash2 } from "lucide-react";

function dispatchToast(kind: "success" | "error", message: string) {
  window.dispatchEvent(
    new CustomEvent("spa-api-toast", {
      detail: { kind, message },
    }),
  );
}

export default function ServicesPage() {
  const { t } = useTranslation("services");
  const [open, setOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceRow | null>(null);
  const { data, isLoading, error } = useServiceRows();
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (serviceId: number) => deleteService(serviceId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["services"] });
      dispatchToast("success", "Service deleted successfully.");
    },
  });

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load services" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button onClick={() => setOpen(true)}>
          <Plus size={16} className="mr-2" />
          Add Service
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {data?.content.length ? (
          data.content.map((service) => (
            <Card key={service.id} className="transition hover:-translate-y-1">
              {service.imageUrl && (
                <div className="mb-4 overflow-hidden rounded-xl bg-slate-100">
                  <img src={service.imageUrl} alt={service.name} className="h-40 w-full object-cover" />
                </div>
              )}
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">{service.name}</h3>
                <Badge variant={service.isActive ? "completed" : "cancelled"}>{service.isActive ? t("active") : t("inactive")}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{service.description || "No description provided."}</p>
              <p className="mt-4 font-medium">
                {formatCurrency(service.price)} • {service.durationMinutes}m
              </p>
              <div className="mt-4 flex gap-2">
                <Button
                  type="button"
                  className="flex-1 rounded-xl bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100"
                  onClick={() => {
                    setEditingService(service);
                    setOpen(true);
                  }}
                >
                  <Pencil size={14} className="mr-2" />
                  Edit
                </Button>
                <Button
                  type="button"
                  className="flex-1 rounded-xl bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-950 dark:text-red-200"
                  onClick={() => {
                    if (confirm(`Delete service \"${service.name}\"?`)) {
                      deleteMutation.mutate(service.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 size={14} className="mr-2" />
                  Delete
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="md:col-span-2 xl:col-span-3">
            <EmptyState title="No services found" description="The API returned an empty services list." />
          </div>
        )}
      </div>
      <ServiceModal
        open={open}
        service={editingService}
        onClose={() => {
          setOpen(false);
          setEditingService(null);
        }}
      />
    </div>
  );
}
