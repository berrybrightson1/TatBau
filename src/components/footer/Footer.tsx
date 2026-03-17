import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import { CONTACT, CONFIGURATOR_URL } from "@/lib/constants";
import { LanguageToggle } from "@/components/navigation/LanguageToggle";

const LOGO_SRC = "/images/logo/300h/Asset-2-300x.webp";

export function Footer() {
  const t = useTranslations("footer");
  const nav = useTranslations("nav");

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block select-none" aria-label="TAT Bau Home">
              <Image
                src={LOGO_SRC}
                alt="TAT Bau"
                width={140}
                height={47}
                className="h-9 w-auto sm:h-10"
              />
            </Link>
            <p className="mt-4 text-muted text-sm leading-relaxed max-w-xs">
              {t("brand_description")}
            </p>
          </div>

          {/* Navigation column */}
          <div>
            <h3 className="font-semibold mb-6 text-foreground">
              {t("navigation")}
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link href="/" className="text-sm text-muted hover:text-accent transition-colors duration-200">
                  {nav("home")}
                </Link>
              </li>
              {[
                { href: "/ueber-uns", label: nav("about") },
                { href: "/produkte", label: nav("products") },
                { href: "/galerie", label: nav("gallery") },
                { href: "/kontakt", label: nav("contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h3 className="font-semibold mb-6 text-foreground">
              {t("contact")}
            </h3>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="break-words">
                  {CONTACT.address.street}
                  <br />
                  {CONTACT.address.city}
                </span>
              </li>
              <li>
                <a
                  href={`tel:${CONTACT.phone}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-200 break-all"
                >
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${CONTACT.email}`}
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-200 break-all"
                >
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  {CONTACT.email}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.mapLinkUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-accent transition-colors duration-200"
                >
                  <ExternalLink className="w-4 h-4 text-accent flex-shrink-0" />
                  {t("map_link")}
                </a>
              </li>
            </ul>
          </div>

          {/* Social + Map column */}
          <div>
            <h3 className="font-semibold mb-6 text-foreground">
              {t("social")}
            </h3>
            <div className="flex gap-4 mb-8">
              <a
                href={CONTACT.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2.5 bg-surface text-muted hover:text-accent hover:bg-surface/80 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2.5 bg-surface text-muted hover:text-accent hover:bg-surface/80 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONTACT.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-2.5 bg-surface text-muted hover:text-accent hover:bg-surface/80 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>

            {/* Small OSM embed */}
            <div className="relative overflow-hidden rounded-lg border border-white/10 aspect-video min-h-[140px] w-full">
              <iframe
                title="OpenStreetMap – TAT Bau location"
                src={CONTACT.mapUrl}
                width="100%"
                height="100%"
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-xs text-muted">
            &copy; {currentYear} TAT Bau. {t("rights")}
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/impressum"
              className="text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              {t("imprint")}
            </Link>
            <Link
              href="/datenschutz"
              className="text-xs text-muted hover:text-accent transition-colors duration-200"
            >
              {t("privacy")}
            </Link>
            <LanguageToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
