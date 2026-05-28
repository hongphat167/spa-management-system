import { apiClient } from "@/services/api-client";
import type { SummaryCard } from "@/features/dashboard/types/dashboard";

const fallback: SummaryCard[] = [
  { title: "Revenue", value: "$24,300", change: "+12%" },
  { title: "Bookings", value: "182", change: "+8%" },
  { title: "Customers", value: "425", change: "+5%" },
  { title: "Pending invoices", value: "14", change: "-2%" },
];

export async function getDashboardSummary() {
  try {
    return await apiClient.get<SummaryCard[]>("/dashboard/summary").then((res) => res.data);
  } catch {
    return fallback;
  }
}
