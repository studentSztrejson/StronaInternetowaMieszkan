import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteHeader, type LanguageOption, type NavItem } from "@/components/site-header";
import { About } from "@/components/sections/about";
import { Amenities } from "@/components/sections/amenities";
import { Contact } from "@/components/sections/contact";
import { Faq } from "@/components/sections/faq";
import { Footer } from "@/components/sections/footer";
import { Hero } from "@/components/sections/hero";
import { Location } from "@/components/sections/location";
import { Overview } from "@/components/sections/overview";
import { Reviews } from "@/components/sections/reviews";
import { Terms } from "@/components/sections/terms";
import { SECTION_IDS } from "@/components/sections/types";
import { APARTMENT_IDS, apartmentPath, getApartment } from "@/lib/apartments";
import { t } from "@/lib/format";
import { getDictionary, isLocale, LOCALES, type Dictionary } from "@/lib/i18n";

/**
 * Strona apartamentu: /{lang}/{apartment}, np. /pl/grzybowska-37 lub /en/ludwiki-4a.
 * Wszystkie 4 kombinacje są generowane statycznie podczas budowania.
 */
export function generateStaticParams() {
  return APARTMENT_IDS.map((apartment) => ({ apartment }));
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[apartment]">): Promise<Metadata> {
  const { lang, apartment: id } = await params;
  const apartment = getApartment(id);
  if (!isLocale(lang) || !apartment) return {};

  const dict = getDictionary(lang);
  return {
    title: t(dict.meta.apartmentTitle, { name: apartment.name }),
    description: dict.meta.description,
    alternates: {
      canonical: apartmentPath(lang, apartment.id),
      languages: Object.fromEntries(LOCALES.map((l) => [l, apartmentPath(l, apartment.id)])),
    },
  };
}

function navigation(dict: Dictionary): NavItem[] {
  const keys = ["apartment", "amenities", "location", "reviews", "contact", "about", "faq", "terms"] as const;
  return keys.map((key) => ({ href: `#${SECTION_IDS[key]}`, label: dict.nav[key] }));
}

export default async function ApartmentPage({ params }: PageProps<"/[lang]/[apartment]">) {
  const { lang, apartment: id } = await params;
  const apartment = getApartment(id);
  if (!isLocale(lang) || !apartment) notFound();

  const dict = getDictionary(lang);
  const nav = navigation(dict);

  // Przełączenie języka zachowuje wybrany apartament.
  const languages: LanguageOption[] = LOCALES.map((code) => ({
    code,
    label: dict.languages[code],
    href: apartmentPath(code, apartment.id),
    active: code === lang,
  }));

  const sectionProps = { lang, dict, apartment };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        {dict.common.skipToContent}
      </a>
      <div id="top" />
      <SiteHeader
        homeHref={apartmentPath(lang, apartment.id)}
        homeLabel={dict.header.homeLabel}
        navLabel={dict.nav.label}
        nav={nav.filter((item) => item.href !== `#${SECTION_IDS.contact}`)}
        languages={languages}
        languageLabel={dict.header.languageLabel}
        contactLabel={dict.header.contactCta}
        menuOpenLabel={dict.header.menuOpen}
        menuCloseLabel={dict.header.menuClose}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero {...sectionProps} />
        <Overview {...sectionProps} />
        <Amenities {...sectionProps} />
        <Location {...sectionProps} />
        <Reviews {...sectionProps} />
        <Contact {...sectionProps} />
        <About {...sectionProps} />
        <Faq {...sectionProps} />
        <Terms {...sectionProps} />
      </main>
      <Footer lang={lang} dict={dict} nav={nav} />
    </>
  );
}
