import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import {
  MessageCircle,
  ArrowRight,
  PanelTop,
  Shield,
  Sun,
  LayoutGrid,
  SunDim,
  ChevronRight,
} from "lucide-react";
import { CONTACT, CONFIGURATOR_URL, PRODUCT_PATHS } from "@/lib/constants";

const PRODUCT_KEYS = [
  "doors",
  "windows",
  "roller_shutters",
  "exterior_blinds",
  "glass_walls",
  "sun_protection",
] as const;

const PRODUCT_ICONS = [
  PanelTop,
  PanelTop,
  Shield,
  Sun,
  LayoutGrid,
  SunDim,
] as const;

const PRODUCT_IMAGES = [
  "/images/hero/slide-1.jpg",
  "/images/products/Window.jpg.jpeg",
  "/images/products/RollerShutter_1.png",
  "/images/products/blinds__.jpg.jpeg",
  "/images/gallery/Glass-Walls.png",
  "/images/products/sun protection_.jpg.jpeg",
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
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <header className="mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
            {t("title")}
          </h1>
          <p className="text-muted text-lg max-w-2xl">
            {t("intro")}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PRODUCT_KEYS.map((key, i) => {
            const Icon = PRODUCT_ICONS[i];
            const imgSrc = PRODUCT_IMAGES[i];
            const href = PRODUCT_PATHS[key];
            return (
              <Link
                key={key}
                href={href}
                className="group block rounded-2xl border border-white/10 bg-surface/50 overflow-hidden hover:border-white/15 hover:bg-surface/70 transition-all duration-300"
              >
                <article className="h-full flex flex-col">
                  <div className="relative aspect-[4/3] bg-surface">
                    <Image
                      src={imgSrc}
                      alt={t(key)}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-2">
                      <span className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-accent" />
                      </span>
                      <h2 className="text-lg font-semibold text-white drop-shadow-md">
                        {t(key)}
                      </h2>
                    </div>
                  </div>
                  <div className="p-5 sm:p-6 flex-1 flex flex-col">
                    <p className="text-muted text-sm leading-relaxed mb-4">
                      {t(`${key}_text`)}
                    </p>
                    <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm group-hover:gap-3 transition-all mt-auto">
                      {key === "doors" ? t("configurator_cta") : t("cta")}
                      <ChevronRight className="w-4 h-4" />
                    </span>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 sm:mt-20 pt-12 border-t border-white/10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
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
    </main>
  );
}
