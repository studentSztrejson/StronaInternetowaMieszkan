import type { AmenityKey } from "@/lib/amenities";
import type { Localized } from "@/lib/i18n/config";

/* -------------------------------------------------------------------------- */
/*  Typy                                                                      */
/* -------------------------------------------------------------------------- */

/** Identyfikator apartamentu – używany również jako segment adresu URL. */
export const APARTMENT_IDS = ["grzybowska-37", "ludwiki-4a"] as const;
export type ApartmentId = (typeof APARTMENT_IDS)[number];

export const DEFAULT_APARTMENT_ID: ApartmentId = "grzybowska-37";

export interface ApartmentPhoto {
  /** Ścieżka względem folderu /public, np. "/apartments/grzybowska-37/01.jpg". */
  src: string;
  width: number;
  height: number;
  alt: Localized;
}

export interface ApartmentAddress {
  street: string;
  postalCode: string | null;
  city: string;
  /** Dzielnica – opcjonalnie. */
  district: string | null;
}

export interface ApartmentDetails {
  maxGuests: number | null;
  bedrooms: number | null;
  beds: number | null;
  bathrooms: number | null;
  areaM2: number | null;
}

export interface ApartmentRating {
  /** Ocena w skali Booking.com (0–10). null = brak zweryfikowanej oceny. */
  score: number | null;
  reviewCount: number | null;
  /** Data weryfikacji oceny w formacie ISO, np. "2026-11-18". */
  verifiedAt: string | null;
}

export interface ApartmentFaqItem {
  question: Localized;
  answer: Localized;
}

/**
 * Dane pod przyszłe etapy (kalendarz, synchronizacja z Booking.com / Airbnb).
 * Na tym etapie nie są używane w interfejsie.
 */
export interface ApartmentAvailability {
  /** Linki iCal do synchronizacji kalendarzy. */
  icalUrls: {
    booking: string | null;
    airbnb: string | null;
  };
  /** Godzina zameldowania od, np. "15:00". */
  checkInFrom: string | null;
  /** Godzina wymeldowania do, np. "11:00". */
  checkOutUntil: string | null;
  minNights: number | null;
}

export interface Apartment {
  id: ApartmentId;
  /** Pełna nazwa obiektu. */
  name: string;
  /** Krótka nazwa do przełącznika i nagłówków. */
  shortName: string;
  address: ApartmentAddress;
  /** Krótki opis (1–3 akapity). null = do uzupełnienia. */
  description: Localized<string | null>;
  /** Opis okolicy. null = do uzupełnienia. */
  neighborhood: Localized<string | null>;
  /** Zdjęcia – pierwsze jest zdjęciem głównym. Pusta tablica = placeholdery. */
  photos: ApartmentPhoto[];
  /** Cena „od” w PLN za noc. null = cena na zapytanie. */
  priceFromPLN: number | null;
  details: ApartmentDetails;
  amenities: AmenityKey[];
  links: {
    googleMaps: string;
    /** Adres src z Google Maps → Udostępnij → Umieść mapę. */
    googleMapsEmbed: string | null;
    booking: string | null;
    airbnb: string | null;
  };
  rating: ApartmentRating;
  /** Pytania i odpowiedzi specyficzne dla tego obiektu. */
  faq: ApartmentFaqItem[];
  availability: ApartmentAvailability;
}

/* -------------------------------------------------------------------------- */
/*  Dane                                                                      */
/*  Wszystkie pola null / [] oznaczają dane do uzupełnienia                   */
/*  (patrz DATA_TO_FILL.md). Nie wpisuj tu wartości przykładowych.            */
/* -------------------------------------------------------------------------- */

function googleMapsSearchUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

const EMPTY_AVAILABILITY: ApartmentAvailability = {
  icalUrls: { booking: null, airbnb: null },
  checkInFrom: null,
  checkOutUntil: null,
  minNights: null,
};

