import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("nav");

  return (
    <main className="min-h-[60vh] flex items-center justify-center pt-48 pb-20 px-6">
      <h1 className="text-4xl font-bold">{t("product")} - Coming Soon</h1>
    </main>
  );
}
