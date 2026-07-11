export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotionFallback(staticClass: string, animatedClass: string) {
  if (typeof window === "undefined") return animatedClass;
  return prefersReducedMotion() ? staticClass : animatedClass;
}
