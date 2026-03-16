"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";

export function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(target: "de" | "en") {
    if (target === locale) return;
    router.replace(pathname, { locale: target });
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      <button
        onClick={() => switchTo("de")}
        className={`px-2 py-1 transition-colors duration-200 ${
          locale === "de"
            ? "text-accent"
            : "text-foreground/50 hover:text-foreground"
        }`}
        aria-label="Deutsch"
        aria-current={locale === "de" ? "true" : undefined}
      >
        DE
      </button>
      <span className="text-foreground/20" aria-hidden="true">
        /
      </span>
      <button
        onClick={() => switchTo("en")}
        className={`px-2 py-1 transition-colors duration-200 ${
          locale === "en"
            ? "text-accent"
            : "text-foreground/50 hover:text-foreground"
        }`}
        aria-label="English"
        aria-current={locale === "en" ? "true" : undefined}
      >
        EN
      </button>
    </div>
  );
}
