import { IconDocument } from "@/components/icons";
import { PendingBadge, Section } from "@/components/ui";
import { TERMS } from "@/lib/site";
import { SECTION_IDS, type SectionProps } from "./types";

export function Terms({ lang, dict }: SectionProps) {
  const d = dict.terms;
  const allPending = TERMS.every((chapter) => chapter.content[lang] === null);

  return (
    <Section
      id={SECTION_IDS.terms}
      eyebrow={d.eyebrow}
      title={d.title}
      intro={d.intro}
      aside={allPending ? <PendingBadge>{d.chapterPending}</PendingBadge> : null}
    >
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {TERMS.map((chapter, i) => {
          const content = chapter.content[lang];
          return (
            <li key={i} className="flex flex-col rounded-2xl border border-line p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium tabular-nums text-accent">§ {i + 1}</span>
                <IconDocument className="size-4 text-[#9aa3ae]" />
              </div>
              <h3 className="mt-4 font-medium text-ink">{chapter.title[lang]}</h3>
              <p className={`mt-2 text-sm leading-relaxed ${content ? "text-graphite" : "text-muted"}`}>
                {content ?? d.chapterPending}
              </p>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}
