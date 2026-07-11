"use client";

import { useEffect, useState, type ComponentType, type SVGProps } from "react";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

export const localeNames: Record<Locale, string> = {
  en: "English",
  id: "Bahasa Indonesia",
  zh: "中文",
};

type FlagComponent = ComponentType<SVGProps<SVGSVGElement>>;

const flagLoaders: Record<Locale, () => Promise<{ default: FlagComponent }>> = {
  en: () => import("country-flag-icons/react/3x2/US") as Promise<{ default: FlagComponent }>,
  id: () => import("country-flag-icons/react/3x2/ID") as Promise<{ default: FlagComponent }>,
  zh: () => import("country-flag-icons/react/3x2/CN") as Promise<{ default: FlagComponent }>,
};

type LocaleFlagProps = {
  locale: Locale;
  className?: string;
  title?: string;
};

export function LocaleFlag({ locale, className, title }: LocaleFlagProps) {
  const [Flag, setFlag] = useState<FlagComponent | null>(null);

  useEffect(() => {
    let cancelled = false;
    flagLoaders[locale]().then((mod) => {
      if (!cancelled) setFlag(() => mod.default);
    });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  if (!Flag) {
    return (
      <span
        aria-hidden
        className={cn("inline-block rounded-[2px] bg-muted/60", className)}
      />
    );
  }

  return (
    <Flag
      aria-label={title ?? localeNames[locale]}
      className={cn(
        "inline-block rounded-[2px] object-cover ring-1 ring-black/10 dark:ring-white/15",
        className,
      )}
    />
  );
}
