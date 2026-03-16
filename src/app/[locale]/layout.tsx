import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { DM_Sans } from "next/font/google";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/footer/Footer";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      languages: {
        "de-DE": "/de",
        "en-US": "/en",
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

  return (
    <html lang={locale} className={dmSans.variable}>
      <body className="bg-background text-foreground antialiased font-sans">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SmoothScrollProvider>
            <Navbar />
            <div className="min-h-screen overflow-x-hidden">{children}</div>
            <Footer />
            <ChatWidget />
          </SmoothScrollProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
