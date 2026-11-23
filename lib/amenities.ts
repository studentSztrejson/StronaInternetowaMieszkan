import type { Localized } from "@/lib/i18n/config";

/**
 * Katalog udogodnień, które można przypisać do apartamentu.
 * Każde udogodnienie ma ikonę (patrz components/icons.tsx) i etykietę PL/EN.
 *
 * Aby dodać nowe udogodnienie: dopisz klucz tutaj, dodaj ikonę w AMENITY_ICONS
 * (components/amenity-icon.tsx), a następnie użyj klucza w lib/apartments.ts.
 */
export const AMENITIES = {
  wifi: { pl: "Wi‑Fi", en: "Wi‑Fi" },
  airConditioning: { pl: "Klimatyzacja", en: "Air conditioning" },
  kitchen: { pl: "Wyposażona kuchnia", en: "Equipped kitchen" },
  oven: { pl: "Piekarnik", en: "Oven" },
  dishwasher: { pl: "Zmywarka", en: "Dishwasher" },
  washer: { pl: "Pralka", en: "Washing machine" },
  hairDryer: { pl: "Suszarka do włosów", en: "Hair dryer" },
  tv: { pl: "Telewizor", en: "TV" },
  workspace: { pl: "Biurko do pracy", en: "Work desk" },
  privateBalcony: { pl: "Prywatny balkon", en: "Private balcony" },
  cityView: { pl: "Widok na centrum Warszawy", en: "View of central Warsaw" },
  sharedTerrace: { pl: "Dostęp do wspólnego tarasu (ok. 200 m²)", en: "Access to a shared terrace (approx. 200 m²)" },
  commonAreas: { pl: "Eleganckie części wspólne", en: "Elegant common areas" },
  playground: { pl: "Plac zabaw dla dzieci", en: "Children’s playground" },
  // Pozycje dostępne w katalogu, obecnie nieprzypisane do żadnego apartamentu:
  coffeeMachine: { pl: "Ekspres do kawy", en: "Coffee machine" },
  heating: { pl: "Ogrzewanie", en: "Heating" },
  elevator: { pl: "Winda", en: "Elevator" },
  balcony: { pl: "Balkon", en: "Balcony" },
  selfCheckIn: { pl: "Samodzielne zameldowanie", en: "Self check‑in" },
} satisfies Record<string, Localized>;

export type AmenityKey = keyof typeof AMENITIES;

export const AMENITY_KEYS = Object.keys(AMENITIES) as AmenityKey[];
