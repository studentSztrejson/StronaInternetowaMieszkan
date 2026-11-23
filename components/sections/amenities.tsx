import { AmenityIcon } from "@/components/amenity-icon";
import { Section } from "@/components/ui";
import { AMENITIES, type AmenityKey } from "@/lib/amenities";
import { t } from "@/lib/format";
import { SECTION_IDS, type SectionProps } from "./types";

/** Ikony pokazywane dekoracyjnie w stanie „lista w przygotowaniu”. */
const PENDING_PREVIEW: AmenityKey[] = ["wifi", "kitchen", "airConditioning", "washer", "workspace"];

export function Amenities({ lang, dict, apartment }: SectionProps) {
  const d = dict.amenities;

  return (
    <Section
      id={SECTION_IDS.amenities}
      tone="mist"
      eyebrow={d.eyebrow}
      title={d.title}
      intro={t(d.intro, { name: apartment.shortName })}
    >
      <div key={apartment.id} className="motion-safe:animate-fade-up">
        {apartment.amenities.length > 0 ? (
          <ul aria-label={d.listLabel} className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {apartment.amenities.map((key) => (
              <li
                key={key}
                className="flex items-center gap-4 rounded-xl border border-line/70 bg-white px-5 py-4"
              >
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <AmenityIcon amenity={key} className="size-5" />
                </span>
                <span className="text-[15px] text-ink">{AMENITIES[key][lang]}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#cdd5de] bg-white px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="flex justify-center gap-2 sm:gap-3" aria-hidden="true">
              {PENDING_PREVIEW.map((key) => (
                <span
                  key={key}
                  className="inline-flex size-11 items-center justify-center rounded-full bg-mist text-[#8d97a3] sm:size-12"
                >
                  <AmenityIcon amenity={key} className="size-5" />
                </span>
              ))}
            </div>
            <p className="mt-6 text-lg font-medium text-ink">{d.pendingTitle}</p>
            <p className="mx-auto mt-2 max-w-md text-muted">{d.pendingText}</p>
          </div>
        )}
      </div>
    </Section>
  );
}
