"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { PRODUCT_PATHS } from "@/lib/constants";

const PRODUCT_KEYS = [
  "doors",
  "windows",
  "roller_shutters",
  "exterior_blinds",
  "glass_walls",
  "sun_protection",
] as const;

const PRODUCT_IMAGES = [
  "/images/hero/slide-1.jpg",
  "/images/products/Window.jpg.jpeg",
  "/images/products/RollerShutter_1.png",
  "/images/products/blinds__.jpg.jpeg",
  "/images/gallery/Glass-Walls.png",
  "/images/products/sun protection_.jpg.jpeg",
] as const;

export function HomePageContent() {
  const t = useTranslations();

  return (
    <main>
      <HeroSlider />

      {/* Products at a glance – directly under hero */}
      <section className="bg-surface border-y border-white/5 px-4 py-12 sm:px-6 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
            {t("products_section.title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {PRODUCT_KEYS.map((key, i) => {
              const imgSrc = PRODUCT_IMAGES[i];
              const href = PRODUCT_PATHS[key];
              return (
                <Link
                  key={key}
                  href={href}
                  className="group block rounded-xl border border-white/10 bg-background/60 overflow-hidden hover:border-white/15 transition-all duration-300"
                >
                  <article className="h-full flex flex-col">
                    <div className="relative aspect-[16/10] bg-surface">
                      <Image
                        src={imgSrc}
                        alt={t(`products_section.${key}_title`)}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                      <h3 className="absolute bottom-3 left-3 right-3 text-base sm:text-lg font-semibold text-white">
                        {t(`products_section.${key}_title`)}
                      </h3>
                    </div>
                    <div className="p-4 flex-1 flex flex-col">
                      <p className="text-muted text-sm line-clamp-2 mb-3">
                        {t(`products_section.${key}`)}
                      </p>
                      <span className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm group-hover:gap-2 transition-all mt-auto">
                        {t("products_section.read_more")}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ReviewsSection />
    </main>
  );
}
