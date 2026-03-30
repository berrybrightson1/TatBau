"use client";

import { useState, useRef, useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

interface Message {
  role: "bot" | "user";
  text: string;
}

const FAQ_IDS = ["1", "2", "3", "4", "5", "6", "7", "8"] as const;

export function ChatWidget() {
  const t = useTranslations("chat");
  const tFaq = useTranslations("faq");
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  // Show welcome message on first open
  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: t("welcome") }]);
    }
  }, [open, messages.length, t]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  function handleFaqClick(id: string) {
    const question = tFaq(`items.${id}.q`);
    const answer = tFaq(`items.${id}.a`);
    setMessages((prev) => [
      ...prev,
      { role: "user", text: question },
      { role: "bot", text: answer },
    ]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "bot", text: t("fallback") },
    ]);
    setInput("");
  }

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <button
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-accent hover:bg-accent-hover text-background flex items-center justify-center shadow-lg shadow-accent/20 transition-colors duration-200 rounded-full"
          aria-label={t("title")}
        >
          {open ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </button>
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Content
          side="top"
          align="end"
          sideOffset={16}
          className="w-[360px] max-w-[calc(100vw-3rem)] h-[480px] bg-surface border border-white/5 shadow-2xl flex flex-col z-50"
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{t("title")}</h3>
              <p className="text-xs text-muted">{t("subtitle")}</p>
            </div>
            <Popover.Close asChild>
              <button
                className="p-1.5 text-muted hover:text-foreground transition-colors"
                aria-label={t("close")}
              >
                <X className="w-4 h-4" />
              </button>
            </Popover.Close>
          </div>

          {/* Messages area – scrollable; stop wheel so Lenis doesn't capture it */}
          <div
            ref={scrollRef}
            onWheel={(e) => e.stopPropagation()}
            className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain px-5 py-4 flex flex-col gap-3"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${
                  msg.role === "bot"
                    ? "self-start bg-white/5 text-foreground/90 rounded-br-lg rounded-tr-lg rounded-tl-lg"
                    : "self-end bg-accent/10 text-foreground border border-accent/20 rounded-bl-lg rounded-tl-lg rounded-tr-lg"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {/* All FAQ questions – same content as main FAQ */}
            {messages.length <= 1 && (
              <div className="flex flex-col gap-2 mt-2">
                {FAQ_IDS.map((id) => (
                  <button
                    key={id}
                    onClick={() => handleFaqClick(id)}
                    className="text-left text-sm px-4 py-2.5 bg-white/5 hover:bg-accent/10 text-foreground/80 hover:text-foreground border border-white/5 hover:border-accent/20 transition-colors duration-200 flex items-center justify-between gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                  >
                    <span>{tFaq(`items.${id}.q`)}</span>
                    <ChevronRight className="w-3.5 h-3.5 flex-shrink-0 text-accent" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="px-5 py-3 border-t border-white/5 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t("placeholder")}
              className="flex-1 bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus-visible:ring-2 focus-visible:ring-accent focus-visible:border-transparent focus-visible:shadow-none transition-all"
            />
            <button
              type="submit"
              className="p-2.5 bg-accent hover:bg-accent-hover text-background transition-colors duration-200"
              aria-label="Send"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
