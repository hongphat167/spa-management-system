"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchAppointmentRows, fetchCustomerRows, fetchInvoiceRows, fetchServiceRows } from "@/lib/api";

export function useAppointmentRows(pageSize = 20) {
  return useQuery({
    queryKey: ["appointments", pageSize],
    queryFn: () => fetchAppointmentRows(0, pageSize),
  });
}

export function useRecentAppointmentRows() {
  return useQuery({
    queryKey: ["recent-appointments"],
    queryFn: () => fetchAppointmentRows(0, 5),
  });
}

export function useCustomerRows(pageSize = 20) {
  return useQuery({
    queryKey: ["customers", pageSize],
    queryFn: () => fetchCustomerRows(0, pageSize),
  });
}

export function useServiceRows(pageSize = 20) {
  return useQuery({
    queryKey: ["services", pageSize],
    queryFn: () => fetchServiceRows(0, pageSize),
  });
}

export function useInvoiceRows(pageSize = 20) {
  return useQuery({
    queryKey: ["invoices", pageSize],
    queryFn: () => fetchInvoiceRows(0, pageSize),
  });
}
