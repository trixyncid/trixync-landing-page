"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { usePathname, useRouter, type Locale } from "@/i18n/routing";
import { routing } from "@/i18n/routing";
import { LocaleFlag, localeNames } from "./LocaleFlag";
import { cn } from "@/lib/utils";

function setLocaleCookie(nextLocale: string) {
  document.cookie = `NEXT_LOCALE=${nextLocale};path=/;max-age=31536000`;
}

type LanguageSwitcherProps = {
  className?: string;
  variant?: "buttons" | "dropdown";
  compact?: boolean;
};

function FlagOption({
  loc,
  active,
  onSelect,
  size = "md",
}: {
  loc: Locale;
  active: boolean;
  onSelect: () => void;
  size?: "sm" | "md";
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={localeNames[loc]}
      aria-current={active ? "true" : undefined}
      className={cn(
        "rounded-md transition-all",
        size === "sm" ? "p-1" : "p-1.5",
        active
          ? "bg-brand/10 ring-1 ring-brand/40"
          : "opacity-75 hover:bg-muted/60 hover:opacity-100",
      )}
    >
      <LocaleFlag locale={loc} className={size === "sm" ? "h-3.5 w-[1.375rem]" : "h-4 w-6"} />
    </button>
  );
}

export function LanguageSwitcher({
  className,
  variant = "dropdown",
  compact = false,
}: LanguageSwitcherProps) {
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  function switchLocale(nextLocale: Locale) {
    if (nextLocale === locale) {
      setOpen(false);
      return;
    }
    setLocaleCookie(nextLocale);
    router.replace(pathname, { locale: nextLocale });
    setOpen(false);
  }

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, []);

  if (variant === "buttons") {
    return (
      <div className={cn("flex items-center gap-1", className)}>
        {routing.locales.map((loc) => (
          <FlagOption
            key={loc}
            loc={loc}
            active={loc === locale}
            onSelect={() => switchLocale(loc)}
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${localeNames[locale]}`}
        className={cn(
          "flex items-center justify-center gap-1 text-foreground transition-colors",
          compact
            ? cn(
                "h-8 px-1.5 text-muted-foreground hover:text-foreground",
                open && "text-foreground",
              )
            : "h-11 w-full gap-1.5 rounded-lg border border-border/60 bg-card/40 px-3 hover:border-border hover:bg-card/70 md:w-auto",
        )}
      >
        <LocaleFlag locale={locale} className={compact ? "h-3.5 w-[1.375rem]" : "h-4 w-6"} />
        <ChevronDown
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            compact ? "h-3 w-3" : "h-3.5 w-3.5",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div
          className={cn(
            "absolute top-full z-50 pt-1",
            compact ? "right-0" : "left-0 md:left-auto",
          )}
        >
          <ul
            role="listbox"
            aria-label="Select language"
            className="flex items-center gap-0.5 rounded-lg border border-border/60 bg-popover p-1 shadow-md"
          >
            {routing.locales.map((loc) => (
              <li key={loc} role="option" aria-selected={loc === locale}>
                <FlagOption
                  loc={loc}
                  active={loc === locale}
                  onSelect={() => switchLocale(loc)}
                  size={compact ? "sm" : "md"}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
