import { IconStar } from "@/components/icons";
import { SECTION_IDS } from "@/components/sections/types";
import { formatRating, plural } from "@/lib/format";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { ApartmentReviews } from "@/lib/reviews";

interface SummaryItem {
  key: "booking" | "google";
  name: string;
  value: string;
  scale: 10 | 5;
  count: number | null;
}

/**
 * Skrót ocen pod nazwą apartamentu – każda platforma osobno (bez łączenia średnich).
 * Pokazuje tylko zweryfikowane / pobrane oceny; bez danych nie renderuje niczego.
 * Kliknięcie przewija do sekcji „Opinie naszych gości”.
 */
export function RatingSummary({
  lang,
  dict,
  reviews,
}: {
  lang: Locale;
  dict: Dictionary;
  reviews: ApartmentReviews;
}) {
  const d = dict.reviews;
  const items: SummaryItem[] = [];

  if (reviews.booking.rating !== null) {
    items.push({
      key: "booking",
      name: d.booking.name,
      value: formatRating(reviews.booking.rating, 10, lang),
      scale: 10,
      count: reviews.booking.reviewCount,
    });
  }
  if (reviews.google && reviews.google.rating !== null) {
    items.push({
      key: "google",
      name: d.google.shortName,
      value: formatRating(reviews.google.rating, 5, lang),
      scale: 5,
      count: reviews.google.reviewCount,
    });
  }

  if (items.length === 0) return null;

  return (
    <ul aria-label={d.summaryLabel} className="mt-4 flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.key}>
          <a
            href={`#${SECTION_IDS.reviews}`}
            className="inline-flex flex-wrap items-center gap-x-2 gap-y-0.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm text-graphite transition-colors hover:border-ink/25 hover:text-ink"
          >
            <IconStar className="size-4 shrink-0 text-accent" />
            {/* Jawne spacje – czytniki ekranu nie widzą odstępów z `gap`. */}
            <span className="font-medium text-ink">{item.name}</span>{" "}
            <span className="tabular-nums">
              {item.value}/{item.scale}
            </span>
            {item.count !== null ? (
              <>
                {" "}
                <span className="text-muted">({plural(d.reviewCount, item.count, lang)})</span>
              </>
            ) : null}
            <span className="sr-only"> – {d.summaryLink}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
