"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";
import { EmptyState } from "@/components/common/EmptyState";
import { LoadingSkeleton } from "@/components/common/LoadingSkeleton";
import { useCustomerRows } from "@/hooks/useSpaQueries";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomer } from "@/lib/api";
import { useForm } from "@/hooks/useForm";

export default function CustomersPage() {
  const { t } = useTranslation("customers");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const { data, isLoading, error } = useCustomerRows();
  const filtered = useMemo(() => data?.content.filter((customer) => customer.name.toLowerCase().includes(search.toLowerCase())) ?? [], [data, search]);

  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const mutation = useMutation({
    mutationFn: (payload: any) => createCustomer(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      setOpen(false);
      reset();
    },
  });

  function onSubmit(values: any) {
    // map form to API shape
    const payload = {
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      loyaltyPoints: Number(values.loyaltyPoints) || 0,
      totalSpent: Number(values.totalSpent) || 0,
    };
    mutation.mutate(payload);
  }

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return <EmptyState title="Unable to load customers" description={error instanceof Error ? error.message : "Please try again."} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button onClick={() => setOpen(true)}>{t("addCustomer")}</Button>
      </div>
      <Card>
        <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4 max-w-sm" />
        {filtered.length ? (
          <Table>
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800">
                <th>{t("columns.name")}</th>
                <th>{t("columns.email")}</th>
                <th>{t("columns.phone")}</th>
                <th>{t("columns.points")}</th>
                <th>{t("columns.spent")}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((customer) => (
                <tr key={customer.id} className="border-b border-slate-100 dark:border-slate-900">
                  <td className="py-3">{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.loyaltyPoints}</td>
                  <td>${customer.totalSpent}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <EmptyState title="No customers found" description="Try a different search term or wait for backend data." />
        )}
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title={t("addCustomer")}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <Input placeholder={t("columns.name")} {...register("firstName", { required: true })} />
          <Input placeholder={t("columns.email")} {...register("email", { required: true })} />
          <Input placeholder={t("columns.phone")} {...register("phone")} />
          <div className="flex items-center justify-end gap-2">
            <Button type="button" className="bg-gray-300 text-black" onClick={() => { reset(); setOpen(false); }}>
              {t("cancel")}
            </Button>
            <Button type="submit" disabled={mutation.status === "pending"}>{mutation.status === "pending" ? "Saving..." : t("save")}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
