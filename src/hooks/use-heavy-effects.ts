"use client";

import { useRef } from "react";
import { useReducedMotion } from "motion/react";
import { useDeferredMount } from "@/hooks/use-deferred-mount";
import { useInViewport } from "@/hooks/use-in-viewport";
import { useMobileLite } from "@/hooks/use-mobile-lite";

type UseHeavyEffectsOptions = {
  idleTimeout?: number;
  rootMargin?: string;
};

/** Mount heavy visuals when near the viewport and the main thread is idle. */
export function useHeavyEffects({
  idleTimeout = 2500,
  rootMargin = "200px 0px",
}: UseHeavyEffectsOptions = {}) {
  const reduced = useReducedMotion();
  const mobileLite = useMobileLite();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInViewport(ref, { rootMargin, once: true });
  const idleReady = useDeferredMount({
    timeout: idleTimeout,
    disabled: reduced === true || mobileLite,
  });

  return {
    ref,
    ready: !reduced && !mobileLite && inView && idleReady,
  };
}
