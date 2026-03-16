"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { Menu, Phone, Mail, ArrowRight, Check } from "lucide-react";
import { LanguageToggle } from "./LanguageToggle";
import { MobileMenu } from "./MobileMenu";
import { CONFIGURATOR_URL, CONTACT } from "@/lib/constants";

export function Navbar() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/produkte", label: t("products") },
    { href: "/galerie", label: t("gallery") },
    { href: "/ueber-uns", label: t("about") },
    { href: "/kontakt", label: t("contact") },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 font-sans flex flex-col border-b border-surface transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background/90 backdrop-blur-md"
      }`}
    >
      {/* Main bar: Logo | Nav | CTA + Contact + Language */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90 shrink-0"
        >
          <div className="text-accent border-2 border-accent rounded-sm p-1">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="w-7 h-7 sm:w-8 sm:h-8"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <span className="text-foreground font-[800] text-lg sm:text-xl leading-none tracking-tight">
            TAT Bau
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden lg:flex items-center gap-0.5">
          <a
            href={CONFIGURATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-muted hover:text-foreground transition-colors rounded"
          >
            {t("doors")}
          </a>
          {navLinks.map((link) => {
            const isActive =
              pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide transition-colors rounded ${
                  isActive ? "bg-accent/15 text-accent" : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right: Contact + CTA + Language + Mobile menu */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden md:flex items-center gap-4 text-sm">
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span className="hidden xl:inline">{CONTACT.phone}</span>
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="flex items-center gap-1.5 text-muted hover:text-accent transition-colors"
              aria-label={CONTACT.email}
            >
              <Mail className="w-4 h-4 text-accent" />
            </a>
          </div>

          <a
            href={CONFIGURATOR_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white text-sm font-semibold px-4 py-2.5 rounded transition-colors duration-200 whitespace-nowrap"
          >
            {t("configurator")}
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="hidden sm:block border-l border-surface pl-3">
            <LanguageToggle />
          </div>

          <button
            aria-label={t("menu")}
            className="lg:hidden p-2 text-foreground hover:bg-white/5 rounded"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Trust badges strip - compact */}
      <div className="hidden sm:flex bg-surface/30 border-t border-surface/50">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-[11px] font-medium text-muted">
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-accent" />
            {t("returns")}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-accent" />
            {t("delivery")}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5 text-accent" />
            {t("support")}
          </span>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navLinks={navLinks}
      />
    </header>
  );
}
