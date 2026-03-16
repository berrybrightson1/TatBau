"use client";

import { useTranslations } from "next-intl";
import {
  ArrowRight,
  MessageCircle,
  LayoutDashboard,
  Lock,
  Leaf,
  Palette,
  Check,
} from "lucide-react";
import { ParallaxWrapper } from "@/components/parallax/ParallaxWrapper";
import { ReviewsSection } from "@/components/reviews/ReviewsSection";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

export function HomePageContent() {
  const t = useTranslations();

  const doorBenefits = [
    { key: "modern_design" as const, icon: LayoutDashboard },
    { key: "high_security" as const, icon: Lock },
    { key: "energy_efficiency" as const, icon: Leaf },
    { key: "custom_design" as const, icon: Palette },
  ];

  const products = [
    { key: "windows" as const },
    { key: "roller_shutters" as const },
    { key: "exterior_blinds" as const },
    { key: "glass_walls" as const },
    { key: "sun_protection" as const },
  ];

  return (
    <main>
      <HeroSlider />
      <section className="bg-surface border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="grid grid-cols-2 gap-x-4 gap-y-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-x-8 sm:gap-y-3">
            <span className="flex items-center gap-2.5 text-base sm:text-sm font-medium text-foreground/90 min-h-[44px] sm:min-h-0">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              {t("trust_badges.local")}
            </span>
            <span className="flex items-center gap-2.5 text-base sm:text-sm font-medium text-foreground/90 min-h-[44px] sm:min-h-0">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              {t("trust_badges.installation")}
            </span>
            <span className="flex items-center gap-2.5 text-base sm:text-sm font-medium text-foreground/90 min-h-[44px] sm:min-h-0">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              {t("trust_badges.materials")}
            </span>
            <span className="flex items-center gap-2.5 text-base sm:text-sm font-medium text-foreground/90 min-h-[44px] sm:min-h-0">
              <Check className="w-5 h-5 text-accent flex-shrink-0" />
              {t("trust_badges.consultation")}
            </span>
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

      <ParallaxWrapper className="bg-surface">
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-10 sm:mb-14">
              {t("products_section.title")}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {products.map(({ key }) => (
                <li key={key} className="flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">
                    {t(`products_section.${key}_title`)}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {t(`products_section.${key}`)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="text-center mt-10">
              <a
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-black hover:bg-black/90 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 border border-white/20 w-full sm:w-auto whitespace-nowrap"
              >
                <MessageCircle className="w-5 h-5" />
                {t("products_section.cta")}
              </a>
            </div>
          </div>
        </section>
      </ParallaxWrapper>

      <ParallaxWrapper className="bg-background">
        <section className="px-4 py-16 sm:px-6 sm:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-5 sm:mb-6">
              {t("work_section.title")}
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              {t("work_section.text")}
            </p>
            <p className="text-foreground/80 text-sm sm:text-base mb-10">
              {t("work_section.services")}
            </p>
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto whitespace-nowrap"
            >
              {t("work_section.cta")}
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
