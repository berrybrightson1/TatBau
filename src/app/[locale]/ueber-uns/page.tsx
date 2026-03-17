import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";
import {
  ArrowRight,
  MessageCircle,
  MapPin,
  Wrench,
  Users,
  Package,
} from "lucide-react";

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
      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3">
          {t("title")}
        </h1>
        <p className="text-accent font-medium text-lg mb-6">{t("subtitle")}</p>
        <p className="text-muted text-lg leading-relaxed max-w-2xl">
          {t("intro")}
        </p>
      </div>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {t("mission_title")}
        </h2>
        <p className="text-muted leading-relaxed">
          {t("mission")}
        </p>
      </section>

      {/* Area */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-4">
          {t("area_title")}
        </h2>
        <p className="text-muted leading-relaxed">
          {t("area")}
        </p>
      </section>

      {/* Values - 3 cards */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-16 sm:mb-20">
        <h2 className="text-xl sm:text-2xl font-semibold mb-8 sm:mb-10">
          {t("values_title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div className="rounded-xl border border-white/10 bg-surface/60 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center mb-5">
              <Wrench className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("value_1_title")}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {t("value_1")}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface/60 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center mb-5">
              <Users className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("value_2_title")}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {t("value_2")}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-surface/60 p-6 sm:p-8">
            <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center mb-5">
              <Package className="w-6 h-6 text-accent" />
            </div>
            <h3 className="text-lg font-semibold mb-2">{t("value_3_title")}</h3>
            <p className="text-muted text-sm leading-relaxed">
              {t("value_3")}
            </p>
          </div>
        </div>
      </section>

      {/* Visit / Contact strip */}
      <section className="border-y border-white/10 bg-surface/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <h2 className="text-xl sm:text-2xl font-semibold mb-2">
            {t("visit_title")}
          </h2>
          <p className="text-muted mb-8">{t("visit_text")}</p>
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 text-muted">
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-14 sm:pt-20">
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href={CONFIGURATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
          >
            {t("cta")}
            <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-8 py-4 rounded-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px]"
          >
            <MessageCircle className="w-5 h-5" />
            {t("whatsapp_cta")}
          </a>
          <Link
            href="/kontakt"
            className="inline-flex items-center justify-center sm:justify-start gap-2 text-muted hover:text-accent font-medium py-4 w-full sm:w-auto"
          >
            {t("contact_page")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
