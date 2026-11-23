import type { ComponentType } from "react";
import {
  IconArea,
  IconArrowUpRight,
  IconBath,
  IconBed,
  IconCalendar,
  IconMapPin,
  IconStar,
  IconUsers,
  type IconProps,
} from "@/components/icons";
import { buttonClasses, Container, ExternalLink, PendingBadge } from "@/components/ui";
import { formatAddress, type ApartmentDetails } from "@/lib/apartments";
import { formatNumber, formatScore, plural } from "@/lib/format";
import { SECTION_IDS, type SectionProps } from "./types";

const DETAIL_ICONS: Record<keyof ApartmentDetails, ComponentType<IconProps>> = {
  maxGuests: IconUsers,
  bedrooms: IconBed,
  beds: IconBed,
  bathrooms: IconBath,
  areaM2: IconArea,
};

export function Overview({ lang, dict, apartment }: SectionProps) {
  const d = dict.overview;
  const details = (Object.keys(apartment.details) as (keyof ApartmentDetails)[])
    .map((key) => ({ key, value: apartment.details[key] }))
    .filter((item): item is { key: keyof ApartmentDetails; value: number } => item.value !== null);

  const description = apartment.description[lang];
  const { score, reviewCount } = apartment.rating;

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

            {details.length > 0 ? (
              <dl
                aria-label={d.detailsLabel}
                className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5"
              >
                {details.map(({ key, value }) => {
                  const Icon = DETAIL_ICONS[key];
                  return (
                    <div key={key} className="flex flex-col-reverse bg-white p-4">
                      <dt className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <Icon className="size-4 text-accent" />
                        {d.details[key]}
                      </dt>
                      <dd className="text-xl font-medium tracking-tight text-ink">
                        {key === "areaM2" ? `${formatNumber(value, lang)} m²` : formatNumber(value, lang)}
                      </dd>
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

              <p className="mt-3 flex items-center gap-2 text-sm text-muted">
                <IconStar className="size-4 text-accent" />
                {score !== null ? (
                  <span>
                    <span className="font-medium text-ink">{formatScore(score, lang)}</span>
                    <span> / 10 · {d.ratingLabel}</span>
                    {reviewCount !== null ? (
                      <span> · {plural(dict.reviews.reviewCount, reviewCount, lang)}</span>
                    ) : null}
                  </span>
                ) : (
                  <span>{d.ratingPending}</span>
                )}
              </p>

              <div className="my-6 h-px bg-line" />

              <div className="flex flex-col gap-3">
                <a href={`#${SECTION_IDS.contact}`} className={buttonClasses("accent", "lg", "w-full")}>
                  <IconCalendar className="size-5" />
                  {d.availabilityCta}
                </a>
                {apartment.links.booking ? (
                  <ExternalLink
                    href={apartment.links.booking}
                    newTabLabel={dict.common.newTab}
                    className={buttonClasses("secondary", "lg", "w-full")}
                  >
                    {d.bookingCta}
                    <IconArrowUpRight className="size-4" />
                  </ExternalLink>
                ) : null}
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  );
}
