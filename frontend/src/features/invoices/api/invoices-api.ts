import { formatISO, subDays } from "date-fns";
import { apiClient } from "@/services/api-client";
import type { Invoice } from "@/features/invoices/types/invoice";

const fallback: Invoice[] = [
  { id: "INV-001", customerName: "Olivia Martin", amount: 160, status: "PAID", createdAt: formatISO(subDays(new Date(), 2)) },
  { id: "INV-002", customerName: "Ethan Lee", amount: 95, status: "PENDING", createdAt: formatISO(subDays(new Date(), 1)) },
];

export async function getInvoices() {
  try {
    return await apiClient.get<Invoice[]>("/invoices").then((res) => res.data);
  } catch {
    return fallback;
  }
}
