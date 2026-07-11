"use client";

import Link from "next/link";
import { MapPin } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/content/site";
import { ScrollReveal } from "@/components/shared/scroll-reveal";
import { SectionShell } from "@/components/shared/SectionShell";
import { type Locale } from "@/i18n/routing";
import { motion } from "motion/react";

const statKeys = ["homeBase", "nationwide", "remote"] as const;

const statLabels = {
  homeBase: "Medan",
  nationwide: "Indonesia",
  remote: "Remote",
} as const;

export function LocationSection() {
  const t = useTranslations("about.location");
  const tNav = useTranslations("nav");
  const locale = useLocale() as Locale;
  const prefix = `/${locale}`;

  return (
    <>
      <div className="section-divider mx-auto max-w-4xl opacity-50" aria-hidden />

      <SectionShell containerSize="wide" className="pb-10 md:pb-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <ScrollReveal>
            <div className="flex items-start gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className="mt-1 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-brand/20 bg-brand/10 text-brand"
              >
                <MapPin className="h-5 w-5" strokeWidth={1.75} />
              </motion.div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  {t("eyebrow")}
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                  {t("title")}
                </h2>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.08}>
            <p className="max-w-xl text-base leading-[1.75] text-muted-foreground">{t("description")}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {statKeys.map((key, index) => (
                <motion.div
                  key={key}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl border border-border/60 bg-card/30 px-4 py-4 dark:bg-card/20"
                >
                  <p className="font-heading text-xl font-semibold text-foreground md:text-2xl">
                    {statLabels[key]}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{t(`stats.${key}`)}</p>
                </motion.div>
              ))}
            </div>

            <p className="mt-8 text-sm text-muted-foreground/80">
              {siteConfig.address.city}, {siteConfig.address.region}, {siteConfig.address.country}
            </p>
          </ScrollReveal>
        </div>
      </SectionShell>

      <SectionShell containerSize="narrow" className="pt-0">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand/15 bg-gradient-to-br from-brand/[0.06] via-card/40 to-transparent px-6 py-8 text-center dark:from-brand/[0.1] md:px-10 md:py-10">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              {t("cta.eyebrow")}
            </p>
            <p className="mt-3 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
              {t("cta.title")}
            </p>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
              {t("cta.description")}
            </p>
            <Link
              href={`${prefix}/contact`}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-8 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-brand-light"
            >
              {tNav("cta")}
            </Link>
          </div>
        </ScrollReveal>
      </SectionShell>
    </>
  );
}
