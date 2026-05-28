import { useQuery } from "@tanstack/react-query";
import { getInvoices } from "@/features/invoices/api/invoices-api";

export function useInvoices() {
  return useQuery({ queryKey: ["invoices"], queryFn: getInvoices });
}
