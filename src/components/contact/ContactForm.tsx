"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";

type Status = "idle" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("pages.kontakt");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrorMessage("");

    try {
      const subject = encodeURIComponent(`[TAT Bau Contact] from ${name.trim()}`);
      const body = encodeURIComponent(
        `Name: ${name.trim()}\nEmail: ${email.trim()}\n\n${message.trim()}`
      );
      window.location.href = `mailto:info@tatbau.de?subject=${subject}&body=${body}`;

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setErrorMessage(t("form_error"));
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label htmlFor="contact-name" className="block text-sm font-medium text-foreground mb-1.5">
          {t("form_name")}
        </label>
        <input
          id="contact-name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full bg-subtle border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
          placeholder={t("form_name")}
        />
      </div>
      <div>
        <label htmlFor="contact-email" className="block text-sm font-medium text-foreground mb-1.5">
          {t("form_email")}
        </label>
        <input
          id="contact-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full bg-subtle border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all"
          placeholder={t("form_email")}
        />
      </div>
      <div>
        <label htmlFor="contact-message" className="block text-sm font-medium text-foreground mb-1.5">
          {t("form_message")}
        </label>
        <textarea
          id="contact-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full bg-subtle border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted focus:ring-2 focus:ring-accent focus:border-transparent outline-none transition-all resize-y min-h-[100px]"
          placeholder={t("form_message")}
        />
      </div>

      {status === "success" && (
        <p className="text-sm text-green-500">{t("form_success_mailto")}</p>
      )}
      {status === "error" && errorMessage && (
        <p className="text-sm text-red-400">{errorMessage}</p>
      )}

      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover disabled:opacity-60 text-background font-semibold px-6 py-3 rounded-lg min-h-[48px] transition-colors duration-200 w-full sm:w-auto"
      >
        <>
          <Send className="w-4 h-4" />
          {t("form_send")}
        </>
      </button>
    </form>
  );
}
