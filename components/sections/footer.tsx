import Link from "next/link";
import { IconArrowUp } from "@/components/icons";
import { Wordmark } from "@/components/site-header";
import { Container } from "@/components/ui";
import { apartmentPath, formatAddress, getAllApartments } from "@/lib/apartments";
import { mailtoHref, telHref } from "@/lib/contact";
import { SITE } from "@/lib/site";
import type { NavItem } from "@/components/site-header";
import type { SectionProps } from "./types";

const HEADING = "text-xs font-medium uppercase tracking-[0.16em] text-muted";
const LINK = "text-sm text-graphite transition-colors hover:text-ink";

export function Footer({ lang, dict, nav }: Omit<SectionProps, "apartment"> & { nav: NavItem[] }) {
  const d = dict.footer;
  const { email, phone } = SITE.contact;
  const emailHref = mailtoHref(email);
  const phoneHref = telHref(phone);
  const { legalName, taxId, address } = SITE.company;
  const companyLine = [legalName, address, taxId ? `NIP ${taxId}` : null].filter(Boolean).join(" · ");

  return (
    <footer className="border-t border-line bg-mist">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,4fr)_repeat(3,minmax(0,2fr))]">
          <div className="max-w-xs">
            <Wordmark className="text-ink" />
            <p className="mt-4 text-sm leading-relaxed text-muted">{d.tagline}</p>
          </div>

          <div>
            <h2 className={HEADING}>{d.apartments}</h2>
            <ul className="mt-4 space-y-3">
              {getAllApartments().map((apartment) => (
                <li key={apartment.id}>
                  <Link href={apartmentPath(lang, apartment.id, "apartment")} className={LINK}>
                    {apartment.shortName}
                  </Link>
                  <p className="text-xs text-muted">{formatAddress(apartment.address)}</p>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label={d.navigation}>
            <h2 className={HEADING}>{d.navigation}</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 lg:grid-cols-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={LINK}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={HEADING}>{d.contact}</h2>
            <ul className="mt-4 space-y-2">
              {emailHref ? (
                <li>
                  <a href={emailHref} className={LINK}>
                    {email}
                  </a>
                </li>
              ) : null}
              {phoneHref ? (
                <li>
                  <a href={phoneHref} className={LINK}>
                    {phone}
                  </a>
                </li>
              ) : null}
              {!emailHref && !phoneHref ? <li className="text-sm text-muted">{d.contactPending}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p>
              © {SITE.copyrightYear} {SITE.brand}. {d.rights}
            </p>
            <p>{companyLine || d.companyPending}</p>
          </div>
          <a href="#top" className="inline-flex items-center gap-1.5 self-start transition-colors hover:text-ink sm:self-auto">
            <IconArrowUp className="size-3.5" />
            {d.backToTop}
          </a>
        </div>
      </Container>
    </footer>
  );
}
