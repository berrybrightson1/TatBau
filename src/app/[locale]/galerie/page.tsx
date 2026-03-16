import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const GALLERY_IMAGES = [
  { src: "/images/gallery/gallery-1.jpg", altKey: "door_1" },
  { src: "/images/gallery/gallery-2.jpg", altKey: "door_2" },
  { src: "/images/gallery/gallery-3.jpg", altKey: "door_3" },
  { src: "/images/gallery/gallery-4.jpg", altKey: "door_4" },
  { src: "/images/gallery/gallery-5.jpg", altKey: "door_5" },
  { src: "/images/gallery/gallery-6.jpg", altKey: "door_6" },
];

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.galerie");

  const images = GALLERY_IMAGES.map((item) => ({
    src: item.src,
    caption: t(`items.${item.altKey}`),
  }));

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">{t("title")}</h1>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto">
            {t("intro")}
          </p>
        </header>

        <GalleryLightbox images={images} />

        <div className="mt-14 sm:mt-16 text-center">
          <p className="text-muted mb-6 px-1 max-w-xl mx-auto">
            <Link
              href="/kontakt"
              className="text-accent hover:underline font-medium"
            >
              {t("contact_link")}
            </Link>{" "}
            {t("contact_teaser")}
          </p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px] sm:min-h-0"
          >
            <MessageCircle className="w-5 h-5" />
            {t("cta")}
          </a>
        </div>
      </div>
    </main>
  );
}
