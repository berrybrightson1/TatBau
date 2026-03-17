"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle, LayoutDashboard, Lock, Leaf, Palette, ChevronRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { ParallaxWrapper } from "@/components/parallax/ParallaxWrapper";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

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
  "/images/gallery/gallery-1.jpg",
  "/images/gallery/gallery-2.jpg",
  "/images/gallery/gallery-3.jpg",
  "/images/gallery/gallery-4.jpg",
  "/images/gallery/gallery-5.jpg",
] as const;

export function HomePageContent() {
  const t = useTranslations();

  const doorBenefits = [
    { key: "modern_design" as const, icon: LayoutDashboard },
    { key: "high_security" as const, icon: Lock },
    { key: "energy_efficiency" as const, icon: Leaf },
    { key: "custom_design" as const, icon: Palette },
  ];

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
              const isDoors = key === "doors";
              return (
                <article
                  key={key}
                  className="group rounded-xl border border-white/10 bg-background/60 overflow-hidden hover:border-white/15 transition-all duration-300"
                >
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
                  <div className="p-4">
                    <p className="text-muted text-sm line-clamp-2 mb-3">
                      {t(`products_section.${key}`)}
                    </p>
                    {isDoors ? (
                      <a
                        href={CONFIGURATOR_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:gap-2 transition-all"
                      >
                        {t("products_section.read_more")}
                        <ChevronRight className="w-4 h-4" />
                      </a>
                    ) : (
                      <Link
                        href="/produkte"
                        className="inline-flex items-center gap-1.5 text-accent font-semibold text-sm hover:gap-2 transition-all"
                      >
                        {t("products_section.read_more")}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <ParallaxWrapper className="bg-background">
        <section id="doors" className="px-4 py-14 sm:px-6 sm:py-20 md:py-28">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6">
              {t("door_section.title")}
            </h2>
            <p className="text-muted leading-relaxed mb-10 whitespace-pre-line">
              {t("door_section.text")}
            </p>
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
            >
              {t("door_section.cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </ParallaxWrapper>

      <ParallaxWrapper className="bg-surface">
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-16">
              {t("door_benefits.title")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
              {doorBenefits.map(({ key, icon: Icon }) => (
                <div
                  key={key}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <div className="w-14 h-14 bg-accent/10 flex items-center justify-center">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-muted leading-relaxed max-w-xs">
                    {t(`door_benefits.${key}`)}
                  </p>
                </div>
              ))}
            </div>
            <div className="text-center mt-12">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 border border-white/20 w-full sm:w-auto whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                {t("door_benefits.cta")}
              </a>
            </div>
          </div>
        </section>
      </ParallaxWrapper>

      <ParallaxWrapper className="bg-background">
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6">
              {t("configurator_section.title")}
            </h2>
            <p className="text-muted leading-relaxed mb-10">
              {t("configurator_section.text")}
            </p>
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
            >
              {t("configurator_section.cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </section>
      </ParallaxWrapper>

      <ReviewsSection />

      <section className="bg-surface px-4 py-14 sm:px-6 sm:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">
            {t("contact_strip.title")}
          </h2>
          <p className="text-muted text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto">
            {t("contact_strip.text")}
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-3 sm:gap-4">
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
            >
              {t("contact_strip.cta_design")}
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 border border-white/20 w-full sm:w-auto whitespace-nowrap"
            >
              <MessageCircle className="w-5 h-5" />
              {t("contact_strip.cta_whatsapp")}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
