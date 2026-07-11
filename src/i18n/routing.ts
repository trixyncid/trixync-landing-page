import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "id", "zh"],
  defaultLocale: "en",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export const htmlLangMap: Record<Locale, string> = {
  en: "en",
  id: "id",
  zh: "zh-Hans",
};

export const ogLocaleMap: Record<Locale, string> = {
  en: "en_US",
  id: "id_ID",
  zh: "zh_CN",
};

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
