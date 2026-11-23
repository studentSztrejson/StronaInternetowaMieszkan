import type { ApartmentId } from "@/lib/apartments";

/*
 * ============================================================================
 *  OPINIE GOŚCI – dwa niezależne źródła:
 *
 *  1. Booking.com  – dane wpisywane RĘCZNIE (blok BOOKING poniżej).
 *  2. Google Maps  – w przyszłości dane z oficjalnego Google Places API (New).
 *                    Na razie brak wizytówek → sekcja Google jest ukryta.
 *
 *  Średnich z obu platform NIE łączymy – każda ocena jest pokazywana osobno,
 *  we własnej skali (Booking 0–10, Google 1–5).
 * ============================================================================
 */

/* -------------------------------------------------------------------------- */
/*  Typy                                                                      */
/* -------------------------------------------------------------------------- */

/** Ocena z Booking.com – aktualizowana ręcznie przez właściciela. */
export interface BookingReviews {
  /** Link do oferty apartamentu na Booking.com. */
  url: string;
  /** Ocena w skali 0–10. null = brak zweryfikowanej oceny (nie jest wyświetlana). */
  rating: number | null;
  /** Liczba opinii. null = nie wyświetlamy liczby. */
  reviewCount: number | null;
  /** Data ostatniego ręcznego sprawdzenia w formacie RRRR-MM-DD, np. "2026-11-23". */
  updatedAt: string | null;
}

/** Konfiguracja wizytówki Google Maps – wpisywana ręcznie po utworzeniu wizytówki. */
export interface GoogleListing {
  /** Place ID wizytówki (Google Places API). null = wizytówka jeszcze nie istnieje. */
  placeId: string | null;
  /** Publiczny link do wizytówki / opinii w Google Maps. */
  mapsUrl: string | null;
}

/**
 * Pojedyncza recenzja Google – kształt zgodny z obiektem `Review` z Google Places API (New).
 * Takie dane NIE są zapisywane w plikach projektu – w przyszłości będą pobierane przez API
 * i przekazywane do komponentów w czasie działania strony (z buforowaniem zgodnym z warunkami Google).
 */
export interface GoogleReview {
  /** Identyfikator zasobu recenzji z API (`name`). */
  id: string;
  /** Ocena recenzji 1–5. */
  rating: number;
  text: string | null;
  languageCode: string | null;
  /** Atrybucja autora – wymagana przy wyświetlaniu. */
  author: {
    displayName: string;
    /** Link do profilu autora w Google Maps. */
    uri: string | null;
    photoUri: string | null;
  };
  /** Data publikacji (ISO 8601). */
  publishTime: string | null;
  /** Link do oryginalnej recenzji w Google Maps. */
  googleMapsUri: string | null;
}

/** Dane Google dla apartamentu – w przyszłości wynik zapytania do Places API (New). */
export interface GooglePlaceReviews {
  /** Średnia ocena 1–5. */
  rating: number | null;
  /** Liczba ocen (`userRatingCount`). */
  reviewCount: number | null;
  /** Recenzje zwrócone przez API – API zwraca tylko ograniczoną liczbę, nie wszystkie. */
  reviews: GoogleReview[];
  /** Link do wszystkich opinii w Google Maps. */
  mapsUrl: string | null;
  /** Moment pobrania danych (ISO 8601). */
  fetchedAt: string;
}

/**
 * Opinia tekstowa dodana RĘCZNIE – tylko gdy właściciel ma prawo/zgodę na jej publikację.
 * Nigdy nie kopiuj opinii z Booking.com ani Google bez takiego uprawnienia.
 */
export interface ManualReview {
  id: string;
  /** Treść w oryginalnym języku opinii. */
  text: string;
  /** Język treści, np. "pl" lub "en" (dla atrybutu lang). */
  language: string;
  /** Imię / nazwa autora – tylko jeśli jej użycie jest dozwolone. */
  authorName: string | null;
  /** Data opinii, RRRR-MM-DD. */
  date: string | null;
  source: "booking" | "google" | "direct";
  /** Ocena w skali źródła (Booking 0–10, Google 1–5). */
  rating: number | null;
  /** Link do oryginalnej opinii. */
  url: string | null;
  /** Potwierdzenie prawa do publikacji – musi być wpisane świadomie. */
  publicationPermission: {
    confirmed: true;
    /** Skąd pochodzi zgoda, np. "zgoda gościa e-mailem z 2026-12-01". */
    note: string;
  };
}

