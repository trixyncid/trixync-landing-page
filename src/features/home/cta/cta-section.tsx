"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionShell } from "@/components/shared/SectionShell";
import { type Locale } from "@/i18n/routing";

export function CtaSection() {
  const t = useTranslations("home.cta");
  const locale = useLocale() as Locale;
  const prefix = `/${locale}`;

  return (
    <SectionShell id="cta">
      <ScrollReveal>
        <div className="flex flex-col items-start justify-between gap-8 border-t border-border/50 pt-14 md:flex-row md:items-center md:pt-16">
          <div className="max-w-2xl">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {t("eyebrow")}
            </p>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-[2rem] md:leading-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">{t("description")}</p>
          </div>
          <Link
            href={`${prefix}/contact`}
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-light"
          >
            {t("button")}
          </Link>
        </div>
      </ScrollReveal>
    </SectionShell>
  );
}
