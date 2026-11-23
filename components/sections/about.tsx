import Link from "next/link";
import { IconArrowUpRight, IconBuilding } from "@/components/icons";
import { Section } from "@/components/ui";
import { apartmentPath, formatAddress, getAllApartments } from "@/lib/apartments";
import { SECTION_IDS, type SectionProps } from "./types";

export function About({ lang, dict, apartment: current }: SectionProps) {
  const d = dict.about;

  return (
    <Section id={SECTION_IDS.about} eyebrow={d.eyebrow} title={d.title}>
      <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
        <div className="space-y-5 text-lg leading-relaxed text-graphite">
          {d.paragraphs.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div>
          <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{d.apartmentsLabel}</h3>
          <ul className="mt-4 flex flex-col gap-3">
            {getAllApartments().map((apartment) => {
              const active = apartment.id === current.id;
              return (
                <li key={apartment.id}>
                  <Link
                    href={apartmentPath(lang, apartment.id, SECTION_IDS.apartment)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex items-center gap-4 rounded-2xl border p-5 transition-colors ${
                      active ? "border-accent/40 bg-accent-soft/60" : "border-line hover:border-ink/25"
                    }`}
                  >
                    <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-accent ring-1 ring-line">
                      <IconBuilding className="size-5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium text-ink">{apartment.name}</span>
                      <span className="mt-0.5 block text-sm text-muted">{formatAddress(apartment.address)}</span>
                    </span>
                    <IconArrowUpRight className="size-5 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
