"use client";

import { useState } from "react";

export function useAsync<T>() {
  const [loading, setLoading] = useState(false);
  const run = async (fn: () => Promise<T>) => {
    setLoading(true);
    try {
      return await fn();
    } finally {
      setLoading(false);
    }
  };
  return { loading, run };
}
