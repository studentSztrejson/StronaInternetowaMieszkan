import { INTL_LOCALE, type Locale } from "@/lib/i18n/config";

/** Podmienia znaczniki {klucz} w szablonie tekstu. */
export function t(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function formatNumber(value: number, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale]).format(value);
}

/**
 * Ocena platformy: Booking.com (skala 10) jak na Booking – „10”, „9,8”;
 * Google (skala 5) zawsze z jednym miejscem po przecinku – „5,0”, „4,8”.
 */
export function formatRating(value: number, scale: 10 | 5, locale: Locale): string {
  return new Intl.NumberFormat(INTL_LOCALE[locale], {
    minimumFractionDigits: scale === 5 ? 1 : 0,
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(INTL_LOCALE[locale], {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Europe/Warsaw",
  }).format(new Date(`${iso}T12:00:00Z`));
}

export type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { other: string };

/** Wybiera poprawną formę liczby mnogiej (np. 1 opinia / 2 opinie / 5 opinii). */
export function plural(forms: PluralForms, count: number, locale: Locale): string {
  const rule = new Intl.PluralRules(INTL_LOCALE[locale]).select(count);
  const template = forms[rule] ?? forms.other;
  return t(template, { count: formatNumber(count, locale) });
}
