export type InvoiceStatus = "PENDING" | "PAID";

export interface Invoice {
  id: string;
  customerName: string;
  amount: number;
  status: InvoiceStatus;
  createdAt: string;
}
