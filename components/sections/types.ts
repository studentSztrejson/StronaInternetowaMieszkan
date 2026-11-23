import type { Apartment } from "@/lib/apartments";
import type { Dictionary, Locale } from "@/lib/i18n";

/** Wspólne propsy sekcji strony apartamentu. */
export interface SectionProps {
  lang: Locale;
  dict: Dictionary;
  apartment: Apartment;
}

/** Identyfikatory sekcji (kotwice w adresie, np. #amenities). */
export const SECTION_IDS = {
  apartment: "apartment",
  amenities: "amenities",
  location: "location",
  reviews: "reviews",
  contact: "contact",
  about: "about",
  faq: "faq",
  terms: "terms",
} as const;
