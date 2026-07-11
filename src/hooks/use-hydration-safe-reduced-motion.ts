"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * Defers prefers-reduced-motion until after mount so SSR markup matches the
 * first client paint (motion wrappers stay consistent during hydration).
 */
export function useHydrationSafeReducedMotion() {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted && prefersReduced;
}
