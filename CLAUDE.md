@AGENTS.md

# Premium Blue Apartments – kontekst projektu

Strona marki oferującej dwa apartamenty na wynajem krótkoterminowy w Warszawie:
- **Premium Blue Apartment Grzybowska 37** (`grzybowska-37`)
- **Premium Blue Apartment Ludwiki 4A** (`ludwiki-4a`)

To jedna strona z przełącznikiem apartamentów, a nie dwa serwisy. Właściciel komunikuje się po polsku.

## Zasady nadrzędne

1. **Nie wymyślaj danych.** Ceny, oceny, liczba opinii, metraż, udogodnienia, zasady pobytu, warunki anulowania, dane kontaktowe i zdjęcia muszą pochodzić od właściciela. Brakujące pola zostają `null` / `[]` z komentarzem `// TODO`, a interfejs pokazuje neutralny stan „do uzupełnienia / wkrótce”.
2. **Nie kopiuj treści opinii** z Booking.com ani innych serwisów – pokazujemy tylko zweryfikowaną ocenę, liczbę opinii i link do oferty. Oceny Booking.com są aktualizowane ręcznie (`lib/reviews.ts` → `BOOKING`, z datą `updatedAt`); niezweryfikowana ocena zostaje `null` i nie jest wyświetlana (bez zer i pustych gwiazdek). Nie scrapuj Booking.com. Opinie tekstowe tylko w `FEATURED` z potwierdzonym `publicationPermission`. Nie dodawaj fikcyjnych opinii, przykładowych ocen Google, Place ID ani kluczy API.
3. **Fakty o apartamentach:** Grzybowska 37 to **studio** (bez osobnej sypialni, bez klimatyzacji, taras ~200 m² jest **wspólny**). Ludwiki 4A ma osobną sypialnię, klimatyzację i **prywatny** balkon. Żaden apartament nie ma prywatnego parkingu (parking publiczny tylko jako informacja w lokalizacji/FAQ). Cena „od 250 PLN” jest orientacyjna. Hubert prowadzi markę; formalnym wynajmującym jest Zbigniew Woźniakowski (stopka). Nie dopisuj zasad anulowania, płatności ani kaucji bez potwierdzenia właściciela.
4. Placeholdery zdjęć muszą być wyraźnie oznaczone jako tymczasowe.
5. Nie dodawaj bibliotek bez wyraźnej potrzeby. Ikony to własne SVG w `components/icons.tsx`, tłumaczenia to zwykłe obiekty TS.
6. Ta wersja Next.js (16.4) różni się od starszych – przed zmianami przeczytaj dokumentację w `node_modules/next/dist/docs/` (patrz AGENTS.md).

## Architektura

