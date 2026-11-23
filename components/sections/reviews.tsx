import { IconArrowUpRight } from "@/components/icons";
import { PlatformCard } from "@/components/reviews/platform-card";
import { ReviewCard, type ReviewCardProps } from "@/components/reviews/review-card";
import { ExternalLink, Section } from "@/components/ui";
import { formatDate, formatRating, plural, t } from "@/lib/format";
import { getApartmentReviews, hasGoogleContent } from "@/lib/reviews";
import { SECTION_IDS, type SectionProps } from "./types";

/**
 * Sekcja „Opinie naszych gości”.
 * – Booking.com: ocena wpisywana ręcznie (lib/reviews.ts) + link do oferty.
 * – Google Maps: karta pojawia się dopiero, gdy istnieje wizytówka / dane z API.
 * – Opinie tekstowe: tylko prawdziwe (ręczne z prawem do publikacji lub z Google API).
 * Treści recenzji z Booking.com nie są kopiowane ani pobierane.
 */
export function Reviews({ lang, dict, apartment }: SectionProps) {
  const d = dict.reviews;
  const reviews = getApartmentReviews(apartment.id);
  const { booking, google } = reviews;
  const showGoogle = hasGoogleContent(reviews);
  const labels = {
    readMore: d.readMore,
    showLess: d.showLess,
    viewOriginal: d.viewOriginal,
    newTab: dict.common.newTab,
  };

  const ratingLabel = (value: string, scale: number) => t(d.ratingValue, { value, scale });

  // Prawdziwe opinie tekstowe: ręcznie dodane (z prawem do publikacji) + w przyszłości z Google API.
  const cards: (ReviewCardProps & { key: string })[] = [
    ...reviews.featured.map((review) => {
      const scale = review.source === "booking" ? 10 : 5;
      const value = review.rating !== null ? formatRating(review.rating, scale, lang) : null;
      return {
        key: `manual-${review.id}`,
        text: review.text,
        textLang: review.language,
        rating: value ? { value, scale, label: ratingLabel(value, scale) } : null,
        author: review.authorName ? { name: review.authorName, url: null } : null,
        date: review.date ? formatDate(review.date, lang) : null,
        sourceLabel: d.sources[review.source],
        originalUrl: review.url,
        labels,
      };
    }),
    ...(google?.reviews ?? [])
      .filter((review) => review.text)
      .map((review) => {
        const value = formatRating(review.rating, 5, lang);
        return {
          key: `google-${review.id}`,
          text: review.text as string,
          textLang: review.languageCode,
          rating: { value, scale: 5, label: ratingLabel(value, 5) },
          author: { name: review.author.displayName, url: review.author.uri },
          date: review.publishTime ? formatDate(review.publishTime.slice(0, 10), lang) : null,
          sourceLabel: d.sources.google,
          originalUrl: review.googleMapsUri,
          labels,
        };
      }),
  ];
  const hasGoogleReviewCards = (google?.reviews.length ?? 0) > 0;

  const bookingScore =
    booking.rating !== null
      ? (() => {
          const value = formatRating(booking.rating, 10, lang);
          return { value, outOf: d.booking.outOf, label: ratingLabel(value, 10) };
        })()
      : null;

  const googleScore =
    google && google.rating !== null
      ? (() => {
          const value = formatRating(google.rating, 5, lang);
          return { value, outOf: d.google.outOf, label: ratingLabel(value, 5) };
        })()
      : null;

  return (
    <Section id={SECTION_IDS.reviews} tone="mist" eyebrow={d.eyebrow} title={d.title} intro={d.text}>
      <div key={apartment.id} className="motion-safe:animate-fade-up">
        <div className={`grid gap-4 ${showGoogle ? "md:grid-cols-2" : ""}`}>
          <PlatformCard
            name={d.booking.name}
            score={bookingScore}
            countText={
              bookingScore && booking.reviewCount !== null ? plural(d.reviewCount, booking.reviewCount, lang) : null
            }
            updatedText={
              bookingScore && booking.updatedAt ? t(d.updatedAt, { date: formatDate(booking.updatedAt, lang) }) : null
            }
            emptyText={d.booking.empty}
            cta={{ href: booking.url, label: d.booking.cta }}
            wide={!showGoogle}
            newTabLabel={dict.common.newTab}
          />

          {showGoogle ? (
            <PlatformCard
              name={d.google.name}
              score={googleScore}
              countText={
                googleScore && google?.reviewCount != null ? plural(d.reviewCount, google.reviewCount, lang) : null
              }
              updatedText={null}
              emptyText={d.google.empty}
              cta={reviews.googleMapsUrl ? { href: reviews.googleMapsUrl, label: d.google.cta } : null}
              ctaVariant="secondary"
              newTabLabel={dict.common.newTab}
              note={googleScore ? d.google.attribution : null}
            />
          ) : null}
        </div>

        {cards.length > 0 ? (
          <div className="mt-12">
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{d.featuredTitle}</h3>
            <ul className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cards.map(({ key, ...card }) => (
                <li key={key}>
                  <ReviewCard {...card} />
                </li>
              ))}
            </ul>
            {hasGoogleReviewCards ? <p className="mt-3 text-xs text-muted">{d.google.attribution}</p> : null}
          </div>
        ) : null}

        {apartment.links.airbnb ? (
          <p className="mt-6 text-sm">
            <ExternalLink
              href={apartment.links.airbnb}
              newTabLabel={dict.common.newTab}
              className="inline-flex items-center gap-1 text-graphite underline-offset-4 hover:text-ink hover:underline"
            >
              {d.airbnbCta}
              <IconArrowUpRight className="size-3.5" />
            </ExternalLink>
          </p>
        ) : null}
      </div>
    </Section>
  );
}
