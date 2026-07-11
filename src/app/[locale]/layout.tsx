import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Poppins, Kumbh_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { ThemeScript } from "@/components/layout/ThemeScript";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { FloatingWhatsApp } from "@/components/shared/floating-whatsapp";
import { PageAmbientGlow } from "@/components/shared/page-ambient-glow";
import { JsonLd } from "@/components/shared/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { htmlLangMap, routing, type Locale } from "@/i18n/routing";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

const kumbhSans = Kumbh_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  adjustFontFallback: true,
  preload: true,
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://trixync.id"),
  icons: {
    icon: [
      { url: "/brand/logo-icon.svg", media: "(prefers-color-scheme: light)" },
      { url: "/brand/logo-icon-white.svg", media: "(prefers-color-scheme: dark)" },
    ],
    apple: "/brand/logo-icon.svg",
  },
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const tCommon = await getTranslations("common");

  return (
    <html
      lang={htmlLangMap[locale as Locale]}
      suppressHydrationWarning
      className={`${poppins.variable} ${kumbhSans.variable} h-full dark`}
    >
      <head>
        <ThemeScript />
      </head>
      <body className="flex min-h-full flex-col font-sans antialiased">
        <div className="relative isolate flex min-h-full flex-col">
          <PageAmbientGlow />
          <div className="relative z-10 flex min-h-full flex-col">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-primary-foreground"
          >
            {tCommon("skipToMain")}
          </a>
          <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <SiteHeader />
              <main id="main-content" tabIndex={-1} className="relative flex-1 pt-16 outline-none">
                {children}
              </main>
              <SiteFooter />
              <FloatingWhatsApp />
            </NextIntlClientProvider>
          </ThemeProvider>
          </div>
        </div>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
