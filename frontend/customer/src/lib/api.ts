import { BookingStep, Service, Therapist } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080/api';
const API_ERROR_EVENT = 'spa-api-error';

interface PageResponse<T> {
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

interface SpaServiceDto {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string | null;
  price: string | number;
  durationMinutes: number;
  isActive: boolean;
}

interface TherapistDto {
  id: number;
  userId: number;
  userFirstName?: string | null;
  userLastName?: string | null;
  userEmail?: string | null;
  userPhone?: string | null;
  specialization?: string | null;
  experienceYears: number;
  isAvailable: boolean;
}

interface PublicBookingResultDto {
  id: number;
  customerId: number;
  therapistId?: number | null;
  serviceId: number;
  appointmentDate: string;
  endTime: string;
  status: string;
}

function pad(value: number) {
  return String(value).padStart(2, '0');
}

function formatLocalDateTime(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function combineDateTime(date: string, time: string) {
  return new Date(`${date}T${time}:00`);
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      Accept: 'application/json',
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    const responseText = await response.text();
    let message = `Request failed with status ${response.status}`;

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText) as { message?: string; error?: string; detail?: string };
        message = parsed.message ?? parsed.error ?? parsed.detail ?? responseText;
      } catch {
        message = responseText;
      }
    }

    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent(API_ERROR_EVENT, {
          detail: {
            message,
            status: response.status,
          },
        }),
      );
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

function mapService(dto: SpaServiceDto): Service {
  return {
    id: String(dto.id),
    name: dto.name,
    description: dto.description ?? '',
    image: dto.imageUrl || '/images/services/default.jpg',
    price: Number(dto.price),
    duration: dto.durationMinutes,
    category: dto.isActive ? 'Dịch vụ' : 'Tạm ngưng',
    rating: 5,
    reviewCount: 0,
    benefits: [],
    therapists: [],
  };
}

function mapTherapist(dto: TherapistDto): Therapist {
  const fullName = [dto.userFirstName, dto.userLastName].filter(Boolean).join(' ').trim();

  return {
    id: String(dto.id),
    name: fullName || dto.userEmail || `Chuyên viên #${dto.id}`,
    specialty: dto.specialization ?? 'Chuyên viên spa',
    bio: `${dto.experienceYears} năm kinh nghiệm trong lĩnh vực chăm sóc spa.`,
    image: '/images/therapists/default.jpg',
    rating: 5,
    experience: dto.experienceYears,
    services: [],
  };
}

async function fetchPage<T>(path: string) {
  return requestJson<PageResponse<T>>(path);
}

export async function fetchBookingServices(): Promise<Service[]> {
  const response = await fetchPage<SpaServiceDto>('/v1/services/active?page=0&size=100');
  return response.content.map(mapService);
}

export async function fetchConfiguredServices(): Promise<Service[]> {
  return fetchBookingServices();
}

export async function fetchAvailableTherapists(): Promise<Therapist[]> {
  const response = await fetchPage<TherapistDto>('/v1/therapists/available?page=0&size=100');
  return response.content.map(mapTherapist);
}

export async function submitPublicBooking(bookingData: BookingStep): Promise<PublicBookingResultDto> {
  if (!bookingData.service) {
    throw new Error('Missing service selection');
  }

  const [firstName, ...lastNameParts] = bookingData.customerInfo.name.trim().split(/\s+/);
  const lastName = lastNameParts.join(' ').trim() || firstName;
  const appointmentDate = formatLocalDateTime(combineDateTime(bookingData.date, bookingData.time));
  const serviceId = Number(bookingData.service.id);
  const therapistId = bookingData.therapist ? Number(bookingData.therapist.id) : undefined;
  const durationMinutes = bookingData.service.duration;

  return requestJson<PublicBookingResultDto>('/v1/bookings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      serviceId,
      therapistId,
      appointmentDate,
      customerFirstName: firstName || bookingData.customerInfo.name.trim(),
      customerLastName: lastName,
      customerEmail: bookingData.customerInfo.email,
      customerPhone: bookingData.customerInfo.phone,
      notes: bookingData.customerInfo.notes,
    }),
  });
}