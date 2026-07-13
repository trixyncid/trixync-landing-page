"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny global store that lets expensive background visuals (WebGL canvases,
 * animated SVG beams) suspend themselves while a full-screen overlay such as
 * the mobile menu is open. Freezing them keeps overlay transitions smooth on
 * low-powered mobile GPUs and avoids wasting frames rendering things the user
 * can no longer see.
 */
let paused = false;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

export function setBackgroundPaused(next: boolean) {
  if (paused === next) return;
  paused = next;
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return paused;
}

function getServerSnapshot() {
  return false;
}

export function useBackgroundPaused() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
