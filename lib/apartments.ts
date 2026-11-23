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
  /** Ścieżka względem folderu /public, np. "/apartments/grzybowska-37/01.webp". */
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

/* -------------------------------------------------------------------------- */
/*  Zdjęcia                                                                   */
/*  Kolejność na liście = kolejność w galerii. Pierwsze zdjęcie = główne.     */
/*  Na desktopie w siatce widać zdjęcia 1–5, reszta w podglądzie galerii.     */
/*  Pliki WebP przygotowuje scripts/optimize-photos.mjs                       */
/*  (instrukcja: README.md → „Jak wymienić zdjęcia apartamentu”).             */
/* -------------------------------------------------------------------------- */

/**
 * Grzybowska 37 – ZDJĘCIA TYMCZASOWE (niska rozdzielczość, pionowe).
 * Do zastąpienia profesjonalną sesją: wystarczy podmienić całą tę listę.
 */
const GRZYBOWSKA_37_PHOTOS: ApartmentPhoto[] = [
  { src: "/apartments/grzybowska-37/867025364.webp", width: 576, height: 768, alt: { pl: "Salon z jadalnią i lampą z kulistymi kloszami", en: "Living room with a dining area and a globe pendant lamp" } },
  { src: "/apartments/grzybowska-37/867024936.webp", width: 576, height: 768, alt: { pl: "Sypialnia z podwójnym łóżkiem", en: "Bedroom with a double bed" } },
  { src: "/apartments/grzybowska-37/867025291.webp", width: 576, height: 768, alt: { pl: "Salon z sofą i aneksem kuchennym", en: "Living room with a sofa and kitchenette" } },
  { src: "/apartments/grzybowska-37/867025280.webp", width: 576, height: 768, alt: { pl: "Taras z roślinami", en: "Terrace with plants" } },
  { src: "/apartments/grzybowska-37/867025274.webp", width: 576, height: 768, alt: { pl: "Widok na salon z sofą i miejscem do pracy", en: "View of the living room with a sofa and workspace" } },
  { src: "/apartments/grzybowska-37/867025317.webp", width: 576, height: 768, alt: { pl: "Stół jadalniany przy aneksie kuchennym", en: "Dining table by the kitchenette" } },
  { src: "/apartments/grzybowska-37/867025375.webp", width: 576, height: 768, alt: { pl: "Salon z telewizorem i fotelem", en: "Living room with a TV and an armchair" } },
  { src: "/apartments/grzybowska-37/867025339.webp", width: 576, height: 768, alt: { pl: "Aneks kuchenny", en: "Kitchenette" } },
  { src: "/apartments/grzybowska-37/867025284.webp", width: 576, height: 768, alt: { pl: "Biurko z lampką", en: "Desk with a lamp" } },
  { src: "/apartments/grzybowska-37/867025277.webp", width: 576, height: 768, alt: { pl: "Łazienka z kabiną prysznicową", en: "Bathroom with a walk-in shower" } },
  { src: "/apartments/grzybowska-37/867025333.webp", width: 576, height: 768, alt: { pl: "Kabina prysznicowa", en: "Shower" } },
  { src: "/apartments/grzybowska-37/867025307.webp", width: 576, height: 768, alt: { pl: "Hol z zieloną ścianą roślin", en: "Lobby with a green plant wall" } },
  { src: "/apartments/grzybowska-37/867025350.webp", width: 557, height: 768, alt: { pl: "Korytarz w budynku", en: "Building corridor" } },
];

const LUDWIKI_4A_PHOTOS: ApartmentPhoto[] = [
  { src: "/apartments/ludwiki-4a/img-7517.webp", width: 2400, height: 1600, alt: { pl: "Salon z jadalnią i niebieskim aneksem kuchennym", en: "Living room with a dining area and a blue kitchenette" } },
  { src: "/apartments/ludwiki-4a/img-7451.webp", width: 2400, height: 1600, alt: { pl: "Sypialnia z podwójnym łóżkiem", en: "Bedroom with a double bed" } },
  { src: "/apartments/ludwiki-4a/img-7496.webp", width: 2400, height: 1600, alt: { pl: "Aneks kuchenny z niebieskimi frontami", en: "Kitchenette with blue cabinets" } },
  { src: "/apartments/ludwiki-4a/img-7535.webp", width: 2400, height: 1600, alt: { pl: "Balkon z widokiem na panoramę Warszawy", en: "Balcony overlooking the Warsaw skyline" } },
  { src: "/apartments/ludwiki-4a/img-7511.webp", width: 2400, height: 1600, alt: { pl: "Stół jadalniany przy oknie i sofa", en: "Dining table by the window and a sofa" } },
  { src: "/apartments/ludwiki-4a/img-7544.webp", width: 2400, height: 1600, alt: { pl: "Widok na panoramę Warszawy", en: "View of the Warsaw skyline" } },
  { src: "/apartments/ludwiki-4a/img-7499.webp", width: 2400, height: 1600, alt: { pl: "Aneks kuchenny – widok z boku", en: "Kitchenette – side view" } },
  { src: "/apartments/ludwiki-4a/img-7532.webp", width: 2400, height: 1600, alt: { pl: "Stolik przy oknie balkonowym", en: "Table by the balcony window" } },
  { src: "/apartments/ludwiki-4a/img-7547.webp", width: 2400, height: 1600, alt: { pl: "Krzesło przy oknie z widokiem na miasto", en: "Chair by the window with a city view" } },
  { src: "/apartments/ludwiki-4a/img-7454.webp", width: 2400, height: 1600, alt: { pl: "Sypialnia z szafą wnękową", en: "Bedroom with a built-in wardrobe" } },
  { src: "/apartments/ludwiki-4a/img-7463.webp", width: 2400, height: 1600, alt: { pl: "Łóżko z poduszkami i lampką ścienną", en: "Bed with pillows and a wall lamp" } },
  { src: "/apartments/ludwiki-4a/img-7475.webp", width: 2400, height: 1600, alt: { pl: "Widok z przedpokoju na sypialnię i salon", en: "View from the hallway to the bedroom and living room" } },
  { src: "/apartments/ludwiki-4a/img-7445.webp", width: 2400, height: 1600, alt: { pl: "Łazienka z umywalką nablatową", en: "Bathroom with a countertop washbasin" } },
  { src: "/apartments/ludwiki-4a/img-7436.webp", width: 2400, height: 1600, alt: { pl: "Łazienka z wanną i pralką", en: "Bathroom with a bathtub and washing machine" } },
  { src: "/apartments/ludwiki-4a/img-7478.webp", width: 2400, height: 1600, alt: { pl: "Przedpokój z szafą", en: "Hallway with a wardrobe" } },
  { src: "/apartments/ludwiki-4a/img-7550.webp", width: 2400, height: 1600, alt: { pl: "Korytarz w budynku", en: "Building corridor" } },
  { src: "/apartments/ludwiki-4a/img-7553.webp", width: 2400, height: 1600, alt: { pl: "Hol z windą", en: "Lift lobby" } },
  { src: "/apartments/ludwiki-4a/img-7562.webp", width: 2400, height: 1600, alt: { pl: "Wejście do budynku", en: "Building entrance" } },
  { src: "/apartments/ludwiki-4a/img-7568.webp", width: 2400, height: 1600, alt: { pl: "Budynek z zewnątrz", en: "Building exterior" } },
];

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
    photos: GRZYBOWSKA_37_PHOTOS,
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
    photos: LUDWIKI_4A_PHOTOS,
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
