"use client";

/**
 * @react-three/fiber v9 still instantiates the deprecated `THREE.Clock` internally
 * (three r183 deprecated it in favor of `THREE.Timer`). Until fiber migrates, this
 * filters out that single unactionable console warning so it doesn't spam the
 * browser console / dev terminal. Remove once fiber uses `THREE.Timer`.
 */
const SUPPRESSED_WARNING = "Clock: This module has been deprecated. Please use THREE.Timer instead.";

declare global {
  interface Window {
    __threeClockWarnPatched?: boolean;
  }
}

if (typeof window !== "undefined" && !window.__threeClockWarnPatched) {
  window.__threeClockWarnPatched = true;
  const originalWarn = console.warn.bind(console);
  console.warn = (...args: unknown[]) => {
    if (typeof args[0] === "string" && args[0].includes(SUPPRESSED_WARNING)) {
      return;
    }
    originalWarn(...args);
  };
}

export function ThreeDeprecationFilter() {
  return null;
}
