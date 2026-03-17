"use client";

import { useCallback, useEffect, useState } from "react";
import { WhatsAppInquiryModal } from "./WhatsAppInquiryModal";

const WA_LINK_SELECTOR = 'a[href*="wa.me"]';

export function WhatsAppModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  const openModal = useCallback(() => setOpen(true), []);
  const closeModal = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest?.("a");
      if (!target?.getAttribute("href")?.includes("wa.me")) return;
      e.preventDefault();
      e.stopPropagation();
      openModal();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [openModal]);

  return (
    <>
      {children}
      <WhatsAppInquiryModal open={open} onClose={closeModal} />
    </>
  );
}
