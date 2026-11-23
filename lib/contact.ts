/** Buduje linki kontaktowe z danych w lib/site.ts. Zwraca null, gdy brak danych. */

export function mailtoHref(
  email: string | null,
  options?: { subject?: string; body?: string },
): string | null {
  if (!email) return null;
  const params = new URLSearchParams();
  if (options?.subject) params.set("subject", options.subject);
  if (options?.body) params.set("body", options.body);
  // URLSearchParams koduje spacje jako "+", czego część klientów poczty nie rozumie.
  const query = params.toString().replace(/\+/g, "%20");
  return `mailto:${email}${query ? `?${query}` : ""}`;
}

export function telHref(phone: string | null): string | null {
  if (!phone) return null;
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function whatsappHref(phone: string | null, text?: string): string | null {
  if (!phone) return null;
  const digits = phone.replace(/\D/g, "");
  return `https://wa.me/${digits}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
