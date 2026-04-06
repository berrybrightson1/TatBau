import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { MapPin, Phone, Mail, MessageCircle, ExternalLink } from "lucide-react";
import { CONTACT } from "@/lib/constants";
import { ContactForm } from "@/components/contact/ContactForm";

export default async function KontaktPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("pages.kontakt");

  return (
    <main className="min-h-[60vh] pt-28 sm:pt-32 pb-14 sm:pb-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
        <div className="min-w-0">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">{t("title")}</h1>
          <p className="text-muted mb-8">{t("intro")}</p>

          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">TAT Bau</p>
                <p className="text-muted">
                  {CONTACT.address.street}
                  <br />
                  {CONTACT.address.city}, {CONTACT.address.country}
                </p>
              </div>
            </li>
            <li>
              <a
                href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-4 text-foreground hover:text-accent transition-colors break-all"
              >
                <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{CONTACT.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-4 text-foreground hover:text-accent transition-colors break-all"
              >
                <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                <span>{CONTACT.email}</span>
              </a>
            </li>
          </ul>

          <p className="text-sm text-muted mt-8 mb-4">{t("or_whatsapp")}</p>
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-6 py-3 rounded-lg min-h-[48px] transition-colors duration-200 w-full sm:w-auto"
          >
            <MessageCircle className="w-5 h-5" />
            WhatsApp {CONTACT.phone}
          </a>

          <div className="mt-10 pt-10 border-t border-border">
            <h2 className="text-lg sm:text-xl font-semibold mb-4">{t("form_heading")}</h2>
            <ContactForm />
          </div>
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <h2 className="text-lg sm:text-xl font-semibold">{t("location_heading")}</h2>
          <div className="overflow-hidden border border-border rounded-2xl aspect-video min-h-[220px] sm:min-h-[280px]">
            <iframe
              title="TAT Bau Location"
              src={CONTACT.mapUrl}
              width="100%"
              height="100%"
              className="border-0 w-full h-full min-h-[220px] sm:min-h-[280px]"
              loading="lazy"
            />
          </div>
          <a
            href={CONTACT.mapLinkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            <ExternalLink className="w-4 h-4 shrink-0" />
            {t("open_in_maps")}
          </a>
        </div>
      </div>
    </main>
  );
}
