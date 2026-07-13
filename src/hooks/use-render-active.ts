"use client";

import { useEffect, useRef, useState } from "react";
import { useBackgroundPaused } from "@/lib/background-activity";

type UseRenderActiveOptions = {
  rootMargin?: string;
};

/**
 * Returns a ref plus an `active` flag for expensive background visuals.
 * A visual is only "active" (should run its animation/render loop) while it is
 * near the viewport and no full-screen overlay (e.g. the mobile menu) is open.
 * Everything else — off-screen or behind an overlay — is frozen to save frames.
 */
export function useRenderActive<T extends Element>({
  rootMargin = "150px 0px",
}: UseRenderActiveOptions = {}) {
  const ref = useRef<T>(null);
  const paused = useBackgroundPaused();
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry?.isIntersecting ?? true),
      { rootMargin },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return { ref, active: inView && !paused };
}
