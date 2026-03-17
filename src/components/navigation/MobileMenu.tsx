"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { X, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LanguageToggle } from "./LanguageToggle";
import { CONFIGURATOR_URL } from "@/lib/constants";

const LOGO_SRC = "/images/logo/300h/Asset-2-300x.webp";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  navLinks: { href: string; label: string }[];
}

export function MobileMenu({ open, onClose, navLinks }: MobileMenuProps) {
  const t = useTranslations("nav");

  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-50" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-[300px] max-w-[85vw] bg-surface z-50 shadow-2xl flex flex-col">
          <Dialog.Title className="sr-only">{t("menu")}</Dialog.Title>

          <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
            <Link href="/" onClick={onClose} className="flex items-center select-none" aria-label="TAT Bau Home">
              <Image src={LOGO_SRC} alt="TAT Bau" width={100} height={33} className="h-8 w-auto" />
            </Link>
            <Dialog.Close asChild>
              <button
                className="p-2 text-foreground/70 hover:text-foreground transition-colors"
                aria-label={t("close")}
              >
                <X className="w-5 h-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav className="flex-1 px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={onClose}
                className="text-foreground/80 hover:text-accent font-medium py-3 border-b border-white/5 transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-8 flex flex-col gap-4">
            <LanguageToggle />
            <a
              href={CONFIGURATOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-3 transition-colors duration-200 whitespace-nowrap"
            >
              {t("configurator")}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
