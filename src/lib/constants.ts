export const CONFIGURATOR_URL =
  "https://doordesigner.inotherm-tuer.de/configurator/?partnerCode=48784";

export const WHATSAPP_URL = "https://wa.me/4917662161501";

/** Product key to detail page path (locale prefix added by Link). Doors use /turen; others use /produkte/[slug]. */
export const PRODUCT_PATHS: Record<string, string> = {
  doors: "/turen",
  windows: "/produkte/windows",
  roller_shutters: "/produkte/roller_shutters",
  exterior_blinds: "/produkte/exterior_blinds",
  glass_walls: "/produkte/glass_walls",
  sun_protection: "/produkte/sun_protection",
} as const;

export const CONTACT = {
  phone: "+49 176 62161501",
  whatsapp: "https://wa.me/4917662161501",
  email: "info@tatbau.de",
  address: {
    street: "Hasporter Damm 75",
    city: "27749 Delmenhorst",
    country: "Germany",
  },
  mapUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=8.618%2C53.038%2C8.658%2C53.058&layer=mapnik",
  mapLinkUrl: "https://www.google.com/maps?q=Hasporter+Damm+75,+27749+Delmenhorst",
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
  },
} as const;
