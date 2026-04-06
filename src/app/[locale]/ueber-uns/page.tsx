import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";
import {
  ArrowRight,
  MessageCircle,
  MapPin,
} from "lucide-react";

const TEAM_IMAGES = [
  "/images/team/Project Consultation.png",
  "/images/team/Technical Measurement.png",
  "/images/team/Installation Team.png",
] as const;

export default async function UeberUnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.ueber_uns");

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Redesigned About Intro */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="interactive-card rounded-2xl border border-white/10 bg-surface/60 p-6 sm:p-8 lg:p-10">
          <div className="max-w-4xl">
            <p className="text-accent font-semibold uppercase tracking-[0.12em] text-xs sm:text-sm mb-3">
              {t("subtitle")}
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              {t("title")}
            </h1>
            <p className="text-foreground/85 text-lg leading-relaxed max-w-3xl">
              {t("intro")}
            </p>
          </div>
        </div>
      </section>

      {/* Structured Value Narrative */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <article className="interactive-card rounded-2xl border border-white/10 bg-background/30 p-6 sm:p-8">
            <div className="w-12 h-1 bg-accent mb-5" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              {t("mission_title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("mission")}
            </p>
          </article>
          <article className="interactive-card rounded-2xl border border-white/10 bg-background/30 p-6 sm:p-8">
            <div className="w-12 h-1 bg-accent mb-5" />
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">
              {t("area_title")}
            </h2>
            <p className="text-foreground/80 leading-relaxed">
              {t("area")}
            </p>
          </article>
        </div>
      </section>

      {/* Team photos */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10">
          {t("team_title")}
        </h2>
        <p className="text-muted leading-relaxed mb-8 sm:mb-10 max-w-3xl">
          {t("team_intro")}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TEAM_IMAGES.map((src, idx) => (
            <article
              key={src}
              className="interactive-card rounded-2xl border border-border bg-surface/60 overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-background/40">
                <Image
                  src={src}
                  alt={t(`team_member_${idx + 1}_name`)}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-lg font-semibold mb-2">
                  {t(`team_member_${idx + 1}_name`)}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {t(`team_member_${idx + 1}_role`)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Visit / Contact strip */}
      <section className="border-y border-border bg-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            {t("visit_title")}
          </h2>
          <p className="text-foreground/80 mb-8">{t("visit_text")}</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 text-foreground/80">
            <a
              href={CONTACT.mapLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 hover:text-accent transition-colors break-words"
            >
              <MapPin className="w-5 h-5 shrink-0" />
              <span>
                {CONTACT.address.street}, {CONTACT.address.city},{" "}
                {CONTACT.address.country}
              </span>
            </a>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center hover:text-accent transition-colors"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="inline-flex items-center hover:text-accent transition-colors break-all"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href={CONFIGURATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
          >
            {t("cta")}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5" />
            {t("whatsapp_cta")}
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center sm:justify-start gap-2 text-foreground/70 hover:text-accent font-medium py-4 w-full sm:w-auto"
          >
            {t("contact_page")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
