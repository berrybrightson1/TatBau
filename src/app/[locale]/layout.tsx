import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { DM_Sans } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { WhatsAppModalProvider } from "@/components/whatsapp/WhatsAppModalProvider";


const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://tat-bau.de";

function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TAT Bau",
    url: SITE_URL,
    logo: `${SITE_URL}/images/logo/300h/tatbau-main-logo.svg`,
    email: "info@tatbau.de",
    telephone: "+49 176 62161501",
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });
  const canonicalPath = locale === "de" ? "/de" : "/en";

  return {
    metadataBase: new URL(SITE_URL),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: "/images/logo/300h/tatbau-favicon.svg",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: locale === "de" ? "de_DE" : "en_US",
      url: canonicalPath,
      title: t("title"),
      description: t("description"),
      siteName: "TAT Bau",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
    alternates: {
      canonical: canonicalPath,
      languages: {
        de: "/de",
        en: "/en",
        "x-default": "/de",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const organizationSchema = buildOrganizationSchema();

  return (
    <html lang={locale} className={dmSans.variable}>
      <head>
        <link rel="stylesheet" href="/static-hero-mobile.css" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-background text-foreground antialiased font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            <WhatsAppModalProvider>
              <Navbar />
              <div className="min-h-screen overflow-x-hidden">{children}</div>
              <Footer />
              <ChatWidget />
            </WhatsAppModalProvider>
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
