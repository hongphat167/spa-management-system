const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

export type AppointmentStatus = "scheduled" | "inProgress" | "completed" | "cancelled";
export type InvoiceStatus = "paid" | "pending" | "overdue";

export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface CustomerDto {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateOfBirth?: string;
  loyaltyPoints: number;
  totalSpent: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface SpaServiceDto {
  id: number;
  name: string;
  description?: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TherapistDto {
  id: number;
  userId: number;
  specialization?: string;
  experienceYears: number;
  isAvailable: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface InvoiceDto {
  id: number;
  appointmentId: number;
  customerId: number;
  totalAmount: number;
  taxAmount: number;
  discountAmount: number;
  paymentStatus: string;
  dueAt?: string;
  paidAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentDto {
  id: number;
  customerId: number;
  therapistId?: number;
  serviceId: number;
  appointmentDate: string;
  endTime: string;
  status: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AppointmentRow {
  id: number;
  customer: string;
  therapist: string;
  service: string;
  time: string;
  status: AppointmentStatus;
}

export interface CustomerRow {
  id: number;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalSpent: number;
}

export interface ServiceRow {
  id: number;
  name: string;
  description: string;
  price: number;
  durationMinutes: number;
  isActive: boolean;
}

export interface InvoiceRow {
  id: number;
  customer: string;
  appointmentId: number;
  amount: number;
  status: InvoiceStatus;
  date: string;
}

function buildPageQuery(page: number, size: number, sort?: string | string[]) {
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("size", String(size));
  if (Array.isArray(sort)) {
    sort.forEach((value) => params.append("sort", value));
  } else if (sort) {
    params.append("sort", sort);
  }
  return params.toString();
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function normalizeAppointmentStatus(status: string): AppointmentStatus {
  const normalized = status.replace(/[\_\s-]/g, "").toLowerCase();

  if (normalized === "scheduled") return "scheduled";
  if (normalized === "inprogress") return "inProgress";
  if (normalized === "completed") return "completed";
  if (normalized === "cancelled" || normalized === "canceled") return "cancelled";
  return "scheduled";
}

function normalizeInvoiceStatus(status: string): InvoiceStatus {
  const normalized = status.replace(/[\_\s-]/g, "").toLowerCase();

  if (normalized === "paid") return "paid";
  if (normalized === "overdue") return "overdue";
  return "pending";
}

function formatDateTime(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function formatDate(value?: string) {
  if (!value) {
    return "-";
  }

  const date = new Date(value);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export async function fetchAppointmentRows(page = 0, size = 20): Promise<PageResponse<AppointmentRow>> {
  const response = await requestJson<PageResponse<AppointmentDto>>(`/v1/appointments?${buildPageQuery(page, size)}`);
  const content = await Promise.all(
    response.content.map(async (appointment) => {
      const [customer, service, therapist] = await Promise.all([
        requestJson<CustomerDto>(`/v1/customers/${appointment.customerId}`),
        requestJson<SpaServiceDto>(`/v1/services/${appointment.serviceId}`),
        appointment.therapistId ? requestJson<TherapistDto>(`/v1/therapists/${appointment.therapistId}`) : Promise.resolve(undefined),
      ]);

      const customerName = [customer.firstName, customer.lastName].filter(Boolean).join(" ").trim() || customer.email;

      return {
        id: appointment.id,
        customer: customerName,
        therapist: therapist?.specialization || (appointment.therapistId ? `Therapist #${appointment.therapistId}` : "Unassigned"),
        service: service.name,
        time: formatDateTime(appointment.appointmentDate),
        status: normalizeAppointmentStatus(appointment.status),
      };
    }),
  );

  return {
    ...response,
    content,
  };
}

export async function fetchCustomerRows(page = 0, size = 20): Promise<PageResponse<CustomerRow>> {
  const response = await requestJson<PageResponse<CustomerDto>>(`/v1/customers?${buildPageQuery(page, size)}`);

  return {
    ...response,
    content: response.content.map((customer) => ({
      id: customer.id,
      name: [customer.firstName, customer.lastName].filter(Boolean).join(" ").trim() || customer.email,
      email: customer.email,
      phone: customer.phone || "-",
      loyaltyPoints: customer.loyaltyPoints,
      totalSpent: customer.totalSpent,
    })),
  };
}

export async function createCustomer(payload: Partial<CustomerDto>): Promise<CustomerDto> {
  const body = {
    email: payload.email,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone,
    dateOfBirth: payload.dateOfBirth,
    loyaltyPoints: payload.loyaltyPoints ?? 0,
    totalSpent: payload.totalSpent ?? 0,
  };

  return requestJson<CustomerDto>(`/v1/customers`, { method: "POST", body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
}

export async function fetchServiceRows(page = 0, size = 20): Promise<PageResponse<ServiceRow>> {
  const response = await requestJson<PageResponse<SpaServiceDto>>(`/v1/services?${buildPageQuery(page, size)}`);

  return {
    ...response,
    content: response.content.map((service) => ({
      id: service.id,
      name: service.name,
      description: service.description || "",
      price: service.price,
      durationMinutes: service.durationMinutes,
      isActive: service.isActive,
    })),
  };
}

export async function fetchInvoiceRows(page = 0, size = 20): Promise<PageResponse<InvoiceRow>> {
  const response = await requestJson<PageResponse<InvoiceDto>>(`/v1/invoices?${buildPageQuery(page, size)}`);
  const content = await Promise.all(
    response.content.map(async (invoice) => {
      const customer = await requestJson<CustomerDto>(`/v1/customers/${invoice.customerId}`);

      return {
        id: invoice.id,
        customer: [customer.firstName, customer.lastName].filter(Boolean).join(" ").trim() || customer.email,
        appointmentId: invoice.appointmentId,
        amount: invoice.totalAmount,
        status: normalizeInvoiceStatus(invoice.paymentStatus),
        date: formatDate(invoice.dueAt ?? invoice.paidAt ?? invoice.createdAt),
      };
    }),
  );

  return {
    ...response,
    content,
  };
}

export function formatCurrency(value: number) {
  return formatMoney(value);
}
