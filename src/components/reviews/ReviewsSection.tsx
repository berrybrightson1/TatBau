"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Plus } from "lucide-react";
import Image from "next/image";

const REVIEW_IDS = ["1", "2", "3", "4", "5", "6"] as const;

// Copyright-free portrait images (Unsplash) – replace with real customer photos when ready
const AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop",
];

export function ReviewsSection() {
  const t = useTranslations("reviews");
  const [active, setActive] = useState(2);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-24 bg-background">
      <div className="max-w-4xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-4 sm:mb-5">
          {t("title")}
        </h2>

        {/* Accent divider */}
        <div className="w-14 h-[3px] bg-accent mx-auto mb-3 sm:mb-4" />

        {/* Subtitle */}
        <p className="text-[11px] sm:text-xs md:text-sm text-muted uppercase tracking-[0.1em] sm:tracking-[0.15em] font-semibold mb-10 sm:mb-14">
          {t("subtitle")}
        </p>

        {/* Avatar row */}
        <div className="flex items-end justify-center gap-2 sm:gap-3 md:gap-5 mb-0">
          {REVIEW_IDS.map((id, i) => {
            const isActive = i === active;

            return (
              <button
                key={id}
                onClick={() => setActive(i)}
                className={`relative rounded-full transition-all duration-300 ease-out ${
                  isActive
                    ? "w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] z-10"
                    : "w-[52px] h-[52px] sm:w-[68px] sm:h-[68px]"
                }`}
                aria-label={t(`items.${id}.name`)}
              >
                {/* Avatar image */}
                <div
                  className={`w-full h-full rounded-full overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                      : "grayscale-[50%] opacity-60 hover:opacity-90"
                  }`}
                >
                  <Image
                    src={AVATARS[i]}
                    alt={t(`items.${id}.name`)}
                    width={90}
                    height={90}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Plus badge on inactive avatars */}
                {!isActive && (
                  <span className="absolute -bottom-0.5 -right-0.5 w-[18px] h-[18px] sm:w-5 sm:h-5 bg-accent rounded-full flex items-center justify-center shadow-md">
                    <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" strokeWidth={3} />
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Review card with speech-bubble pointer */}
        <div className="relative max-w-2xl mx-auto mt-0">
          {/* Triangle pointer */}
          <div className="flex justify-center">
            <div className="w-5 h-5 bg-surface rotate-45 translate-y-2.5 border-t border-l border-white/10" />
          </div>

          {/* Card */}
          <div className="bg-surface border border-white/10 px-8 py-10 sm:px-12 sm:py-12 relative">
            <h3 className="text-accent font-bold uppercase tracking-[0.15em] text-sm mb-1">
              {t(`items.${REVIEW_IDS[active]}.name`)}
            </h3>
            <p className="text-muted text-[11px] uppercase tracking-[0.2em] font-semibold mb-8">
              {t("happy_customer")}
            </p>
            <blockquote className="text-foreground/60 leading-relaxed text-sm sm:text-base max-w-xl mx-auto">
              &ldquo; {t(`items.${REVIEW_IDS[active]}.text`)} &rdquo;
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
