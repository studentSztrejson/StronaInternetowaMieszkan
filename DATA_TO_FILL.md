# Dane do uzupełnienia

Lista informacji, których **nadal brakuje**. Dopóki pole jest puste, strona pokazuje neutralny stan „wkrótce / do uzupełnienia” albo pomija daną informację – nic nie jest zmyślone.

Dane już wdrożone (opisy PL/EN, metraż, liczba gości, ceny „od”, udogodnienia, kontakt, zasady pobytu, „O nas”, dane wynajmującego) znajdują się w `lib/apartments.ts`, `lib/site.ts` i `lib/i18n/`. Oceny i linki do opinii: `lib/reviews.ts`.

Każdą pozycję można przesłać w dowolnej formie, a zostanie wpisana do kodu.

---

## 1. Opinie gości – `lib/reviews.ts`

### Do weryfikacji przed publikacją

- [ ] **Ocena Grzybowska 37 na Booking.com** – podana wartość 9,8/10 i 17 opinii wymaga ponownego sprawdzenia (automatyczne odczytanie Booking.com nie jest możliwe). Do tego czasu strona pokazuje tylko zachętę do sprawdzenia opinii na Booking.com – bez liczb.

### Jak ręcznie zaktualizować ocenę Booking.com?

Wszystkie oceny Booking.com są w **jednym miejscu**: plik `lib/reviews.ts`, blok `const BOOKING` (oznaczony nagłówkiem „BOOKING.COM – JEDYNE MIEJSCE DO RĘCZNEJ AKTUALIZACJI OCEN”).

1. Otwórz ofertę apartamentu na Booking.com i odczytaj ocenę oraz liczbę opinii.
2. W `lib/reviews.ts` znajdź wpis apartamentu (`"grzybowska-37"` lub `"ludwiki-4a"`) i zmień trzy pola:

   ```ts
   "ludwiki-4a": {
     url: "https://www.booking.com/hotel/pl/premium-blue-apartment-ludwiki.pl.html",
     rating: 10,              // ocena w skali 10, z kropką: 9.8 (nie 9,8)
     reviewCount: 3,          // liczba opinii
     updatedAt: "2026-11-23", // data sprawdzenia: RRRR-MM-DD
   },
   ```

3. Zapisz plik. Zmiana pojawi się automatycznie w skrócie ocen pod nazwą apartamentu i w sekcji „Opinie naszych gości” (data jako „Stan na …”).
4. Aby **ukryć** ocenę (np. do czasu weryfikacji), wpisz `rating: null`, `reviewCount: null`, `updatedAt: null`.

Oceny nie odświeżają się automatycznie – sprawdzaj je co jakiś czas. Stan obecny: Ludwiki 4A 10/10, 3 opinie (23.11.2026); Grzybowska 37 – do weryfikacji (dla Grzybowskiej: `rating: 9.8, reviewCount: 17` po potwierdzeniu).

### Opinie tekstowe (opcjonalnie)

Wybrane opinie tekstowe można dodać ręcznie w `lib/reviews.ts` → `const FEATURED` – **wyłącznie** jeśli masz prawo lub zgodę na ich publikację (pole `publicationPermission` z opisem zgody). Nie kopiuj komentarzy z Booking.com bez takiej zgody. Dopóki lista jest pusta, sekcja pokazuje tylko oceny i przyciski do oryginalnych opinii.

### Google Maps – przyszła integracja (jeszcze nie uruchomiona)

Przygotowane są typy danych, karta Google w sekcji opinii, miejsce w skrócie ocen oraz karta pojedynczej recenzji. Dopóki nie ma wizytówek, nic związanego z Google nie jest wyświetlane i strona nie wykonuje żadnych zapytań do Google.

Potrzebne w przyszłości:

