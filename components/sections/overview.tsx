import type { ComponentType } from "react";
import {
  IconArea,
  IconArrowUpRight,
  IconBath,
  IconBed,
  IconBuilding,
  IconCalendar,
  IconMapPin,
  IconUsers,
  type IconProps,
} from "@/components/icons";
import { RatingSummary } from "@/components/reviews/rating-summary";
import { buttonClasses, Container, ExternalLink, PendingBadge } from "@/components/ui";
import { formatAddress, type ApartmentDetails } from "@/lib/apartments";
import { formatNumber } from "@/lib/format";
import { getApartmentReviews } from "@/lib/reviews";
import { SECTION_IDS, type SectionProps } from "./types";

const DETAIL_ICONS: Record<keyof ApartmentDetails, ComponentType<IconProps>> = {
  layout: IconBed,
  maxGuests: IconUsers,
  bedrooms: IconBed,
  beds: IconBed,
  bathrooms: IconBath,
  areaM2: IconArea,
  floor: IconBuilding,
};

/** Liczba kolumn zależna od liczby parametrów – bez pustych komórek w siatce. */
const DETAIL_GRID: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3",
  7: "grid-cols-2 sm:grid-cols-4",
};

export function Overview({ lang, dict, apartment }: SectionProps) {
  const d = dict.overview;
  const details = (Object.keys(apartment.details) as (keyof ApartmentDetails)[]).flatMap((key) => {
    const value = apartment.details[key];
    if (value === null) return [];
    const text =
      key === "layout"
        ? d.layouts[value as keyof typeof d.layouts]
        : key === "areaM2"
          ? `${formatNumber(value as number, lang)} m²`
          : formatNumber(value as number, lang);
    return [{ key, text }];
  });

  const description = apartment.description[lang];
  const reviews = getApartmentReviews(apartment.id);

  return (
    <section aria-labelledby="overview-title" className="bg-white">
      <Container className="py-16 sm:py-24">
        <div
          key={apartment.id}
          className="grid gap-12 motion-safe:animate-fade-up lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-20"
        >
          <div>
            <p className="flex items-center gap-2 text-sm text-muted">
              <IconMapPin className="size-4 text-accent" />
              {formatAddress(apartment.address)}
            </p>
            <h2
              id="overview-title"
              className="mt-3 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
            >
              {apartment.name}
            </h2>
            {/* Skrót ocen (Booking.com / Google) – bez zweryfikowanych danych nie renderuje niczego. */}
            <RatingSummary lang={lang} dict={dict} reviews={reviews} />

            {details.length > 0 ? (
              <dl
                aria-label={d.detailsLabel}
                className={`mt-8 grid ${DETAIL_GRID[details.length] ?? DETAIL_GRID[7]} gap-px overflow-hidden rounded-xl border border-line bg-line`}
              >
                {details.map(({ key, text }) => {
                  const Icon = DETAIL_ICONS[key];
                  return (
                    <div key={key} className="flex flex-col-reverse bg-white p-4">
                      <dt className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <Icon className="size-4 text-accent" />
                        {d.details[key]}
                      </dt>
                      <dd className="text-xl font-medium tracking-tight text-ink">{text}</dd>
                    </div>
                  );
                })}
              </dl>
            ) : (
              <div className="mt-6">
                <PendingBadge>{d.detailsPending}</PendingBadge>
              </div>
            )}

            <div className="mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-graphite">
              {description ? (
                description.split(/\n{2,}/).map((paragraph, i) => <p key={i}>{paragraph}</p>)
              ) : (
                <p className="text-muted">{d.descriptionPending}</p>
              )}
            </div>
          </div>

          <aside aria-label={d.availabilityCta}>
            <div className="rounded-2xl border border-line bg-white p-6 shadow-[0_1px_2px_rgba(16,24,40,0.04),0_8px_24px_-12px_rgba(16,24,40,0.08)] sm:p-8 lg:sticky lg:top-28">
              {apartment.priceFromPLN !== null ? (
                <p className="flex flex-wrap items-baseline gap-x-2">
                  <span className="text-sm text-muted">{d.priceFrom}</span>
                  <span className="text-3xl font-medium tracking-tight text-ink">
                    {formatNumber(apartment.priceFromPLN, lang)} PLN
                  </span>
                  <span className="text-muted">/ {d.perNight}</span>
                </p>
              ) : (
                <p className="text-2xl font-medium tracking-tight text-ink">{d.priceOnRequest}</p>
              )}
              <p className="mt-1.5 text-xs leading-relaxed text-muted">{d.priceNote}</p>

              <div className="my-6 h-px bg-line" />

              <p className="mb-4 text-sm font-medium text-ink">{d.directBooking}</p>

              <div className="flex flex-col gap-3">
                <a href={`#${SECTION_IDS.contact}`} className={buttonClasses("accent", "lg", "w-full")}>
                  <IconCalendar className="size-5" />
                  {d.availabilityCta}
                </a>
                <ExternalLink
                  href={reviews.booking.url}
                  newTabLabel={dict.common.newTab}
                  className={buttonClasses("secondary", "lg", "w-full")}
                >
                  {d.bookingCta}
                  <IconArrowUpRight className="size-4" />
                </ExternalLink>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
