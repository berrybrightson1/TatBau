"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { X, ChevronDown } from "lucide-react";
import { CONTACT } from "@/lib/constants";

const PRODUCT_KEYS = [
  "doors",
  "windows",
  "roller_shutters",
  "exterior_blinds",
  "glass_walls",
  "sun_protection",
  "other",
] as const;

function buildWhatsAppMessage(data: {
  name: string;
  phone: string;
  email: string;
  product: string;
  message: string;
}): string {
  const lines: string[] = [
    `*Inquiry from TAT Bau website*`,
    ``,
    `Name: ${data.name}`,
    `Phone: ${data.phone}`,
  ];
  if (data.email.trim()) lines.push(`Email: ${data.email}`);
  if (data.product.trim()) lines.push(`Product interest: ${data.product}`);
  lines.push(``);
  lines.push(data.message.trim() || "(No message)");
  return lines.join("\n");
}

export function WhatsAppInquiryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("whatsapp_modal");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [productOpen, setProductOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);

  const validate = useCallback(() => {
    const next: Record<string, string> = {};
    const required = t("error_required");
    if (!name.trim()) next.name = required;
    if (!phone.trim()) next.phone = required;
    if (!message.trim()) next.message = required;
    setErrors(next);
    return Object.keys(next).length === 0;
  }, [name, phone, message, t]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;
      const text = buildWhatsAppMessage({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        product: product.trim(),
        message: message.trim(),
      });
      const url = `${CONTACT.whatsapp}?text=${encodeURIComponent(text)}`;
      window.open(url, "_blank", "noopener,noreferrer");
      onClose();
    },
    [name, phone, email, product, message, validate, onClose]
  );

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === overlayRef.current) onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!open) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (productOpen) setProductOpen(false);
        else onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [open, onClose, productOpen]);

  useEffect(() => {
    if (!productOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (productRef.current && !productRef.current.contains(e.target as Node)) {
        setProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [productOpen]);

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div
        className="relative w-full max-w-lg sm:max-w-xl md:max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-surface shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-surface px-4 py-3 sm:px-6 sm:py-4">
          <h2 id="whatsapp-modal-title" className="text-lg font-semibold text-foreground">
            {t("title")}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-muted hover:text-foreground hover:bg-subtle-hover transition-colors"
            aria-label={t("close")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6">
          <p className="text-sm text-muted mb-4">{t("intro")}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            <div>
              <label htmlFor="wa-name" className="block text-sm font-medium text-foreground mb-1">
                {t("name")} *
              </label>
              <input
                id="wa-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("name_placeholder")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                autoComplete="name"
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-400">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="wa-phone" className="block text-sm font-medium text-foreground mb-1">
                {t("phone")} *
              </label>
              <input
                id="wa-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t("phone_placeholder")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                autoComplete="tel"
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
              )}
            </div>

            <div>
              <label htmlFor="wa-email" className="block text-sm font-medium text-foreground mb-1">
                {t("email")}
              </label>
              <input
                id="wa-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("email_placeholder")}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent"
                autoComplete="email"
              />
            </div>

            <div ref={productRef} className="relative">
              <label
                id="wa-product-label"
                className="block text-sm font-medium text-foreground mb-1"
              >
                {t("product")}
              </label>
              <button
                type="button"
                id="wa-product"
                aria-haspopup="listbox"
                aria-expanded={productOpen}
                aria-labelledby="wa-product-label"
                onClick={() => setProductOpen((prev) => !prev)}
                className="w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border border-border bg-background text-left text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent focus:outline-none"
              >
                <span className={product ? "" : "text-muted"}>
                  {product || t("product_placeholder")}
                </span>
                <ChevronDown
                  className={`w-4 h-4 flex-shrink-0 text-muted transition-transform ${productOpen ? "rotate-180" : ""}`}
                />
              </button>
              {productOpen && (
                <ul
                  role="listbox"
                  aria-labelledby="wa-product-label"
                  onWheel={(e) => e.stopPropagation()}
                  className="absolute z-20 left-0 right-0 mt-1 py-1 rounded-lg border border-border bg-surface shadow-xl max-h-48 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y"
                >
                  <li role="option">
                    <button
                      type="button"
                      onClick={() => {
                        setProduct("");
                        setProductOpen(false);
                      }}
                      className="w-full text-left px-3 py-2.5 text-sm text-muted hover:bg-subtle hover:text-foreground transition-colors"
                    >
                      {t("product_placeholder")}
                    </button>
                  </li>
                  {PRODUCT_KEYS.map((key) => {
                    const label = t(`products.${key}`);
                    return (
                      <li key={key} role="option" aria-selected={product === label}>
                        <button
                          type="button"
                          onClick={() => {
                            setProduct(label);
                            setProductOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2.5 text-sm transition-colors hover:bg-accent/15 hover:text-foreground ${product === label ? "bg-accent/10 text-accent" : "text-foreground"}`}
                        >
                          {label}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>

          <div className="mt-4 sm:mt-5">
            <label htmlFor="wa-message" className="block text-sm font-medium text-foreground mb-1">
              {t("message")} *
            </label>
            <textarea
              id="wa-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("message_placeholder")}
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg border border-border bg-background text-foreground placeholder:text-muted focus:border-accent focus:ring-1 focus:ring-accent resize-y min-h-[80px] max-h-[140px]"
              autoComplete="off"
            />
            {errors.message && (
              <p className="mt-1 text-xs text-red-400">{errors.message}</p>
            )}
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4 sm:pt-5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-3 rounded-lg border border-border-strong text-foreground hover:bg-subtle transition-colors"
            >
              {t("close")}
            </button>
            <button
              type="submit"
              className="flex-1 inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-background font-semibold px-4 py-3 rounded-lg transition-colors"
            >
              {t("submit")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