export const APARTMENTS: Record<ApartmentId, Apartment> = {
  "grzybowska-37": {
    id: "grzybowska-37",
    name: "Premium Blue Apartment Grzybowska 37",
    shortName: "Grzybowska 37",
    address: {
      street: "ul. Grzybowska 37",
      postalCode: null, // TODO: kod pocztowy
      city: "Warszawa",
      district: null, // TODO: dzielnica (opcjonalnie)
    },
    description: { pl: null, en: null }, // TODO: opis PL i EN
    neighborhood: { pl: null, en: null }, // TODO: opis okolicy PL i EN
    photos: [], // TODO: zdjęcia w /public/apartments/grzybowska-37/
    priceFromPLN: null, // TODO: cena od (PLN / noc)
    details: {
      maxGuests: null, // TODO
      bedrooms: null, // TODO
      beds: null, // TODO
      bathrooms: null, // TODO
      areaM2: null, // TODO
    },
    amenities: [], // TODO: klucze z lib/amenities.ts
    links: {
      // Link wyszukiwania na podstawie adresu – można zastąpić linkiem do pinezki obiektu.
      googleMaps: googleMapsSearchUrl("Grzybowska 37, Warszawa"),
      googleMapsEmbed: null, // TODO
      booking: null, // TODO: link do oferty na Booking.com
      airbnb: null, // TODO: link do oferty na Airbnb (opcjonalnie)
    },
    rating: { score: null, reviewCount: null, verifiedAt: null }, // TODO
    faq: [], // TODO: pytania specyficzne dla obiektu
    availability: EMPTY_AVAILABILITY,
  },
  "ludwiki-4a": {
    id: "ludwiki-4a",
    name: "Premium Blue Apartment Ludwiki 4A",
    shortName: "Ludwiki 4A",
    address: {
      street: "ul. Ludwiki 4A",
      postalCode: null, // TODO: kod pocztowy
      city: "Warszawa",
      district: null, // TODO: dzielnica (opcjonalnie)
    },
    description: { pl: null, en: null }, // TODO: opis PL i EN
    neighborhood: { pl: null, en: null }, // TODO: opis okolicy PL i EN
    photos: [], // TODO: zdjęcia w /public/apartments/ludwiki-4a/
    priceFromPLN: null, // TODO: cena od (PLN / noc)
    details: {
      maxGuests: null, // TODO
      bedrooms: null, // TODO
      beds: null, // TODO
      bathrooms: null, // TODO
      areaM2: null, // TODO
    },
    amenities: [], // TODO: klucze z lib/amenities.ts
    links: {
      googleMaps: googleMapsSearchUrl("Ludwiki 4A, Warszawa"),
      googleMapsEmbed: null, // TODO
      booking: null, // TODO: link do oferty na Booking.com
      airbnb: null, // TODO: link do oferty na Airbnb (opcjonalnie)
    },
    rating: { score: null, reviewCount: null, verifiedAt: null }, // TODO
    faq: [], // TODO: pytania specyficzne dla obiektu
    availability: EMPTY_AVAILABILITY,
  },
};

/* -------------------------------------------------------------------------- */
/*  Pomocnicze                                                                */
/* -------------------------------------------------------------------------- */

export function isApartmentId(value: string): value is ApartmentId {
  return (APARTMENT_IDS as readonly string[]).includes(value);
}

export function getApartment(id: string): Apartment | null {
  return isApartmentId(id) ? APARTMENTS[id] : null;
}

export function getAllApartments(): Apartment[] {
  return APARTMENT_IDS.map((id) => APARTMENTS[id]);
}

/** Adres strony dla danego języka i apartamentu, np. /pl/grzybowska-37 */
export function apartmentPath(lang: string, id: ApartmentId, hash?: string): string {
  return `/${lang}/${id}${hash ? `#${hash}` : ""}`;
}

export function formatAddress(address: ApartmentAddress): string {
  const city = [address.postalCode, address.city].filter(Boolean).join(" ");
  return `${address.street}, ${city}`;
}
