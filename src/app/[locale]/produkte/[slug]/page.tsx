import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const VALID_SLUGS = [
  "windows",
  "roller_shutters",
  "exterior_blinds",
  "glass_walls",
  "sun_protection",
] as const;

const PRODUCT_IMAGES: Record<(typeof VALID_SLUGS)[number], string> = {
  windows: "/images/products/Window.jpg.jpeg",
  roller_shutters: "/images/products/RollerShutter_1.png",
  exterior_blinds: "/images/products/blinds__.jpg.jpeg",
  glass_walls: "/images/gallery/Glass-Walls.png",
  sun_protection: "/images/products/sun protection_.jpg.jpeg",
};

export function generateStaticParams() {
  return VALID_SLUGS.map((slug) => ({ slug }));
}

export default async function ProduktDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!VALID_SLUGS.includes(slug as (typeof VALID_SLUGS)[number])) {
    notFound();
  }
  setRequestLocale(locale);
  const t = await getTranslations("pages.produkte");

  const title = t(slug);
  const intro = t(`${slug}_text`);
  const detail = t(`${slug}_detail`);
  const imageSrc = PRODUCT_IMAGES[slug as (typeof VALID_SLUGS)[number]];

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-16 sm:pb-24">
      {/* Hero: title, intro, image */}
      <section className="bg-background border-b border-white/5 px-4 sm:px-6 py-12 sm:py-16 relative overflow-hidden">
        <div className="max-w-6xl mx-auto relative flex flex-col lg:flex-row lg:items-stretch lg:gap-12 xl:gap-16">
          <div className="flex-1 min-w-0 flex flex-col">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-5 sm:mb-6">
              {title}
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-3xl mb-8 sm:mb-10">
              {intro}
            </p>
          </div>
          <div className="hidden lg:flex flex-shrink-0 lg:w-[44%] xl:w-[48%] relative mt-8 lg:mt-0 min-h-[280px]">
            <div className="relative w-full h-full min-h-[280px] rounded-lg overflow-hidden bg-background/50">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1023px) 0px, 55vw"
                priority
              />
              <div
                className="absolute inset-0 pointer-events-none"
                aria-hidden
                style={{
                  background:
                    "linear-gradient(to right, var(--color-background) 0%, var(--color-background) 15%, transparent 50%)",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Detail writeup */}
      <section className="bg-surface border-b border-white/5 px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-muted text-lg leading-relaxed whitespace-pre-line">
              {detail}
            </p>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="bg-background px-4 sm:px-6 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BD5A] text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 text-sm sm:text-base transition-colors duration-200 w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            {t("cta")}
          </a>
          <Link
            href="/produkte"
            className="inline-flex items-center justify-center gap-2 text-muted hover:text-foreground font-semibold text-sm sm:text-base transition-colors w-full sm:w-auto border border-white/20 hover:bg-white/5 px-6 py-3.5 sm:px-8 sm:py-4 rounded-lg"
          >
            ← {t("back_to_products")}
          </Link>
        </div>
      </section>
    </main>
  );
}
