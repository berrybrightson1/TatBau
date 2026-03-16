"use client";

import { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

const SLIDES = [
  { src: "/images/hero/slide-1.jpg", alt: "Modern entrance door" },
  { src: "/images/hero/slide-2.jpg", alt: "Contemporary front door" },
  { src: "/images/hero/slide-3.jpg", alt: "Elegant entrance design" },
];

export function HeroSlider() {
  const t = useTranslations("hero");

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
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

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <section className="relative min-h-[72vh] sm:h-screen w-full overflow-hidden">
      {/* Carousel slides */}
      <div className="h-full" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((slide, i) => (
            <div className="flex-[0_0_100%] min-w-0 relative h-full" key={i}>
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={i === 0}
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="max-w-3xl w-full mx-auto px-4 sm:px-8 md:px-16 lg:px-20 flex flex-col items-center text-center pointer-events-auto">
          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.15] mb-4 sm:mb-6 whitespace-pre-line text-center">
            {t("headline")}
          </h1>
          <p className="text-xs sm:text-base md:text-lg text-foreground/70 max-w-xl mx-auto mb-6 sm:mb-10 text-center px-1">
            {t("subline")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 w-full max-w-sm sm:max-w-xl mx-auto">
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg shadow-lg shadow-accent/20 hover:shadow-accent/30 active:scale-[0.98] transition-all duration-200 w-full sm:flex-1 sm:min-w-0 whitespace-nowrap min-h-[52px] sm:min-h-[56px] text-sm sm:text-base py-4 pl-10 pr-10 sm:py-5 sm:pl-10 sm:pr-10"
            >
              {t("cta")}
              <ArrowRight className="w-5 h-5 flex-shrink-0" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-black hover:bg-black/90 text-white font-semibold rounded-lg border-2 border-white/20 shadow-lg hover:border-white/30 active:scale-[0.98] transition-all duration-200 w-full sm:flex-1 sm:min-w-0 whitespace-nowrap min-h-[52px] sm:min-h-[56px] text-sm sm:text-base py-4 pl-10 pr-10 sm:py-5 sm:pl-10 sm:pr-10"
            >
              <MessageCircle className="w-5 h-5 flex-shrink-0" />
              {t("cta_whatsapp")}
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/60 hover:text-white transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
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
