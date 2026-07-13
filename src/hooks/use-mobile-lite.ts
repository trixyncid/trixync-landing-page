"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 767px)";

function subscribe(onChange: () => void) {
  const media = window.matchMedia(QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  // Assume desktop on SSR so we don't permanently skip heavy visuals for bots.
  // Mobile clients swap to lite mode after hydration before deferred effects mount.
  return false;
}

/** True on phone-width viewports — skip WebGL / beam loops to keep UI responsive. */
export function useMobileLite() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
