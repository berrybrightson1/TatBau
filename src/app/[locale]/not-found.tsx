"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("not_found");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-6 bg-background text-foreground">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-muted text-center max-w-md">{t("description")}</p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 transition-colors duration-200 whitespace-nowrap"
      >
        {t("back")}
      </Link>
    </div>
  );
}
