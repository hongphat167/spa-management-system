export type UserRole = "ADMIN" | "MANAGER" | "THERAPIST" | "RECEPTIONIST";

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}
