# Dane do uzupełnienia

Lista prawdziwych informacji potrzebnych do ukończenia strony. Dopóki pole jest puste, strona pokazuje neutralny stan „wkrótce / do uzupełnienia” – nic nie jest zmyślone.

Każdą pozycję można przesłać w dowolnej formie (np. e-mail, dokument), a zostanie wpisana do kodu. Gdzie wpisać dane samodzielnie – podano przy każdej sekcji.

---

## 1. Kontakt i dane firmy – `lib/site.ts`

| Pole | Opis | Uwagi |
| --- | --- | --- |
| `contact.email` | Adres e-mail do rezerwacji | Uruchamia przyciski „E-mail” i „Zapytaj o rezerwację” |
| `contact.phone` | Numer telefonu | Format międzynarodowy, np. `+48 600 000 000` |
| `contact.whatsapp` | Numer WhatsApp | Może być taki sam jak telefon |
| `company.legalName` | Nazwa firmy lub właściciela | Wyświetlana w stopce |
| `company.taxId` | NIP | Jeśli dotyczy |
| `company.address` | Adres rejestrowy | Jeśli ma być w stopce |
| `url` | Docelowa domena strony | np. `https://premiumblue.pl` – do metadanych i SEO |

## 2. Dane każdego apartamentu – `lib/apartments.ts`

Potrzebne **osobno dla Grzybowska 37 i Ludwiki 4A**:

### Podstawowe
- [ ] Kod pocztowy
- [ ] Dzielnica (opcjonalnie)
- [ ] Opis apartamentu **PL** (1–3 akapity; akapity oddziel pustą linią)
- [ ] Opis apartamentu **EN**
- [ ] Opis okolicy PL i EN (np. co jest w pobliżu, komunikacja)
- [ ] Cena „od” w PLN za noc (lub decyzja: „cena na zapytanie”)

### Parametry
- [ ] Maksymalna liczba gości
- [ ] Liczba sypialni
- [ ] Liczba łóżek
- [ ] Liczba łazienek
- [ ] Powierzchnia w m²

### Udogodnienia
Wybierz z listy (pole `amenities`), np. `["wifi", "kitchen", "airConditioning"]`:

| Klucz | PL | EN |
| --- | --- | --- |
| `wifi` | Szybkie Wi‑Fi | Fast Wi‑Fi |
| `kitchen` | W pełni wyposażona kuchnia | Fully equipped kitchen |
| `coffeeMachine` | Ekspres do kawy | Coffee machine |
| `airConditioning` | Klimatyzacja | Air conditioning |
| `heating` | Ogrzewanie | Heating |
| `washer` | Pralka | Washing machine |
| `tv` | Telewizor | TV |
| `workspace` | Miejsce do pracy | Dedicated workspace |
| `elevator` | Winda | Elevator |
| `parking` | Parking | Parking |
| `balcony` | Balkon | Balcony |
| `selfCheckIn` | Samodzielne zameldowanie | Self check‑in |

Brakuje czegoś? Podaj nazwę – zostanie dodana do katalogu (`lib/amenities.ts`) razem z ikoną.

### Linki
- [ ] Link do oferty na **Booking.com**
- [ ] Link do oferty na **Airbnb** (opcjonalnie)
- [ ] Link do pinezki w Google Maps (opcjonalnie – obecnie link wyszukuje adres)
- [ ] Kod mapy do osadzenia: Google Maps → Udostępnij → Umieść mapę → skopiuj sam adres z `src="..."` (pole `googleMapsEmbed`)

### Ocena (tylko zweryfikowana, z Booking.com)
- [ ] Ocena (np. `9.1`)
- [ ] Liczba opinii
- [ ] Data sprawdzenia (np. `2026-11-18`)

Treść opinii nie będzie kopiowana – strona pokazuje tylko ocenę i link do oferty.

### FAQ specyficzne dla apartamentu (opcjonalnie)
- [ ] Pytania i odpowiedzi dotyczące tylko tego obiektu (PL i EN), np. dojazd, piętro, parking pod budynkiem.

### Dane na przyszłe etapy (kalendarz i synchronizacja)
- [ ] Link iCal z Booking.com
- [ ] Link iCal z Airbnb
- [ ] Godzina zameldowania od / wymeldowania do
- [ ] Minimalna liczba nocy

## 3. Zdjęcia

Dla każdego apartamentu: najlepiej **8–20 zdjęć**, poziomych, min. **2000 px** szerokości, JPG lub WebP. Pierwsze zdjęcie = zdjęcie główne.

1. Skopiuj pliki do folderu:
   - `public/apartments/grzybowska-37/`
   - `public/apartments/ludwiki-4a/`
2. Dodaj je w `lib/apartments.ts` w polu `photos`:

```ts
photos: [
  {
    src: "/apartments/grzybowska-37/01-salon.jpg",
    width: 2400,
    height: 1600,
    alt: { pl: "Salon z sofą i dużym oknem", en: "Living room with a sofa and a large window" },
  },
  // ...
],
```

`width` i `height` to wymiary pliku w pikselach. Opis `alt` powinien krótko mówić, co widać na zdjęciu (ważne dla dostępności i SEO). Placeholdery znikną automatycznie.

## 4. FAQ ogólne – `lib/site.ts` (`GENERAL_FAQ`)

Pytania są przygotowane – potrzebne są odpowiedzi PL i EN:
- [ ] Godziny zameldowania i wymeldowania
- [ ] Sposób przekazania kluczy
- [ ] Jak dokonać rezerwacji
- [ ] Anulowanie i zmiana rezerwacji
- [ ] Parking w pobliżu
- [ ] Faktury
- [ ] Zwierzęta

Można dodać, usunąć lub zmienić pytania.

## 5. Regulamin – `lib/site.ts` (`TERMS`)

Treść (PL i EN) dla rozdziałów: rezerwacja i potwierdzenie, płatności, zameldowanie i wymeldowanie, zasady pobytu, anulowanie i zmiany rezerwacji, odpowiedzialność i szkody, ochrona danych osobowych, postanowienia końcowe. Lista rozdziałów może się zmienić. Regulamin i polityka prywatności powinny zostać zweryfikowane prawnie.

## 6. Teksty marki – `lib/i18n/pl.ts`, `lib/i18n/en.ts`

- [ ] Historia marki / informacje o gospodarzach do sekcji „O nas” (PL i EN)
- [ ] Akceptacja lub zmiana haseł: „Dwa adresy w Warszawie. Jeden standard.”, „Butikowe apartamenty na krótki pobyt”
- [ ] Logo (obecnie tymczasowy znak „PB”), favicon, ewentualnie zdjęcie do udostępnień w mediach społecznościowych
