import type { ComponentType, ReactNode } from "react";
import {
  IconArrowUpRight,
  IconCalendar,
  IconChat,
  IconMail,
  IconPhone,
  type IconProps,
} from "@/components/icons";
import { Container, Eyebrow, PendingBadge } from "@/components/ui";
import { mailtoHref, telHref, whatsappHref } from "@/lib/contact";
import { t } from "@/lib/format";
import { SITE } from "@/lib/site";
import { SECTION_IDS, type SectionProps } from "./types";

interface ContactOptionProps {
  icon: ComponentType<IconProps>;
  label: string;
  /** Wartość widoczna pod etykietą (np. numer telefonu). */
  detail: ReactNode;
  href: string | null;
  external?: boolean;
  newTabLabel: string;
  featured?: boolean;
}

function ContactOption({ icon: Icon, label, detail, href, external, newTabLabel, featured }: ContactOptionProps) {
  const base = "flex h-full items-center gap-4 rounded-2xl border p-5 transition-colors";
  const content = (
    <>
      <span
        className={`inline-flex size-11 shrink-0 items-center justify-center rounded-full ${
          featured ? "bg-white/15" : "bg-white/10"
        }`}
      >
        <Icon className="size-5" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-medium">{label}</span>
        <span className="mt-0.5 block truncate text-sm text-white/65">{detail}</span>
      </span>
    </>
  );

  // Brak danych → neutralny, nieinteraktywny stan „wkrótce”.
  if (!href) {
    return <div className={`${base} border-dashed border-white/20 text-white/80`}>{content}</div>;
  }

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${base} group ${
        featured
          ? "border-transparent bg-accent hover:bg-accent-strong"
          : "border-white/15 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.07]"
      }`}
    >
      {content}
      <IconArrowUpRight className="size-5 shrink-0 opacity-60 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      {external ? <span className="sr-only"> {newTabLabel}</span> : null}
    </a>
  );
}

export function Contact({ dict, apartment }: SectionProps) {
  const d = dict.contact;
  const { email, phone, whatsapp } = SITE.contact;
  const name = apartment.name;
  const missingData = !email || !phone || !whatsapp;

  return (
    <section id={SECTION_IDS.contact} aria-labelledby="contact-title" className="bg-ink text-white">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <div>
            <Eyebrow className="text-[#a9c4e2]">{d.eyebrow}</Eyebrow>
            <h2 id="contact-title" className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">
              {d.title}
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-white/70">{d.text}</p>

            <div className="mt-8 inline-flex flex-col rounded-xl border border-white/15 px-5 py-4">
              <span className="text-xs font-medium uppercase tracking-[0.16em] text-white/60">
                {d.selectedApartment}
              </span>
              <span key={apartment.id} className="mt-1 font-medium motion-safe:animate-fade-up">
                {name}
              </span>
            </div>
          </div>

          <div>
            <ul className="grid gap-3 sm:grid-cols-2">
              <li className="sm:col-span-2">
                <ContactOption
                  featured
                  icon={IconCalendar}
                  label={d.reserve}
                  detail={email ? d.reserveHint : d.pending}
                  href={mailtoHref(email, {
                    subject: t(d.mailSubject, { name }),
                    body: t(d.mailBody, { name }),
                  })}
                  newTabLabel={dict.common.newTab}
                />
              </li>
              <li>
                <ContactOption
                  icon={IconMail}
                  label={d.email}
                  detail={email ?? d.pending}
                  href={mailtoHref(email)}
                  newTabLabel={dict.common.newTab}
                />
              </li>
              <li>
                <ContactOption
                  icon={IconPhone}
                  label={d.phone}
                  detail={phone ?? d.pending}
                  href={telHref(phone)}
                  newTabLabel={dict.common.newTab}
                />
              </li>
              <li className="sm:col-span-2">
                <ContactOption
                  icon={IconChat}
                  label={d.whatsapp}
                  detail={whatsapp ?? d.pending}
                  href={whatsappHref(whatsapp, t(d.whatsappText, { name }))}
                  external
                  newTabLabel={dict.common.newTab}
                />
              </li>
            </ul>

            {missingData ? (
              <p className="mt-6">
                <PendingBadge tone="dark">{d.pendingNote}</PendingBadge>
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
