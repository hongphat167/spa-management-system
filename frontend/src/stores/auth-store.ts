"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTokens, LoginPayload, User } from "@/types/auth";
import { authApi } from "@/services/auth-api";

interface AuthState {
  user: User | null;
  tokens: AuthTokens | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  setHasHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      tokens: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,
      setHasHydrated(value) {
        set({ hasHydrated: value });
      },
      async login(payload) {
        set({ isLoading: true });
        try {
          const data = await authApi.login(payload);
          set({
            user: data.user,
            tokens: { accessToken: data.accessToken, refreshToken: data.refreshToken },
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error) {
          set({ isLoading: false });
          throw error;
        }
      },
      logout() {
        set({ user: null, tokens: null, isAuthenticated: false });
      },
    }),
    {
      name: "spa-auth",
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
