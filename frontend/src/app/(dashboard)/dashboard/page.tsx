"use client";

import { motion } from "framer-motion";
import { StatCard } from "@/components/dashboard/StatCard";
import { RevenueChart } from "@/components/dashboard/RevenueChart";
import { RecentAppointments } from "@/components/dashboard/RecentAppointments";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { useTranslation } from "@/i18n/useTranslation";

export default function DashboardPage() {
  const { t } = useTranslation("dashboard");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <h1 className="text-2xl font-semibold">{t("title")}</h1>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title={t("revenue")} value="$24,680" hint="+12.4%" />
        <StatCard title={t("bookings")} value="132" hint="+8.1%" />
        <StatCard title={t("customers")} value="489" hint="+4.3%" />
        <StatCard title={t("pendingInvoices")} value="17" hint="-2.0%" />
      </section>
      <section className="grid gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2"><RevenueChart title={t("revenueTrend")} /></div>
        <QuickActions title={t("quickActions")} actions={[t("newAppointment"), t("newCustomer"), t("newService"), t("newInvoice")]} />
      </section>
      <RecentAppointments title={t("recentAppointments")} />
    </motion.div>
  );
}
