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

/** Układ apartamentu: studio (bez osobnej sypialni) lub osobna sypialnia + salon. */
export type ApartmentLayout = "studio" | "bedroomAndLiving";

export interface ApartmentDetails {
  layout: ApartmentLayout | null;
  maxGuests: number | null;
  bedrooms: number | null;
  beds: number | null;
  bathrooms: number | null;
  areaM2: number | null;
  floor: number | null;
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
  /** Zameldowanie od / do, np. "16:00" / "23:00". */
  checkInFrom: string | null;
  checkInUntil: string | null;
  /** Wymeldowanie od / do, np. "05:00" / "11:00". */
  checkOutFrom: string | null;
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
  /** Opis (akapity oddzielone pustą linią). null = do uzupełnienia. */
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
    airbnb: string | null;
  };
  // Oceny i link do Booking.com / Google Maps: lib/reviews.ts
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

/** Godziny pobytu – takie same w obu apartamentach (potwierdzone przez właściciela). */
const SHARED_AVAILABILITY: ApartmentAvailability = {
  icalUrls: { booking: null, airbnb: null }, // TODO: linki iCal (kolejny etap)
  checkInFrom: "16:00",
  checkInUntil: "23:00",
  checkOutFrom: "05:00",
  checkOutUntil: "11:00",
  minNights: null, // TODO: nie ustalono
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
      district: null,
    },
    description: {
      pl: `Nowoczesne studio o powierzchni 37 m², położone w biznesowym sercu Warszawy, w nowo oddanym budynku o standardzie premium plus.

Apartament łączy eleganckie wnętrze z komfortem i funkcjonalnością. To idealne miejsce zarówno na weekendowy pobyt w stolicy, jak i podróż służbową. Do dyspozycji gości przygotowano wygodną przestrzeń wypoczynkową oraz biurko do pracy zdalnej.

Wyjątkowym atutem są pięknie zaprojektowane części wspólne budynku oraz ogólnodostępny taras o powierzchni około 200 m².

Doskonała lokalizacja w pobliżu stacji metra Rondo ONZ pozwala wygodnie odkrywać Warszawę. Pałac Kultury i Nauki, restauracje, kawiarnie oraz najważniejsze punkty biznesowe miasta znajdują się w zasięgu krótkiego spaceru.`,
      en: `A modern 37 m² studio in the heart of Warsaw’s business district, set in a newly completed premium-plus building.

The apartment pairs an elegant interior with comfort and practicality, making it an ideal base for a weekend in the capital or a business trip. Guests have a comfortable lounge area and a desk for remote work.

A real highlight is the building’s beautifully designed shared spaces, including a communal terrace of around 200 m².

The excellent location near Rondo ONZ metro station makes it easy to explore Warsaw. The Palace of Culture and Science, restaurants, cafés and the city’s main business addresses are all within a short walk.`,
    },
    neighborhood: {
      pl: "Biznesowe centrum Warszawy. W pobliżu stacja metra Rondo ONZ, a Pałac Kultury i Nauki jest w zasięgu krótkiego spaceru (orientacyjnie ok. 5 minut). W okolicy restauracje, kawiarnie i dobra komunikacja miejska. Apartament nie ma prywatnego miejsca parkingowego – w okolicy są parkingi publiczne, bez gwarancji wolnego miejsca.",
      en: "Warsaw’s central business district. Rondo ONZ metro station is close by, and the Palace of Culture and Science is a short walk away (roughly 5 minutes). Restaurants, cafés and good public transport are all around. The apartment has no private parking space – there are public car parks nearby, though a free space is not guaranteed.",
    },
    photos: GRZYBOWSKA_37_PHOTOS,
    priceFromPLN: 250, // cena orientacyjna
    details: {
      layout: "studio", // bez osobnej sypialni
      maxGuests: 4,
      bedrooms: null, // studio – brak osobnej sypialni
      beds: null, // TODO: liczba łóżek (opcjonalnie)
      bathrooms: null, // TODO: liczba łazienek (opcjonalnie)
      areaM2: 37,
      floor: null, // TODO: piętro (opcjonalnie)
    },
    // Bez klimatyzacji i bez prywatnego parkingu.
    amenities: ["wifi", "kitchen", "oven", "dishwasher", "washer", "hairDryer", "tv", "workspace", "sharedTerrace", "commonAreas"],
    links: {
      // Link wyszukiwania na podstawie adresu – można zastąpić linkiem do pinezki obiektu.
      googleMaps: googleMapsSearchUrl("Grzybowska 37, Warszawa"),
      googleMapsEmbed: null, // TODO
      airbnb: null, // TODO: link do oferty na Airbnb (opcjonalnie)
    },
    faq: [
      {
        question: { pl: "Czy apartament ma osobną sypialnię?", en: "Does the apartment have a separate bedroom?" },
        answer: {
          pl: "Nie. To studio o powierzchni 37 m² – bez osobnej sypialni – dla maksymalnie 4 osób.",
          en: "No. It is a 37 m² studio without a separate bedroom, for up to 4 guests.",
        },
      },
      {
        question: { pl: "Czy taras jest prywatny?", en: "Is the terrace private?" },
        answer: {
          pl: "Nie. Taras o powierzchni około 200 m² jest wspólny i ogólnodostępny – należy do części wspólnych budynku.",
          en: "No. The terrace of around 200 m² is a shared, communal space and part of the building’s common areas.",
        },
      },
      {
        question: { pl: "Czy w apartamencie jest klimatyzacja?", en: "Is there air conditioning?" },
        answer: {
          pl: "Nie, apartament Grzybowska 37 nie ma klimatyzacji.",
          en: "No, the Grzybowska 37 apartment does not have air conditioning.",
        },
      },
    ],
    availability: SHARED_AVAILABILITY,
  },
  "ludwiki-4a": {
    id: "ludwiki-4a",
    name: "Premium Blue Apartment Ludwiki 4A",
    shortName: "Ludwiki 4A",
    address: {
      street: "ul. Ludwiki 4A",
      postalCode: null, // TODO: kod pocztowy
      city: "Warszawa",
      district: "Wola",
    },
    description: {
      pl: `Elegancki apartament o powierzchni 44 m², położony na 8. piętrze nowoczesnego budynku na warszawskiej Woli.

Jego największym atutem jest wyjątkowy widok na panoramę centrum Warszawy, który można podziwiać bezpośrednio z prywatnego balkonu.

Apartament oferuje oddzielną sypialnię, komfortowy salon z aneksem kuchennym oraz klimatyzację. Starannie urządzone wnętrze z charakterystycznymi niebieskimi akcentami tworzy przyjemną przestrzeń zarówno na krótki, jak i dłuższy pobyt.

Zaledwie krótki spacer dzieli apartament od stacji metra Płocka, skąd można dotrzeć do centrum Warszawy w około 10 minut. W najbliższej okolicy znajdują się restauracje, bary, kawiarnie i sklepy.`,
      en: `An elegant 44 m² apartment on the 8th floor of a modern building in Warsaw’s Wola district.

Its greatest asset is the exceptional view of the Warsaw city-centre skyline, which you can take in straight from the private balcony.

The apartment has a separate bedroom, a comfortable living room with a kitchenette, and air conditioning. The thoughtfully furnished interior, with its signature blue accents, makes a pleasant space for both short and longer stays.

Płocka metro station is just a short walk away, and from there the city centre is about 10 minutes by metro. Restaurants, bars, cafés and shops are right on the doorstep.`,
    },
    neighborhood: {
      pl: "Warszawska Wola. Krótki spacer do stacji metra Płocka, skąd do centrum Warszawy dojedziesz w około 10 minut (czas orientacyjny). W okolicy restauracje, bary, kawiarnie i sklepy. Apartament nie ma prywatnego miejsca parkingowego – w okolicy są parkingi publiczne, bez gwarancji wolnego miejsca.",
      en: "Warsaw’s Wola district. A short walk to Płocka metro station, from where the city centre is about 10 minutes away (approximate time). Restaurants, bars, cafés and shops are nearby. The apartment has no private parking space – there are public car parks nearby, though a free space is not guaranteed.",
    },
    photos: LUDWIKI_4A_PHOTOS,
    priceFromPLN: 250, // cena orientacyjna
    details: {
      layout: "bedroomAndLiving", // oddzielna sypialnia + salon z aneksem kuchennym
      maxGuests: 4,
      bedrooms: null, // ujęte w polu layout (1 osobna sypialnia)
      beds: null, // TODO: liczba łóżek (opcjonalnie)
      bathrooms: null, // TODO: liczba łazienek (opcjonalnie)
      areaM2: 44,
      floor: 8,
    },
    // Bez prywatnego parkingu.
    amenities: ["wifi", "airConditioning", "kitchen", "oven", "dishwasher", "washer", "hairDryer", "tv", "privateBalcony", "cityView", "playground"],
    links: {
      googleMaps: googleMapsSearchUrl("Ludwiki 4A, Warszawa"),
      googleMapsEmbed: null, // TODO
      airbnb: null, // TODO: link do oferty na Airbnb (opcjonalnie)
    },
    faq: [
      {
        question: { pl: "Czy balkon jest prywatny?", en: "Is the balcony private?" },
        answer: {
          pl: "Tak. Prywatny balkon jest dostępny bezpośrednio z apartamentu, bez dodatkowej opłaty. Z balkonu widać panoramę centrum Warszawy.",
          en: "Yes. The private balcony is accessed directly from the apartment at no extra charge and looks out over the Warsaw city-centre skyline.",
        },
      },
      {
        question: { pl: "Na którym piętrze jest apartament?", en: "Which floor is the apartment on?" },
        answer: {
          pl: "Apartament znajduje się na 8. piętrze.",
          en: "The apartment is on the 8th floor.",
        },
      },
    ],
    availability: SHARED_AVAILABILITY,
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
