import { format } from "date-fns";

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function formatDate(value: string) {
  return format(new Date(value), "MMM d, yyyy HH:mm");
}
