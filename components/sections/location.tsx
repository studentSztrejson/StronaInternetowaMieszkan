import { IconArrowUpRight, IconMapPin } from "@/components/icons";
import { MapPanel } from "@/components/map-panel";
import { buttonClasses, ExternalLink, Section } from "@/components/ui";
import { formatAddress } from "@/lib/apartments";
import { t } from "@/lib/format";
import { SECTION_IDS, type SectionProps } from "./types";

export function Location({ lang, dict, apartment }: SectionProps) {
  const d = dict.location;
  const { address } = apartment;
  const neighborhood = apartment.neighborhood[lang];
  const cityLine = [address.postalCode, address.city].filter(Boolean).join(" ");

  return (
    <Section id={SECTION_IDS.location} eyebrow={d.eyebrow} title={d.title}>
      <div
        key={apartment.id}
        className="grid items-start gap-10 motion-safe:animate-fade-up lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
      >
        <div className="flex flex-col gap-8">
          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{d.addressLabel}</h3>
            <address className="mt-3 text-2xl leading-snug font-medium tracking-tight text-ink not-italic">
              {address.street}
              <br />
              {cityLine}
              {address.district ? <span className="text-muted">, {address.district}</span> : null}
            </address>
          </div>

          <div>
            <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">
              {d.neighborhoodLabel}
            </h3>
            <p className={`mt-3 leading-relaxed ${neighborhood ? "text-graphite" : "text-muted"}`}>
              {neighborhood ?? d.neighborhoodPending}
            </p>
          </div>

          <div>
            <ExternalLink
              href={apartment.links.googleMaps}
              newTabLabel={dict.common.newTab}
              className={buttonClasses("primary", "lg")}
            >
              <IconMapPin className="size-5" />
              {d.openInMaps}
              <IconArrowUpRight className="size-4 opacity-70" />
            </ExternalLink>
          </div>
        </div>

        <MapPanel
          embedUrl={apartment.links.googleMapsEmbed}
          title={t(d.mapTitle, { address: formatAddress(address) })}
          labels={d}
        />
      </div>
    </Section>
  );
}
