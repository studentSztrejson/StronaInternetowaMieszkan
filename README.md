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

## Jak wymienić zdjęcia apartamentu w przyszłości

Galeria czyta zdjęcia **wyłącznie z listy w [lib/apartments.ts](lib/apartments.ts)** (`GRZYBOWSKA_37_PHOTOS`, `LUDWIKI_4A_PHOTOS`). Nie skanuje folderów, więc wymiana zdjęć nie wymaga zmian w komponentach.

Obecne zdjęcia **Grzybowskiej 37 są tymczasowe** (niska rozdzielczość, pionowe) – do zastąpienia profesjonalną sesją.

### 1. Gdzie umieścić nowe fotografie

- **Oryginały** trzymaj **poza projektem**, np. `../photo-originals-backup/<id>/` (obok folderu projektu). Nie wrzucaj ich do `public/` – wszystko w `public/` jest publicznie dostępne.
- **Wersje do publikacji** (WebP) trafiają do `public/apartments/<id>/` – robi to skrypt z kroku 2.
- `<id>` to `grzybowska-37` lub `ludwiki-4a`.
- Zalecane: zdjęcia **poziome** (3:2 lub 4:3), min. 2000 px szerokości, 15–25 sztuk.

### 2. Jak je zoptymalizować

```bash
node scripts/optimize-photos.mjs grzybowska-37 ../photo-originals-backup/grzybowska-37-nowa-sesja
```

Skrypt dla każdego zdjęcia: konwertuje do WebP (jakość 82), zmniejsza dłuższy bok do maks. 2400 px (nigdy nie powiększa), zachowuje proporcje i kolorystykę, **usuwa metadane EXIF/XMP/IPTC (w tym GPS)** i sprawdza, że żadne nie zostały. Na końcu wypisuje gotowe wpisy z wymiarami do wklejenia w `lib/apartments.ts`. Skrypt niczego nie usuwa.

Next.js (`next/image`) dodatkowo sam serwuje każdemu urządzeniu wersję w odpowiednim rozmiarze.

### 3. Jak zmienić kolejność

Kolejność wpisów na liście = kolejność w galerii. Przenieś linię wyżej lub niżej. Na desktopie w siatce widać zdjęcia 1–5, pozostałe w pełnoekranowym podglądzie.

### 4. Jak ustawić zdjęcie główne

Zdjęciem głównym jest **pierwszy wpis** na liście – przenieś wybrane zdjęcie na początek. Najlepiej sprawdza się najbardziej reprezentacyjne ujęcie salonu lub całego wnętrza.

Każdy wpis ma też opis `alt` po polsku i angielsku – krótko, co widać na zdjęciu (dostępność i SEO).

### 5. Jak usunąć stare zdjęcia

1. Usuń ich wpisy z listy w `lib/apartments.ts` (przy wymianie całej sesji – zastąp całą listę).
2. Usuń odpowiadające pliki `.webp` z `public/apartments/<id>/`.
3. Sprawdź, że żaden wpis nie wskazuje na nieistniejący plik (krok 6 – uszkodzone zdjęcie widać od razu jako pusty kafelek).

### 6. Jak sprawdzić poprawność

```bash
npx tsc --noEmit && npm run lint && npm run build && npm run start
```

Następnie na http://localhost:3000/pl/<id> sprawdź: siatkę 1 + 4 zdjęć, przycisk „Pokaż wszystkie zdjęcia (liczba)”, podgląd pełnoekranowy (strzałki ← →, Home/End, Escape), miniatury, widok na telefonie (karuzela) i przełączenie na drugi apartament.

### Wymiana sesji jednym poleceniem dla Claude Code

> Wymień wszystkie zdjęcia apartamentu Grzybowska 37 na nową sesję z folderu `../photo-originals-backup/grzybowska-37-nowa-sesja`. Postępuj według sekcji „Jak wymienić zdjęcia apartamentu w przyszłości” w README: zoptymalizuj zdjęcia skryptem, zaproponuj kolejność od najbardziej reprezentacyjnego wnętrza, napisz opisy alt PL/EN, zastąp listę w lib/apartments.ts, usuń stare pliki .webp Grzybowskiej, przetestuj galerię i nie rób commita.

## Uzupełnianie danych

Lista wszystkich brakujących informacji: [DATA_TO_FILL.md](DATA_TO_FILL.md).
Kontekst projektu i zasady dla kolejnych prac: [CLAUDE.md](CLAUDE.md).
