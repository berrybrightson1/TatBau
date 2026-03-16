import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function DatenschutzPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.datenschutz");

  return (
    <main className="min-h-[60vh] pt-32 pb-20 px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">{t("title")}</h1>
        <p className="text-muted leading-relaxed">{t("content")}</p>
      </div>
    </main>
  );
}
