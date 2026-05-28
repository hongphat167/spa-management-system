import axios from "axios";
import { getStoredTokens, updateStoredTokens } from "@/services/token-storage";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = axios.create({
  baseURL,
  timeout: 20_000,
});

apiClient.interceptors.request.use((config) => {
  const tokens = getStoredTokens();
  if (tokens?.accessToken) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = "Bearer ".concat(tokens.accessToken);
  }
  return config;
});

let refreshingPromise: Promise<string | null> | null = null;

async function refreshAccessToken() {
  const tokens = getStoredTokens();
  if (!tokens?.refreshToken) return null;

  const response = await axios.post<{ accessToken: string }>(`${baseURL ?? ""}/auth/refresh`, {
    refreshToken: tokens.refreshToken,
  });

  updateStoredTokens({
    accessToken: response.data.accessToken,
    refreshToken: tokens.refreshToken,
  });

  return response.data.accessToken;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error?.response?.status;
    const originalRequest = error?.config as (typeof error.config & { _retry?: boolean });

    if (status !== 401 || originalRequest?._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;
    refreshingPromise ??= refreshAccessToken().finally(() => {
      refreshingPromise = null;
    });

    const newAccessToken = await refreshingPromise;
    if (!newAccessToken) {
      return Promise.reject(error);
    }

    originalRequest.headers = originalRequest.headers ?? {};
    originalRequest.headers.Authorization = "Bearer ".concat(newAccessToken);
    return apiClient(originalRequest);
  }
);
