import { IconArrowUpRight, IconStar } from "@/components/icons";
import { buttonClasses, ExternalLink } from "@/components/ui";

export interface PlatformCardProps {
  name: string;
  /** Ocena gotowa do wyświetlenia; null = brak oceny (pokazujemy tekst `emptyText`, nigdy zero). */
  score: { value: string; outOf: string; label: string } | null;
  /** Np. „3 opinie”. */
  countText: string | null;
  /** Np. „Stan na 23 listopada 2026”. */
  updatedText: string | null;
  emptyText: string;
  cta: { href: string; label: string } | null;
  ctaVariant?: "primary" | "secondary";
  /** Pojedyncza karta na całą szerokość – układ poziomy od md. */
  wide?: boolean;
  newTabLabel: string;
  /** Dodatkowa informacja pod kartą, np. atrybucja Google Maps. */
  note?: string | null;
}

/** Karta oceny jednej platformy (Booking.com lub Google Maps). */
export function PlatformCard({
  name,
  score,
  countText,
  updatedText,
  emptyText,
  cta,
  ctaVariant = "primary",
  wide = false,
  newTabLabel,
  note,
}: PlatformCardProps) {
  return (
    <article
      className={`flex h-full flex-col gap-8 rounded-2xl border border-line/70 bg-white p-6 sm:p-8 ${
        wide ? "md:flex-row md:items-center md:justify-between md:p-10" : "justify-between"
      }`}
    >
      <div className="min-w-0">
        <h3 className="flex items-center gap-2 text-sm font-medium text-graphite">
          <IconStar className="size-4 text-accent" />
          {name}
        </h3>

        {score ? (
          <>
            <p className="mt-5 flex items-baseline gap-3">
              <span aria-hidden="true" className="text-6xl font-medium tracking-tight text-ink tabular-nums">
                {score.value}
              </span>
              <span aria-hidden="true" className="text-muted">
                {score.outOf}
              </span>
              <span className="sr-only">{score.label}</span>
            </p>
            {countText ? <p className="mt-2 text-sm text-graphite">{countText}</p> : null}
            {updatedText ? <p className="mt-1 text-xs text-muted">{updatedText}</p> : null}
          </>
        ) : (
          <p className="mt-4 max-w-md leading-relaxed text-graphite">{emptyText}</p>
        )}
        {note ? <p className="mt-3 text-xs text-muted">{note}</p> : null}
      </div>

      {cta ? (
        <div className="shrink-0">
          <ExternalLink
            href={cta.href}
            newTabLabel={newTabLabel}
            // Na wąskich ekranach napis może się zawinąć (warianty max-sm wygrywają z klasami bazowymi).
            className={buttonClasses(
              ctaVariant,
              "lg",
              "w-full text-center sm:w-auto max-sm:h-auto max-sm:min-h-12 max-sm:whitespace-normal max-sm:py-3",
            )}
          >
            {cta.label}
            <IconArrowUpRight className="size-4 shrink-0 opacity-70" />
          </ExternalLink>
        </div>
      ) : null}
    </article>
  );
}
