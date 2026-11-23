import { IconArrowUpRight, IconShieldCheck } from "@/components/icons";
import { buttonClasses, ExternalLink, PendingBadge, Section } from "@/components/ui";
import { formatDate, formatScore, plural, t } from "@/lib/format";
import { SECTION_IDS, type SectionProps } from "./types";

/**
 * Sekcja opinii – pokazuje wyłącznie zweryfikowaną ocenę i link do Booking.com.
 * Celowo nie wyświetlamy treści recenzji.
 */
export function Reviews({ lang, dict, apartment }: SectionProps) {
  const d = dict.reviews;
  const { score, reviewCount, verifiedAt } = apartment.rating;
  const { booking, airbnb } = apartment.links;

  return (
    <Section id={SECTION_IDS.reviews} tone="mist" eyebrow={d.eyebrow} title={d.title} intro={d.text}>
      <div
        key={apartment.id}
        className="flex flex-col gap-8 rounded-2xl border border-line/70 bg-white p-6 motion-safe:animate-fade-up sm:p-10 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p className="flex items-center gap-2 text-sm font-medium text-graphite">
            <IconShieldCheck className="size-5 text-accent" />
            {d.scoreLabel} · {apartment.shortName}
          </p>

          {score !== null ? (
            <>
              <p className="mt-5 flex items-baseline gap-3">
                <span className="text-6xl font-medium tracking-tight text-ink tabular-nums">
                  {formatScore(score, lang)}
                </span>
                <span className="text-muted">{d.outOf}</span>
              </p>
              <p className="mt-2 text-sm text-muted">
                {reviewCount !== null ? plural(d.reviewCount, reviewCount, lang) : null}
                {reviewCount !== null && verifiedAt ? " · " : null}
                {verifiedAt ? t(d.verifiedAt, { date: formatDate(verifiedAt, lang) }) : null}
              </p>
            </>
          ) : (
            <>
              <p className="mt-5 text-6xl font-medium tracking-tight text-[#c5ccd4]" aria-hidden="true">
                –,–
              </p>
              <p className="mt-3">
                <PendingBadge>{d.scorePending}</PendingBadge>
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
          {booking ? (
            <ExternalLink href={booking} newTabLabel={dict.common.newTab} className={buttonClasses("primary", "lg")}>
              {d.bookingCta}
              <IconArrowUpRight className="size-4 opacity-70" />
            </ExternalLink>
          ) : (
            <PendingBadge>{d.bookingPending}</PendingBadge>
          )}
          {airbnb ? (
            <ExternalLink href={airbnb} newTabLabel={dict.common.newTab} className={buttonClasses("secondary", "lg")}>
              {d.airbnbCta}
              <IconArrowUpRight className="size-4 opacity-70" />
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </Section>
  );
}
