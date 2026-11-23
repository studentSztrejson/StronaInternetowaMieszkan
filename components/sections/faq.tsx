import { IconPlus } from "@/components/icons";
import { Section } from "@/components/ui";
import { t } from "@/lib/format";
import type { Localized } from "@/lib/i18n";
import { GENERAL_FAQ } from "@/lib/site";
import { SECTION_IDS, type SectionProps } from "./types";

interface FaqEntry {
  question: Localized;
  answer: Localized<string | null>;
}

function FaqList({
  title,
  items,
  lang,
  pendingLabel,
}: {
  title: string;
  items: FaqEntry[];
  lang: SectionProps["lang"];
  pendingLabel: string;
}) {
  return (
    <div>
      <h3 className="text-xs font-medium uppercase tracking-[0.16em] text-muted">{title}</h3>
      <div className="mt-4 divide-y divide-line border-y border-line">
        {items.map((item, i) => {
          const answer = item.answer[lang];
          return (
            <details key={i} className="group">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 text-left text-[17px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                {item.question[lang]}
                <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line text-graphite transition-transform duration-300 group-open:rotate-45">
                  <IconPlus className="size-4" />
                </span>
              </summary>
              <p className={`pr-12 pb-6 leading-relaxed ${answer ? "text-graphite" : "text-muted"}`}>
                {answer ?? pendingLabel}
              </p>
            </details>
          );
        })}
      </div>
    </div>
  );
}

export function Faq({ lang, dict, apartment }: SectionProps) {
  const d = dict.faq;
  const hasSpecific = apartment.faq.length > 0;

  return (
    <Section id={SECTION_IDS.faq} tone="mist" eyebrow={d.eyebrow} title={d.title}>
      <div className={`grid gap-12 ${hasSpecific ? "lg:grid-cols-2" : "max-w-3xl"}`}>
        <FaqList title={d.generalLabel} items={GENERAL_FAQ} lang={lang} pendingLabel={d.answerPending} />
        {hasSpecific ? (
          <FaqList
            title={t(d.specificLabel, { name: apartment.shortName })}
            items={apartment.faq}
            lang={lang}
            pendingLabel={d.answerPending}
          />
        ) : null}
      </div>
    </Section>
  );
}