1. [ ] Zweryfikowane wizytówki Google Maps (Profil Firmy w Google) dla obu apartamentów.
2. [ ] **Place ID** każdej wizytówki → `lib/reviews.ts`, blok `const GOOGLE`, pole `placeId`.
3. [ ] **Link Google Maps** do wizytówki → to samo miejsce, pole `mapsUrl` (już samo to pokaże kartę Google z przyciskiem „Zobacz opinie w Google Maps”).
4. [ ] Projekt Google Cloud z włączonym **Places API (New)** i rozliczeniami.
5. [ ] **Klucz API** ograniczony do Places API i serwera strony, z limitami dziennymi. Klucz trafia wyłącznie do zmiennej środowiskowej na serwerze (np. `GOOGLE_PLACES_API_KEY` w `.env.local` – plik jest w `.gitignore`), **nigdy do kodu ani repozytorium**.
6. [ ] Weryfikacja aktualnych zasad Google Maps Platform (EOG / Polska): wymagane oznaczenia „Google Maps” i atrybucje autorów, linki do oryginalnych recenzji, zasady przechowywania i buforowania danych, koszty i limity wywołań.

Uwagi do integracji (osobny, niewielki etap):
- Pobieranie po stronie serwera w funkcji `getGoogleReviews()` w `lib/reviews.ts`, z buforowaniem (`use cache` + `cacheLife`) – bez zapytania przy każdym wyświetleniu strony.
- API zwraca tylko ograniczoną liczbę recenzji (nie wszystkie) – nie należy obiecywać pełnej listy.
- Treści recenzji Google nie są zapisywane w plikach projektu ani w bazie danych.
- Oceny Booking.com (skala 10) i Google (skala 5) są pokazywane osobno – nie łączymy ich w jedną średnią.

## 2. Regulamin i FAQ – `lib/site.ts`

Nieustalone kwestie (strona pokazuje „Treść w przygotowaniu” / „Odpowiedź zostanie wkrótce uzupełniona”):

- [ ] Rezerwacja i potwierdzenie – jak wygląda potwierdzenie rezerwacji bezpośredniej
- [ ] Płatności – formy i terminy płatności, ewentualna kaucja
- [ ] Anulowanie i zmiany rezerwacji
- [ ] Odpowiedzialność i szkody
- [ ] Ochrona danych osobowych (RODO) – polityka prywatności
- [ ] Postanowienia końcowe
- [ ] FAQ: sposób przekazania kluczy
- [ ] FAQ: faktury (czy są wystawiane)
- [ ] Opcjonalnie: cisza nocna, minimalna długość pobytu

Regulamin i polityka prywatności powinny zostać zweryfikowane prawnie.

## 3. Dane apartamentów – `lib/apartments.ts`

- [ ] Kody pocztowe obu adresów
- [ ] Opcjonalnie: liczba łóżek i łazienek (obie)
- [ ] Opcjonalnie: piętro apartamentu Grzybowska 37
- [ ] Opcjonalnie: linki do ofert na Airbnb
- [ ] Opcjonalnie: kod mapy do osadzenia – Google Maps → Udostępnij → Umieść mapę → adres z `src="..."` (pole `googleMapsEmbed`); bez niego działa przycisk „Otwórz w Google Maps”

## 4. Zdjęcia

- [x] **Ludwiki 4A** – 19 zdjęć z profesjonalnej sesji (gotowe).
- [ ] **Grzybowska 37** – 13 zdjęć **tymczasowych** (576×768 px, pionowe). Potrzebna profesjonalna sesja: najlepiej 15–25 zdjęć **poziomych**, min. 2000 px szerokości.

Instrukcja wymiany zdjęć: [README.md → „Jak wymienić zdjęcia apartamentu w przyszłości”](README.md#jak-wymienić-zdjęcia-apartamentu-w-przyszłości).

## 5. Pozostałe

- [ ] `SITE.url` w `lib/site.ts` – docelowa domena strony (metadane, SEO)
- [ ] Opcjonalnie: adres wynajmującego w stopce (`company.address`) – tylko jeśli ma być publikowany
- [ ] Logo (obecnie tymczasowy znak „PB”), favicon, grafika do udostępnień w mediach społecznościowych
- [ ] Kolejne etapy: linki iCal z Booking.com / Airbnb (kalendarz dostępności)
