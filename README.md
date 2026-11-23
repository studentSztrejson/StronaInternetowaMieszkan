# Premium Blue Apartments

Strona internetowa marki **Premium Blue Apartments**: dwa apartamenty na wynajem krótkoterminowy w Warszawie (Grzybowska 37 i Ludwiki 4A). Jedna strona z przełącznikiem apartamentów i języków (PL / EN).

Stack: Next.js 16 (App Router, Cache Components), React 19, TypeScript, Tailwind CSS 4. Bez backendu i bez dodatkowych bibliotek.

## Wymagania

- Node.js 20.9 lub nowszy (testowane na Node 26)
- npm

## Instalacja

```bash
npm install
```

## Uruchomienie

Tryb deweloperski (z automatycznym odświeżaniem):

```bash
npm run dev
```

Otwórz http://localhost:3000. Adres `/` przekierowuje na `/pl/grzybowska-37`.

Wersja produkcyjna lokalnie:

```bash
npm run build
npm run start
```

## Adresy URL

Wybrany język i apartament są zapisane w ścieżce, więc link do konkretnego widoku można skopiować:

| Adres                | Widok                         |
| -------------------- | ----------------------------- |
| `/pl/grzybowska-37`  | polski, Grzybowska 37         |
| `/pl/ludwiki-4a`     | polski, Ludwiki 4A            |
| `/en/grzybowska-37`  | angielski, Grzybowska 37      |
| `/en/ludwiki-4a`     | angielski, Ludwiki 4A         |

Sekcje mają kotwice, np. `/pl/ludwiki-4a#location`.

## Kontrola jakości

```bash
npx next typegen   # generuje typy tras (PageProps / LayoutProps), potrzebne przed tsc
npx tsc --noEmit   # TypeScript
npm run lint       # ESLint
npm run build      # kompilacja produkcyjna
```

## Struktura projektu

```
app/
  [lang]/layout.tsx               root layout (html lang, czcionka, metadane)
  [lang]/[apartment]/page.tsx     strona apartamentu – składa wszystkie sekcje
  [lang]/not-found.tsx            404 dla nieznanego apartamentu
  global-not-found.tsx            404 dla nieznanych adresów
  globals.css                     paleta kolorów, animacje, style bazowe
components/
  site-header.tsx                 nagłówek, menu mobilne, przełącznik PL/EN
  gallery/                        siatka zdjęć + pełnoekranowy podgląd (lightbox)
  sections/                       sekcje strony (hero, udogodnienia, lokalizacja, …)
  map-panel.tsx                   panel mapy (ładowany po kliknięciu)
  icons.tsx, amenity-icon.tsx     ikony SVG
  ui.tsx                          przyciski, sekcje, znaczniki „do uzupełnienia”
lib/
  apartments.ts                   ← DANE APARTAMENTÓW
  site.ts                         ← DANE KONTAKTOWE, FAQ, REGULAMIN
  amenities.ts                    katalog udogodnień (PL/EN)
  i18n/pl.ts, i18n/en.ts          teksty interfejsu
public/apartments/<id>/           miejsce na zdjęcia
```

## Uzupełnianie danych

Lista wszystkich brakujących informacji: [DATA_TO_FILL.md](DATA_TO_FILL.md).
Kontekst projektu i zasady dla kolejnych prac: [CLAUDE.md](CLAUDE.md).
