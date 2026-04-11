"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

const SLIDES = [
  {
    src: "/images/hero/Door.jpeg",
    alt: "Premium entrance door",
    primary: { type: "external" as const, href: CONFIGURATOR_URL },
  },
  {
    src: "/images/hero/windows.jpeg",
    alt: "Energy-efficient windows",
    primary: { type: "link" as const, href: "/produkte/windows" },
  },
  {
    src: "/images/hero/roller-shutter.jpeg",
    alt: "Roller shutters",
    primary: { type: "link" as const, href: "/produkte/roller_shutters" },
  },
];

const ctaClass =
  "inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold rounded-xl shadow-lg shadow-accent/20 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto whitespace-nowrap min-h-[48px] sm:min-h-[52px] text-sm sm:text-base py-3.5 px-6 sm:py-3.5 sm:px-8";

export function HeroSlider() {
  const t = useTranslations("hero");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 6000, stopOnInteraction: false }),
  ]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  const headline = t(`slide_${selectedIndex}_headline`);
  const subline = t(`slide_${selectedIndex}_subline`);
  const primaryCta = t(`slide_${selectedIndex}_cta`);

  const primary = SLIDES[selectedIndex].primary;

  return (
    <section className="relative h-[78vh] min-h-[380px] max-h-[760px] w-full overflow-hidden sm:h-[70vh] sm:min-h-[320px] sm:max-h-[700px]">
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover object-center"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <div className="absolute inset-0 flex pointer-events-none">
        <div
          className={[
            "flex w-full max-w-7xl mx-auto flex-1 flex-col items-start text-left pointer-events-auto",
            /* Mobile: CTAs sit under copy with breathing room; sm+: vertically centered stack */
            "justify-start gap-8 sm:justify-center sm:gap-8",
            "px-5 pl-[max(2.75rem,env(safe-area-inset-left,0px))] pr-[max(2.75rem,env(safe-area-inset-right,0px))]",
            "pt-[max(1.25rem,env(safe-area-inset-top,0px))] pb-[max(5.75rem,env(safe-area-inset-bottom,0px))]",
            "sm:px-8 sm:py-10 sm:pb-8 md:px-10",
          ].join(" ")}
        >
          <div className="shrink-0 space-y-4 sm:space-y-0 max-w-lg">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-snug sm:leading-[1.15] sm:mb-5 whitespace-pre-line text-left">
              {headline}
            </h1>
            <p className="text-sm sm:text-sm md:text-base text-foreground/90 sm:mb-8 text-left leading-relaxed">
              {subline}
            </p>
          </div>
          <div className="flex w-full max-w-md shrink-0 flex-col gap-5 sm:flex-row sm:gap-4">
            {primary.type === "external" ? (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className={ctaClass}
              >
                {primaryCta}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </a>
            ) : (
              <Link href={primary.href} className={ctaClass}>
                {primaryCta}
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              </Link>
            )}
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={ctaClass}
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              {t("cta_whatsapp")}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-[max(1rem,env(safe-area-inset-bottom,0px))] sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => emblaApi?.scrollTo(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              i === selectedIndex
                ? "bg-accent w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === selectedIndex ? "true" : undefined}
          />
        ))}
      </div>
    </section>
  );
}
