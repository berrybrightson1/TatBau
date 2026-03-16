"use client";

import * as React from "react";
import * as Popover from "@radix-ui/react-popover";
import { ChevronDown, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";

export function SearchCategorySelect() {
  const t = useTranslations("nav");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(t("all_categories"));

  const categories = [t("all_categories"), "Living Rooms", "Bedrooms", "Kitchens", "Accessories"];

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger aria-label={t("all_categories")} className="w-full h-full px-4 flex items-center justify-between gap-3 bg-transparent text-xs font-bold tracking-wider text-foreground uppercase cursor-pointer outline-none !shadow-none ring-0">
        <span className="truncate">{selected}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </Popover.Trigger>
      
      <AnimatePresence>
        {open && (
           <Popover.Portal forceMount>
            <Popover.Content 
              forceMount
              asChild
              align="center" 
              sideOffset={4}
              className="z-50 w-[var(--radix-popover-trigger-width)] rounded-[2px] border border-surface bg-[#0a0a0a] shadow-2xl outline-none overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <div className="flex flex-col py-1">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setSelected(category);
                        setOpen(false);
                      }}
                      className="flex items-center justify-between px-4 py-3 text-[11px] font-bold tracking-wider uppercase cursor-pointer transition-colors outline-none !shadow-none text-foreground hover:bg-[#1a1a1a] hover:text-accent group"
                    >
                      <span className={selected === category ? "text-accent" : ""}>{category}</span>
                      {selected === category && <Check className="w-4 h-4 text-accent" />}
                    </button>
                  ))}
                </div>
              </motion.div>
            </Popover.Content>
          </Popover.Portal>
        )}
      </AnimatePresence>
    </Popover.Root>
  );
}