/* -------------------------------------------------------------------------- */
/*  BOOKING.COM – JEDYNE MIEJSCE DO RĘCZNEJ AKTUALIZACJI OCEN                  */
/*  Instrukcja: DATA_TO_FILL.md → „Jak ręcznie zaktualizować ocenę Booking.com?” */
/* -------------------------------------------------------------------------- */

const BOOKING: Record<ApartmentId, BookingReviews> = {
  "grzybowska-37": {
    url: "https://www.booking.com/hotel/pl/premium-blue-apartment-grzybowska-37.pl.html",
    // TODO: właściciel podał 9,8/10 i 17 opinii – NIE publikujemy przed ponownym sprawdzeniem.
    // Po sprawdzeniu wpisz: rating: 9.8, reviewCount: 17, updatedAt: "RRRR-MM-DD".
    rating: null,
    reviewCount: null,
    updatedAt: null,
  },
  "ludwiki-4a": {
    url: "https://www.booking.com/hotel/pl/premium-blue-apartment-ludwiki.pl.html",
    rating: 10,
    reviewCount: 3,
    updatedAt: "2026-11-23",
  },
};

/* -------------------------------------------------------------------------- */
/*  GOOGLE MAPS – wizytówki jeszcze nie istnieją                               */
/* -------------------------------------------------------------------------- */

const GOOGLE: Record<ApartmentId, GoogleListing> = {
  "grzybowska-37": { placeId: null, mapsUrl: null }, // TODO: po utworzeniu wizytówki
  "ludwiki-4a": { placeId: null, mapsUrl: null }, // TODO: po utworzeniu wizytówki
};

/* -------------------------------------------------------------------------- */
/*  OPINIE TEKSTOWE DODAWANE RĘCZNIE (tylko z prawem do publikacji)            */
/* -------------------------------------------------------------------------- */

const FEATURED: Record<ApartmentId, ManualReview[]> = {
  "grzybowska-37": [],
  "ludwiki-4a": [],
};

/* -------------------------------------------------------------------------- */
/*  Dostęp do danych                                                          */
/* -------------------------------------------------------------------------- */

/**
 * Dane Google dla apartamentu.
 *
 * ETAP PRZYGOTOWAWCZY: nie wykonuje żadnych zapytań i zawsze zwraca null.
 * Przy integracji (patrz DATA_TO_FILL.md → „Google Maps – przyszła integracja”)
 * w tym miejscu pojawi się wywołanie Places API (New) po stronie serwera,
 * z kluczem z zmiennej środowiskowej i buforowaniem (`use cache` + `cacheLife`),
 * tak aby API NIE było odpytywane przy każdym wyświetleniu strony.
 */
export function getGoogleReviews(listing: GoogleListing): GooglePlaceReviews | null {
  if (!listing.placeId) return null;
  return null; // TODO: integracja z Google Places API (New) w osobnym etapie.
}

export interface ApartmentReviews {
  booking: BookingReviews;
  google: GooglePlaceReviews | null;
  /** Link do wizytówki Google, nawet gdy dane z API nie są jeszcze dostępne. */
  googleMapsUrl: string | null;
  featured: ManualReview[];
}

export function getApartmentReviews(id: ApartmentId): ApartmentReviews {
  const google = getGoogleReviews(GOOGLE[id]);
  return {
    booking: BOOKING[id],
    google,
    googleMapsUrl: google?.mapsUrl ?? GOOGLE[id].mapsUrl,
    featured: FEATURED[id].filter((review) => review.publicationPermission.confirmed === true),
  };
}

/** Czy Google ma coś do pokazania publicznie (ocenę lub przynajmniej link do wizytówki). */
export function hasGoogleContent(reviews: ApartmentReviews): boolean {
  return (reviews.google?.rating ?? null) !== null || reviews.googleMapsUrl !== null;
}
