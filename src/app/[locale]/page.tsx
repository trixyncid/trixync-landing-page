import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { createPageMetadata } from "@/lib/metadata";
import { type Locale } from "@/i18n/routing";
import {
  HeroSection,
  StrengthsSection,
  ApproachSection,
  FeaturedProjectsSection,
  LocationSection,
} from "@/features/home";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.home" });
  return createPageMetadata({
    locale: locale as Locale,
    path: "/",
    meta: { title: t("title"), description: t("description") },
  });
}

function SectionDivider() {
  return <div className="section-divider mx-auto max-w-4xl opacity-60" aria-hidden />;
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="relative">
      <HeroSection />
      <StrengthsSection />
      <SectionDivider />
      <ApproachSection />
      <SectionDivider />
      <FeaturedProjectsSection />
      <SectionDivider />
      <LocationSection />
    </div>
  );
}
