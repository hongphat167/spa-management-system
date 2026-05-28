"use client";

import type { AuthTokens } from "@/types/auth";

const STORAGE_KEY = "spa-auth";

interface PersistState {
  state?: {
    tokens?: AuthTokens | null;
  };
}

export function getStoredTokens(): AuthTokens | null {
  if (typeof window === "undefined") return null;

  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as PersistState;
    return parsed.state?.tokens ?? null;
  } catch {
    return null;
  }
}

export function updateStoredTokens(tokens: AuthTokens | null) {
  if (typeof window === "undefined") return;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  const parsed = raw ? (JSON.parse(raw) as PersistState) : {};
  const next = {
    ...parsed,
    state: {
      ...parsed.state,
      tokens,
    },
  };
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}
