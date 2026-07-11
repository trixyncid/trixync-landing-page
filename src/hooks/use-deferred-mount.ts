"use client";

import { useEffect, useState } from "react";

type UseDeferredMountOptions = {
  /** Max wait before mounting even if the main thread is busy. */
  timeout?: number;
  /** When true, never mounts (e.g. prefers-reduced-motion). */
  disabled?: boolean;
};

/**
 * Waits for browser idle time before mounting heavy client-only UI (Three.js, beams, etc.).
 */
export function useDeferredMount({
  timeout = 2500,
  disabled = false,
}: UseDeferredMountOptions = {}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (disabled) return;

    let cancelled = false;

    const mount = () => {
      if (!cancelled) setReady(true);
    };

    if (typeof window.requestIdleCallback === "function") {
      const id = window.requestIdleCallback(mount, { timeout });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(id);
      };
    }

    const id = window.setTimeout(mount, Math.min(timeout, 1200));
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [disabled, timeout]);

  return ready;
}
