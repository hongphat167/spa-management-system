import type { LoginPayload, LoginResponse, User } from "@/types/auth";
import { apiClient } from "@/services/api-client";

export const authApi = {
  login(payload: LoginPayload) {
    return apiClient.post<LoginResponse>("/auth/login", payload).then((res) => res.data);
  },
  me() {
    return apiClient.get<User>("/auth/me").then((res) => res.data);
  },
};
