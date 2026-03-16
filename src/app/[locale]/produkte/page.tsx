import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import {
  MessageCircle,
  ArrowRight,
  PanelTop,
  Shield,
  Sun,
  LayoutGrid,
  SunDim,
} from "lucide-react";
import { CONTACT, CONFIGURATOR_URL } from "@/lib/constants";

const PRODUCT_KEYS = [
  "windows",
  "roller_shutters",
  "exterior_blinds",
  "glass_walls",
  "sun_protection",
] as const;

const PRODUCT_ICONS = [
  PanelTop,
  Shield,
  Sun,
  LayoutGrid,
  SunDim,
] as const;

export default async function ProduktePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.produkte");

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-muted text-lg max-w-2xl">
          {t("intro")}
        </p>
      </div>

      {/* Product grid */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCT_KEYS.map((key, i) => {
            const Icon = PRODUCT_ICONS[i];
            return (
              <article
                key={key}
                className="group rounded-xl border border-white/10 bg-surface/50 hover:bg-surface/70 hover:border-white/15 p-6 sm:p-8 transition-all duration-200"
              >
                <div className="w-14 h-14 rounded-xl bg-accent/15 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-7 h-7 text-accent" />
                </div>
                <h2 className="text-xl font-semibold mb-3">{t(key)}</h2>
                <p className="text-muted text-sm leading-relaxed">
                  {t(`${key}_text`)}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA block */}
        <div className="mt-14 sm:mt-20 pt-12 border-t border-white/10">
          <p className="text-muted mb-6 max-w-xl">
            {t("cta_teaser")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
            >
              <MessageCircle className="w-5 h-5" />
              {t("cta")}
            </a>
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/20 hover:bg-white/5 font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
            >
              {t("configurator_cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
