"use client";

import { useMemo, useState } from "react";
import { useTranslation } from "@/i18n/useTranslation";
import { mockCustomers } from "@/data/mockCustomers";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Table } from "@/components/ui/Table";
import { Modal } from "@/components/ui/Modal";

export default function CustomersPage() {
  const { t } = useTranslation("customers");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const filtered = useMemo(() => mockCustomers.filter((c) => c.name.toLowerCase().includes(search.toLowerCase())), [search]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-semibold">{t("title")}</h1>
        <Button onClick={() => setOpen(true)}>{t("addCustomer")}</Button>
      </div>
      <Card>
        <Input placeholder={t("search")} value={search} onChange={(e) => setSearch(e.target.value)} className="mb-4 max-w-sm" />
        <Table>
          <thead><tr className="border-b border-slate-200 dark:border-slate-800"><th>{t("columns.name")}</th><th>{t("columns.email")}</th><th>{t("columns.phone")}</th><th>{t("columns.bookings")}</th><th>{t("columns.points")}</th></tr></thead>
          <tbody>{filtered.map((c) => <tr key={c.id} className="border-b border-slate-100 dark:border-slate-900"><td className="py-3">{c.name}</td><td>{c.email}</td><td>{c.phone}</td><td>{c.totalBookings}</td><td>{c.loyaltyPoints}</td></tr>)}</tbody>
        </Table>
      </Card>
      <Modal open={open} onClose={() => setOpen(false)} title={t("addCustomer")}>
        <div className="space-y-3"><Input placeholder={t("columns.name")} /><Input placeholder={t("columns.email")} /><Input placeholder={t("columns.phone")} /><Button>{t("save")}</Button></div>
      </Modal>
    </div>
  );
}
