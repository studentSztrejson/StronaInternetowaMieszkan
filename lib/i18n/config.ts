/**
 * Obsługiwane języki. Język jest pierwszym segmentem adresu URL: /pl/..., /en/...
 */
export const LOCALES = ["pl", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "pl";

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Tekst w obu językach. */
export type Localized<T = string> = Record<Locale, T>;

/** Pełne tagi BCP 47 – do formatowania liczb, dat i liczby mnogiej. */
export const INTL_LOCALE: Record<Locale, string> = {
  pl: "pl-PL",
  en: "en-GB",
};
