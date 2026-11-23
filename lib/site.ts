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
    email: "grzybowska37ab@gmail.com" as string | null,
    /** Numer w formacie międzynarodowym – linki tel: i wa.me są budowane automatycznie. */
    phone: "+48 506 287 599" as string | null,
    /** Numer WhatsApp w formacie międzynarodowym. */
    whatsapp: "+48 506 287 599" as string | null,
  },

  /** Dane formalne wynajmującego (wyświetlane w stopce). Hubert prowadzi markę, ale nie jest wynajmującym. */
  company: {
    legalName: "Zbigniew Woźniakowski" as string | null,
    taxId: "5361171961" as string | null,
    address: null as string | null, // TODO: adres (jeśli ma być publikowany)
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
 * Ogólne pytania dla obu apartamentów. Odpowiedzi wynikają wyłącznie z danych
 * potwierdzonych przez właściciela; pozostałe mają answer: null (TODO) –
 * interfejs pokazuje wtedy „Odpowiedź zostanie wkrótce uzupełniona”.
 */
export const GENERAL_FAQ: FaqItem[] = [
  {
    question: {
      pl: "W jakich godzinach odbywa się zameldowanie i wymeldowanie?",
      en: "What are the check-in and check-out times?",
    },
    answer: {
      pl: "Zameldowanie odbywa się w godzinach 16:00–23:00, a wymeldowanie w godzinach 05:00–11:00. Zasady są takie same w obu apartamentach.",
      en: "Check-in is between 16:00 and 23:00, and check-out between 05:00 and 11:00. The same times apply in both apartments.",
    },
  },
  {
    question: {
      pl: "Jak mogę dokonać rezerwacji?",
      en: "How can I make a reservation?",
    },
    answer: {
      pl: "Najlepiej bezpośrednio – telefonicznie, e-mailem lub przez WhatsApp. Przygotujemy indywidualną ofertę na wybrany termin. Apartamenty są dostępne także na Booking.com.",
      en: "Ideally directly – by phone, email or WhatsApp – and we will prepare a personalised offer for your dates. The apartments are also listed on Booking.com.",
    },
  },
  {
    question: {
      pl: "Czy cena na stronie jest ostateczna?",
      en: "Is the price shown on the website final?",
    },
    answer: {
      pl: "Nie. Cena „od 250 PLN / noc” jest orientacyjna. Cena i dostępność wymagają indywidualnego potwierdzenia dla wybranego terminu.",
      en: "No. The “from 250 PLN / night” price is indicative. Price and availability are subject to confirmation for your chosen dates.",
    },
  },
  {
    question: {
      pl: "Czy można przyjechać z dziećmi?",
      en: "Are children welcome?",
    },
    answer: {
      pl: "Tak, dzieci są mile widziane w obu apartamentach.",
      en: "Yes, children are welcome in both apartments.",
    },
  },
  {
    question: {
      pl: "Czy można przyjechać ze zwierzęciem?",
      en: "Are pets allowed?",
    },
    answer: {
      pl: "Nie, zwierzęta nie są akceptowane.",
      en: "No, pets are not allowed.",
    },
  },
  {
    question: {
      pl: "Czy w apartamentach można palić lub organizować imprezy?",
      en: "Is smoking or holding parties allowed?",
    },
    answer: {
      pl: "Nie. W apartamentach obowiązuje zakaz palenia oraz organizowania imprez.",
      en: "No. Smoking and parties are not allowed in the apartments.",
    },
  },
  {
    question: {
      pl: "Czy w pobliżu jest parking?",
      en: "Is there parking nearby?",
    },
    answer: {
      pl: "Apartamenty nie mają prywatnego miejsca parkingowego. W okolicy obu budynków znajdują się parkingi publiczne, jednak nie gwarantujemy wolnego miejsca.",
      en: "The apartments do not have a private parking space. There are public car parks near both buildings, but a free space cannot be guaranteed.",
    },
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
      pl: "Czy można anulować lub zmienić rezerwację?",
      en: "Can I cancel or change my reservation?",
    },
    answer: { pl: null, en: null }, // TODO: zasady anulowania nie zostały ustalone
  },
  {
    question: {
      pl: "Czy wystawiacie faktury?",
      en: "Do you issue invoices?",
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
 * Struktura regulaminu. Uzupełnione są tylko rozdziały potwierdzone przez właściciela
 * (zameldowanie / wymeldowanie, zasady pobytu). Pozostałe – w tym płatności, kaucja
 * i anulowanie – mają content: null (TODO) i wyświetlają się jako „Treść w przygotowaniu”.
 */
export const TERMS: TermsChapter[] = [
  { title: { pl: "Rezerwacja i potwierdzenie", en: "Booking and confirmation" }, content: { pl: null, en: null } },
  { title: { pl: "Płatności", en: "Payments" }, content: { pl: null, en: null } },
  {
    title: { pl: "Zameldowanie i wymeldowanie", en: "Check-in and check-out" },
    content: {
      pl: "Zameldowanie: 16:00–23:00. Wymeldowanie: 05:00–11:00. Godziny obowiązują w obu apartamentach.",
      en: "Check-in: 16:00–23:00. Check-out: 05:00–11:00. These times apply in both apartments.",
    },
  },
  {
    title: { pl: "Zasady pobytu", en: "House rules" },
    content: {
      pl: "Palenie i organizowanie imprez są zabronione. Zwierzęta nie są akceptowane. Dzieci są mile widziane.",
      en: "Smoking and parties are not allowed. Pets are not accepted. Children are welcome.",
    },
  },
  { title: { pl: "Anulowanie i zmiany rezerwacji", en: "Cancellations and changes" }, content: { pl: null, en: null } },
  { title: { pl: "Odpowiedzialność i szkody", en: "Liability and damages" }, content: { pl: null, en: null } },
  { title: { pl: "Ochrona danych osobowych", en: "Personal data protection" }, content: { pl: null, en: null } },
  { title: { pl: "Postanowienia końcowe", en: "Final provisions" }, content: { pl: null, en: null } },
];