- **Routing:** `app/[lang]/[apartment]/page.tsx`. Język i apartament są w ścieżce (`/pl/grzybowska-37`). Root layout jest w `app/[lang]/layout.tsx` (poprawny `<html lang>`). `/` i `/pl`, `/en` przekierowują na Grzybowską (`redirects()` w `next.config.ts`).
- **Statyczne generowanie:** `generateStaticParams` w layoucie (języki) i stronie (apartamenty) → 4 prerenderowane strony. Projekt ma włączone `cacheComponents` – nie używaj `searchParams`, `cookies()`, `new Date()` itp. w renderze bez `<Suspense>`, bo strony przestaną być statyczne.
- **Przełączniki** to zwykłe `<Link scroll={false}>`: zmiana apartamentu zachowuje język, zmiana języka zachowuje apartament, pozycja przewijania zostaje.
- **Dane:** `lib/apartments.ts` (typowany moduł obu apartamentów), `lib/site.ts` (kontakt, firma, FAQ ogólne, struktura regulaminu), `lib/amenities.ts` (katalog udogodnień z etykietami PL/EN), `lib/reviews.ts` (opinie: Booking.com ręcznie, Google Maps – przygotowanie pod Places API (New), opinie tekstowe z prawem do publikacji). Ikony udogodnień: `components/amenity-icon.tsx`.
- **Opinie:** `components/sections/reviews.tsx` (sekcja „Opinie naszych gości”: karta Booking.com + karta Google pokazywana dopiero przy wizytówce/danych), `components/reviews/rating-summary.tsx` (skrót ocen pod nazwą apartamentu w Overview, link do `#reviews`), `platform-card.tsx`, `review-card.tsx` (karta opinii z „Rozwiń/Zwiń”). Średnich Booking (skala 10) i Google (skala 5) nie łączymy. `getGoogleReviews()` jest obecnie stubem zwracającym `null` – integracja w osobnym etapie (wymagania w DATA_TO_FILL.md); klucz API tylko w zmiennej środowiskowej serwera, z buforowaniem, bez trwałego zapisu treści recenzji.
- **i18n:** `lib/i18n/pl.ts` definiuje typ `Dictionary`; `en.ts` musi mieć identyczne klucze (wymusza to TypeScript). Znaczniki `{name}` podmienia `t()` z `lib/format.ts`; liczba mnoga przez `plural()` (Intl.PluralRules). Treść zależna od apartamentu (opis, FAQ) jest w danych jako `Localized` (`{ pl, en }`).
- **Komponenty:** sekcje w `components/sections/*` są komponentami serwerowymi i dostają `{ lang, dict, apartment }`. Komponenty klienckie: `site-header.tsx` (menu mobilne), `gallery/gallery.tsx` + `gallery/lightbox.tsx`, `map-panel.tsx`.
- **Galeria:** desktop – siatka 1 duże + 4 małe (układ dopasowuje się do liczby zdjęć); telefon – karuzela ze scroll-snap. Podgląd to natywny `<dialog>` (`showModal`): pułapka fokusu, Escape, ←/→/Home/End, przewijanie gestem, miniatury, licznik `aria-live`, powrót fokusu na kliknięty kafelek.
- **Zdjęcia:** jedynym źródłem jest lista `*_PHOTOS` w `lib/apartments.ts` (kolejność = kolejność w galerii, pierwszy wpis = zdjęcie główne). Publikujemy tylko WebP w `public/apartments/<id>/`, przygotowane skryptem `scripts/optimize-photos.mjs` (sharp z zależności Next.js; WebP q82, maks. 2400 px, bez powiększania i przycinania, bez korekty kolorów, usuwa EXIF/XMP/IPTC). Oryginały trzymamy poza projektem (`../photo-originals-backup/`); JPG/PNG/HEIC w `public/apartments` są w `.gitignore`. Galeria nie skanuje folderów. Wymiana sesji – procedura w README („Jak wymienić zdjęcia apartamentu w przyszłości”). Zdjęcia Grzybowskiej 37 są tymczasowe. Zdjęcie główne dostaje `fetchPriority="high"`, nie `preload` – galeria renderuje wariant desktopowy i mobilny jednocześnie, a `preload` pobierałby je dwa razy.
- **Mapa:** link do Google Maps generowany z adresu; iframe ładuje się dopiero po kliknięciu i tylko gdy `links.googleMapsEmbed` jest uzupełnione.

## Design

- Paleta w `app/globals.css` (`@theme`): `ink` (grafit), `graphite`, `muted`, `line`, `mist` (bardzo jasny szary), `accent` (stonowany niebieski #2d5b88), `accent-soft`. Używaj tych tokenów zamiast dowolnych kolorów.
- Czcionka Geist (`latin-ext` – polskie znaki). Nagłówki `font-medium tracking-tight`, etykiety sekcji: `Eyebrow` (uppercase, rozstrzelone).
- Sekcje przez `<Section>` z `components/ui.tsx`; przyciski przez `buttonClasses()`. Uwaga: aby ukryć przycisk responsywnie, używaj wariantów typu `max-sm:hidden` – samo `hidden` przegrywa z `inline-flex` z klas bazowych.
- Animacje oszczędne: `motion-safe:animate-fade-up` przy zmianie apartamentu; `prefers-reduced-motion` jest respektowane globalnie.
- Bez nadmiaru cieni i gradientów.

## Dostępność – obowiązkowe

- Każdy przycisk z samą ikoną ma `aria-label`; ikony mają `aria-hidden`.
- Linki zewnętrzne przez `<ExternalLink>` (dopisek „otwiera się w nowej karcie” dla czytników).
- Aktywny apartament / język: `aria-current`.
- Link „Przejdź do treści”, `scroll-padding-top` pod przyklejonym nagłówkiem.
- W lightboxie nie używaj atrybutu `disabled` na przyciskach nawigacji (fokus uciekałby z dialogu) – używamy `aria-disabled`.

## Poza zakresem etapu 1 (planowane później)

Wysyłanie formularza, kalendarz i blokowanie dat, synchronizacja iCal z Booking.com / Airbnb (pola w `availability` już są), panel administracyjny, płatności.

## Znane zachowania

- Nieznany apartament (np. `/pl/xyz`) wyświetla stronę 404 z `noindex`, ale ze statusem HTTP 200 – przy Partial Prerendering `notFound()` jest wywoływane po rozpoczęciu strumieniowania (zachowanie opisane w dokumentacji Next.js). Nieznany język i nieznane ścieżki zwracają 404.

## Weryfikacja zmian

`npx next typegen && npx tsc --noEmit`, `npm run lint`, `npm run build`. Sprawdzaj widok na szerokości 320–390 px (brak przewijania w poziomie).
