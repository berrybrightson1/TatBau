import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import {
  ArrowRight,
  MessageCircle,
  LayoutDashboard,
  Lock,
  Leaf,
  Palette,
} from "lucide-react";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

const HERO_DOOR_IMAGE = "/images/AAE_1222_MS_6849_STR_067_001.png";

const DOOR_BENEFIT_KEYS = [
  "modern_design",
  "high_security",
  "energy_efficiency",
  "custom_design",
] as const;

const DOOR_BENEFIT_ICONS = [
  LayoutDashboard,
  Lock,
  Leaf,
  Palette,
] as const;

export default async function TurenPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Hero block – Modern Entrance Doors + Design Your Door Online (fused) + door image faded from left */}
      <section className="bg-background border-b border-divider px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative flex flex-col lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="flex-1 min-w-0 flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 sm:mb-6">
              {t("door_section.title")}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-3xl mb-8 sm:mb-10 whitespace-pre-line">
              {t("door_section.text")} {t("configurator_section.text")}
            </p>
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto whitespace-nowrap mt-auto"
            >
              {t("configurator_section.cta")}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
          <div className="hidden lg:flex flex-shrink-0 lg:w-[44%] xl:w-[48%] relative mt-8 lg:mt-0 min-h-[320px]">
            <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden bg-background/50">
              <Image
                src={HERO_DOOR_IMAGE}
                alt="Modern entrance door"
                fill
                className="object-contain object-center"
                sizes="(max-width: 1023px) 0px, 55vw"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background: "linear-gradient(to right, var(--color-background) 0%, var(--color-background) 15%, transparent 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Two columns: titles in row 1, content in row 2 so right card height = left grid height */}
      <section className="bg-surface border-b border-divider px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-x-10 sm:gap-x-12 lg:gap-x-16 gap-y-8 items-stretch">
          {/* Row 1: titles */}
          <h2 className="text-2xl sm:text-3xl font-bold">
            {t("door_benefits.title")}
          </h2>
          <h2 className="text-xl sm:text-2xl font-bold lg:pt-0">
            {t("contact_strip.title")}
          </h2>
          {/* Row 2: left = 4 cards grid (sets row height), right = Ready to Design card (stretches to match) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 self-start">
            {DOOR_BENEFIT_KEYS.map((key, i) => {
              const Icon = DOOR_BENEFIT_ICONS[i];
              return (
                <div
                  key={key}
                  className="interactive-card flex flex-col gap-3 rounded-2xl border border-border bg-background/40 p-5 sm:p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/15 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <p className="text-muted text-sm leading-relaxed">
                    {t(`door_benefits.${key}`)}
                  </p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col min-h-0">
            <div className="interactive-card rounded-2xl border border-border bg-background/40 p-6 sm:p-8 flex flex-col h-full min-h-0">
              <p className="text-muted text-sm sm:text-base mb-6 flex-1 min-h-0">
                {t("contact_strip.text")}
              </p>
              <div className="flex flex-col sm:flex-row sm:flex-nowrap gap-3 sm:gap-4">
                <a
                  href={CONFIGURATOR_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:flex-1 sm:min-w-0 whitespace-nowrap"
                >
                  {t("contact_strip.cta_design")}
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a
                  href={CONTACT.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg text-sm sm:text-base transition-colors duration-200 w-full sm:flex-1 sm:min-w-0 whitespace-nowrap"
                >
                  <MessageCircle className="w-5 h-5" />
                  {t("contact_strip.cta_whatsapp")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
