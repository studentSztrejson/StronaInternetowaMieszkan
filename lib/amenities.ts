import type { Localized } from "@/lib/i18n/config";

/**
 * Katalog udogodnień, które można przypisać do apartamentu.
 * Każde udogodnienie ma ikonę (patrz components/icons.tsx) i etykietę PL/EN.
 *
 * Aby dodać nowe udogodnienie: dopisz klucz tutaj, dodaj ikonę w AMENITY_ICONS
 * (components/amenity-icon.tsx), a następnie użyj klucza w lib/apartments.ts.
 */
export const AMENITIES = {
  wifi: { pl: "Szybkie Wi‑Fi", en: "Fast Wi‑Fi" },
  kitchen: { pl: "W pełni wyposażona kuchnia", en: "Fully equipped kitchen" },
  coffeeMachine: { pl: "Ekspres do kawy", en: "Coffee machine" },
  airConditioning: { pl: "Klimatyzacja", en: "Air conditioning" },
  heating: { pl: "Ogrzewanie", en: "Heating" },
  washer: { pl: "Pralka", en: "Washing machine" },
  tv: { pl: "Telewizor", en: "TV" },
  workspace: { pl: "Miejsce do pracy", en: "Dedicated workspace" },
  elevator: { pl: "Winda", en: "Elevator" },
  parking: { pl: "Parking", en: "Parking" },
  balcony: { pl: "Balkon", en: "Balcony" },
  selfCheckIn: { pl: "Samodzielne zameldowanie", en: "Self check‑in" },
} satisfies Record<string, Localized>;

export type AmenityKey = keyof typeof AMENITIES;

export const AMENITY_KEYS = Object.keys(AMENITIES) as AmenityKey[];
