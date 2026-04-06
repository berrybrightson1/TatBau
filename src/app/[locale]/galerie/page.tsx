import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";

const GALLERY_IMAGES: Array<{ src: string; altKey?: string }> = [
  { src: "/images/gallery/gallery-1.jpg", altKey: "door_1" },
  { src: "/images/gallery/gallery-2.jpg", altKey: "door_2" },
  { src: "/images/gallery/gallery-3.jpg", altKey: "door_3" },
  { src: "/images/gallery/gallery-4.jpg", altKey: "door_4" },
  { src: "/images/gallery/gallery-5.jpg", altKey: "door_5" },
  { src: "/images/gallery/gallery-6.jpg", altKey: "door_6" },
  { src: "/images/gallery/Glass-Walls.png" },
  { src: "/images/gallery/new-galleryimages (1).png" },
  { src: "/images/gallery/new-galleryimages (2).png" },
  { src: "/images/gallery/new-galleryimages (3).png" },
  { src: "/images/gallery/new-galleryimages (4).png" },
  { src: "/images/gallery/new-galleryimages (5).png" },
  { src: "/images/gallery/new-galleryimages (6).png" },
  { src: "/images/gallery/new-galleryimages (7).png" },
  { src: "/images/gallery/new-galleryimages (8).png" },
  { src: "/images/gallery/gallery-11.png" },
  { src: "/images/gallery/gallery-12.png" },
  { src: "/images/gallery/gallery-13.png" },
];

export default async function GaleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.galerie");

  const images = GALLERY_IMAGES.map((item, index) => ({
    src: item.src,
    caption: item.altKey ? t(`items.${item.altKey}`) : `${t("title")} ${index + 1}`,
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
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-8 py-4 rounded-lg shadow-lg transition-colors duration-200 w-full sm:w-auto min-h-[52px] sm:min-h-0"
          >
            <MessageCircle className="w-5 h-5" />
            {t("cta")}
          </a>
        </div>
      </div>
    </main>
  );
}
