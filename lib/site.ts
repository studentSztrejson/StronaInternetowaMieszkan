import type { Localized } from "@/lib/i18n/config";

/**
 * Dane wspólne dla całej marki: kontakt, dane firmy, FAQ ogólne, regulamin.
 * Wartości null oznaczają dane do uzupełnienia (patrz DATA_TO_FILL.md).
 * Nie wpisuj tu fikcyjnych danych – interfejs pokazuje neutralny stan „wkrótce”.
 */
export const SITE = {
  brand: "Premium Blue Apartments",

  /** Docelowy adres strony, np. "https://premiumblue.pl". */
  url: null as string | null, // TODO

  contact: {
    email: null as string | null, // TODO, np. "kontakt@domena.pl"
    /** Numer w formacie międzynarodowym, np. "+48 600 000 000". */
    phone: null as string | null, // TODO
    /** Numer WhatsApp w formacie międzynarodowym (może być taki sam jak telefon). */
    whatsapp: null as string | null, // TODO
  },

  company: {
    legalName: null as string | null, // TODO: nazwa firmy / właściciela
    taxId: null as string | null, // TODO: NIP (jeśli dotyczy)
    address: null as string | null, // TODO: adres rejestrowy
  },

  /** Rok wyświetlany w stopce. */
  copyrightYear: 2026,
} as const;

export interface FaqItem {
  question: Localized;
  /** null = odpowiedź do uzupełnienia. */
  answer: Localized<string | null>;
}

/**
 * Ogólne pytania dla obu apartamentów. Pytania są gotowe – odpowiedzi
 * należy uzupełnić rzeczywistymi zasadami (nie wymyślamy warunków pobytu).
 */
export const GENERAL_FAQ: FaqItem[] = [
  {
    question: {
      pl: "W jakich godzinach odbywa się zameldowanie i wymeldowanie?",
      en: "What are the check-in and check-out times?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Jak odbywa się przekazanie kluczy?",
      en: "How are the keys handed over?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Jak mogę dokonać rezerwacji?",
      en: "How can I make a reservation?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Czy można anulować lub zmienić rezerwację?",
      en: "Can I cancel or change my reservation?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Czy w pobliżu jest parking?",
      en: "Is there parking nearby?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Czy wystawiacie faktury?",
      en: "Do you issue invoices?",
    },
    answer: { pl: null, en: null }, // TODO
  },
  {
    question: {
      pl: "Czy można przyjechać ze zwierzęciem?",
      en: "Are pets allowed?",
    },
    answer: { pl: null, en: null }, // TODO
  },
];

export interface TermsChapter {
  title: Localized;
  /** null = treść do uzupełnienia. */
  content: Localized<string | null>;
}

/**
 * Struktura regulaminu. Tytuły rozdziałów to tylko układ –
 * treść zasad (w tym anulowania) musi zostać dostarczona przez właściciela.
 */
export const TERMS: TermsChapter[] = [
  { title: { pl: "Rezerwacja i potwierdzenie", en: "Booking and confirmation" }, content: { pl: null, en: null } },
  { title: { pl: "Płatności", en: "Payments" }, content: { pl: null, en: null } },
  { title: { pl: "Zameldowanie i wymeldowanie", en: "Check-in and check-out" }, content: { pl: null, en: null } },
  { title: { pl: "Zasady pobytu", en: "House rules" }, content: { pl: null, en: null } },
  { title: { pl: "Anulowanie i zmiany rezerwacji", en: "Cancellations and changes" }, content: { pl: null, en: null } },
  { title: { pl: "Odpowiedzialność i szkody", en: "Liability and damages" }, content: { pl: null, en: null } },
  { title: { pl: "Ochrona danych osobowych", en: "Personal data protection" }, content: { pl: null, en: null } },
  { title: { pl: "Postanowienia końcowe", en: "Final provisions" }, content: { pl: null, en: null } },
];
