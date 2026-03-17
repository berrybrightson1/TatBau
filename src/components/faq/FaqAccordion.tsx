"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { ChevronDown } from "lucide-react";

const FAQ_IDS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export function FaqAccordion() {
  const t = useTranslations("faq");
  const [openId, setOpenId] = useState<string | null>("1");

  return (
    <section className="px-4 py-14 sm:px-6 sm:py-20 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 sm:mb-12">
          {t("title")}
        </h2>
        <ul className="space-y-2">
          {FAQ_IDS.map((id) => {
            const isOpen = openId === id;
            return (
              <li
                key={id}
                className="rounded-xl border border-white/10 bg-surface/50 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left font-semibold text-foreground hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${id}`}
                  id={`faq-question-${id}`}
                >
                  <span className="pr-2">{t(`items.${id}.q`)}</span>
                  <ChevronDown
                    className={`w-5 h-5 shrink-0 text-muted transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  id={`faq-answer-${id}`}
                  role="region"
                  aria-labelledby={`faq-question-${id}`}
                  className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-muted text-sm sm:text-base leading-relaxed border-t border-white/5">
                      {t(`items.${id}.a`)}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
