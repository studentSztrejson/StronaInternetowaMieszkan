import Link from "next/link";
import { Gallery } from "@/components/gallery/gallery";
import type { GalleryItem } from "@/components/gallery/types";
import { Container, Eyebrow } from "@/components/ui";
import { apartmentPath, getAllApartments, type Apartment } from "@/lib/apartments";
import type { Locale } from "@/lib/i18n";
import { SECTION_IDS, type SectionProps } from "./types";

/** Liczba placeholderów wyświetlanych, dopóki apartament nie ma zdjęć. */
const PLACEHOLDER_COUNT = 6;

function galleryItems({ apartment, lang, dict }: SectionProps): GalleryItem[] {
  if (apartment.photos.length > 0) {
    return apartment.photos.map((photo) => ({
      src: photo.src,
      alt: photo.alt[lang],
      width: photo.width,
      height: photo.height,
    }));
  }
  return Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
    src: null,
    alt: `${dict.gallery.placeholderTitle} ${i + 1}`,
  }));
}

function ApartmentSwitcher({
  lang,
  current,
  label,
}: {
  lang: Locale;
  current: Apartment;
  label: string;
}) {
  return (
    <nav aria-label={label} className="w-full lg:w-auto">
      <ul className="grid grid-cols-2 gap-1 rounded-2xl bg-mist p-1.5 lg:min-w-[440px]">
        {getAllApartments().map((apartment) => {
          const active = apartment.id === current.id;
          return (
            <li key={apartment.id}>
              <Link
                href={apartmentPath(lang, apartment.id)}
                scroll={false}
                aria-current={active ? "page" : undefined}
                className={`flex h-full flex-col rounded-xl px-4 py-3 transition-all duration-300 sm:px-5 sm:py-3.5 ${
                  active
                    ? "bg-white text-ink shadow-[0_1px_2px_rgba(16,24,40,0.05),0_2px_8px_rgba(16,24,40,0.06)]"
                    : "text-muted hover:bg-white/60 hover:text-ink"
                }`}
              >
                <span
                  className={`text-[11px] font-medium uppercase tracking-[0.16em] ${
                    active ? "text-accent" : "text-muted"
                  }`}
                >
                  {apartment.address.city}
                </span>
                <span className="mt-1 text-base font-medium tracking-tight sm:text-lg">
                  {apartment.shortName}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Hero(props: SectionProps) {
  const { lang, dict, apartment } = props;

  return (
    <section
      id={SECTION_IDS.apartment}
      aria-labelledby="hero-title"
      className="bg-white pt-10 sm:pt-16"
    >
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <Eyebrow>{dict.hero.eyebrow}</Eyebrow>
            <h1
              id="hero-title"
              className="mt-4 text-[2.5rem] leading-[1.05] font-medium tracking-[-0.02em] text-balance text-ink sm:text-5xl lg:text-6xl"
            >
              {dict.hero.title} <span className="text-muted">{dict.hero.titleAccent}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {dict.hero.subtitle}
            </p>
          </div>
          <ApartmentSwitcher lang={lang} current={apartment} label={dict.hero.switcherLabel} />
        </div>

        <div key={apartment.id} className="mt-10 motion-safe:animate-fade-up sm:mt-12">
          <Gallery items={galleryItems(props)} apartmentName={apartment.name} labels={dict.gallery} />
        </div>
      </Container>
    </section>
  );
}
