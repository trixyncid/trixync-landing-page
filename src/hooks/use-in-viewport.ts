"use client";

import { useEffect, useState } from "react";

type UseInViewportOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
};

export function useInViewport<T extends Element>(
  ref: React.RefObject<T | null>,
  { rootMargin = "200px 0px", threshold = 0, once = true }: UseInViewportOptions = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, ref, rootMargin, threshold]);

  return inView;
}
