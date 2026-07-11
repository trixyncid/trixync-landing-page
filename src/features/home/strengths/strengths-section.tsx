"use client";

import { CircuitBoard, GitMerge, ServerCog, UsersRound } from "lucide-react";
import { useTranslations } from "next-intl";
import { ScrollReveal, ScrollStagger, ScrollStaggerItem } from "@/components/shared/scroll-reveal";
import { SectionShell } from "@/components/shared/SectionShell";
import {
  strengthBentoLayout,
  strengthGridKeys,
  strengthPillarMeta,
} from "@/content/strengths";
import { cn } from "@/lib/utils";
import { StrengthAiFeature } from "./strength-ai-feature";
import { StrengthPillarCard } from "./strength-pillar-card";

const pillarIcons = {
  realWorld: CircuitBoard,
  centralize: GitMerge,
  production: ServerCog,
  stakeholders: UsersRound,
} as const;

export function StrengthsSection() {
  const t = useTranslations("home.strengths");

  return (
    <SectionShell id="strengths" className="scroll-mt-24 pt-4 md:pt-8">
      <ScrollReveal className="mb-10 max-w-2xl md:mb-12">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">{t("subtitle")}</p>
      </ScrollReveal>

      <ScrollStagger
        className={cn(
          "mx-auto grid max-w-7xl grid-cols-1 gap-5",
          "md:auto-rows-[minmax(15rem,auto)] md:grid-cols-3",
        )}
      >
        <ScrollStaggerItem className={strengthBentoLayout.aiSystems}>
          <StrengthAiFeature
            className="h-full"
            eyebrow={t("items.aiSystems.eyebrow")}
            title={t("items.aiSystems.title")}
            description={t("items.aiSystems.description")}
          />
        </ScrollStaggerItem>

        {strengthGridKeys.map((key) => {
          const meta = strengthPillarMeta[key];
          const Icon = pillarIcons[key];

          return (
            <ScrollStaggerItem key={key} className={strengthBentoLayout[key]}>
              <StrengthPillarCard
                className="h-full"
                title={t(`items.${key}.title`)}
                description={t(`items.${key}.description`)}
                icon={Icon}
                accent={meta.accent}
                glow={meta.glow}
              />
            </ScrollStaggerItem>
          );
        })}
      </ScrollStagger>
    </SectionShell>
  );
}
