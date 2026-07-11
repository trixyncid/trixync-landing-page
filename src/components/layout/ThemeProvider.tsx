"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

type Theme = "light" | "dark" | "system";
type ResolvedTheme = "light" | "dark";

type ThemeSnapshot = {
  theme: Theme;
  resolvedTheme: ResolvedTheme;
};

type ThemeContextValue = ThemeSnapshot & {
  setTheme: (theme: Theme) => void;
};

const DEFAULT_SNAPSHOT: ThemeSnapshot = {
  theme: "dark",
  resolvedTheme: "dark",
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

let snapshot: ThemeSnapshot = DEFAULT_SNAPSHOT;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getServerSnapshot(): ThemeSnapshot {
  return DEFAULT_SNAPSHOT;
}

function getSnapshot(): ThemeSnapshot {
  return snapshot;
}

function getSystemTheme(): ResolvedTheme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme): ResolvedTheme {
  const resolved = theme === "system" ? getSystemTheme() : theme;
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(resolved);
  root.style.colorScheme = resolved;
  return resolved;
}

function readStoredTheme(): Theme {
  try {
    return (localStorage.getItem("theme") as Theme | null) ?? "dark";
  } catch {
    return "dark";
  }
}

function readResolvedFromDom(): ResolvedTheme {
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

function syncSnapshotFromDom() {
  const stored = readStoredTheme();
  snapshot = {
    theme: stored,
    resolvedTheme: readResolvedFromDom(),
  };
  emitChange();
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme, resolvedTheme } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    syncSnapshotFromDom();
  }, []);

  useEffect(() => {
    if (theme !== "system") return;

    const media = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!media?.addEventListener) return;

    const onChange = () => {
      snapshot = { ...snapshot, resolvedTheme: applyTheme("system") };
      emitChange();
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* storage unavailable */
    }
    snapshot = {
      theme: next,
      resolvedTheme: applyTheme(next),
    };
    emitChange();
  }, []);

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme }),
    [theme, resolvedTheme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
