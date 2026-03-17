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
    <section className="relative h-[70vh] min-h-[320px] max-h-[700px] w-full overflow-hidden">
      {/* Carousel slides */}
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

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      {/* Content overlay – far left, aligned with page content */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 flex flex-col items-start text-left pointer-events-auto">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight leading-[1.15] mb-3 sm:mb-5 whitespace-pre-line text-left">
            {t("headline")}
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-foreground/80 max-w-lg mb-5 sm:mb-8 text-left">
            {t("subline")}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md">
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold rounded-lg shadow-lg shadow-accent/20 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto whitespace-nowrap min-h-[48px] sm:min-h-[52px] text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8"
            >
              {t("cta")}
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold rounded-lg border-2 border-white/20 active:scale-[0.98] transition-all duration-200 w-full sm:w-auto whitespace-nowrap min-h-[48px] sm:min-h-[52px] text-sm sm:text-base py-3 px-6 sm:py-3.5 sm:px-8"
            >
              <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
              {t("cta_whatsapp")}
            </a>
          </div>
        </div>
      </div>

      {/* Prev / Next arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white transition-colors touch-manipulation"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 text-white/70 hover:text-white transition-colors touch-manipulation"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
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
