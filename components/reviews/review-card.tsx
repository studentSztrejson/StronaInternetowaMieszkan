"use client";

import { useId, useState } from "react";
import { IconArrowUpRight, IconStar } from "@/components/icons";

export interface ReviewCardProps {
  text: string;
  /** Język treści opinii (atrybut lang). */
  textLang: string | null;
  /** Ocena gotowa do wyświetlenia, np. { value: "5,0", scale: 5, label: "Ocena 5,0 na 5" }. */
  rating: { value: string; scale: number; label: string } | null;
  /** Atrybucja autora – dla Google wymagana nazwa i link do profilu. */
  author: { name: string; url: string | null } | null;
  /** Data już sformatowana w języku strony. */
  date: string | null;
  sourceLabel: string;
  originalUrl: string | null;
  labels: { readMore: string; showLess: string; viewOriginal: string; newTab: string };
}

/** Długość, powyżej której treść jest skracana i pojawia się przycisk „Rozwiń opinię”. */
const COLLAPSE_AFTER = 280;

/**
 * Minimalistyczna karta opinii (ręcznie dodanej lub z Google Places API).
 * Nie używać z danymi przykładowymi – wyłącznie z prawdziwymi opiniami.
 */
export function ReviewCard({ text, textLang, rating, author, date, sourceLabel, originalUrl, labels }: ReviewCardProps) {
  const [expanded, setExpanded] = useState(false);
  const textId = useId();
  const collapsible = text.length > COLLAPSE_AFTER;

  return (
    <article className="flex h-full flex-col rounded-2xl border border-line/70 bg-white p-6">
      {rating ? (
        <p className="flex items-center gap-1.5 text-sm text-graphite">
          <IconStar className="size-4 text-accent" />
          <span aria-hidden="true" className="font-medium tabular-nums text-ink">
            {rating.value}/{rating.scale}
          </span>
          <span className="sr-only">{rating.label}</span>
        </p>
      ) : null}

      <div className="mt-3 flex-1">
        <p
          id={textId}
          lang={textLang ?? undefined}
          className={`leading-relaxed text-graphite ${collapsible && !expanded ? "line-clamp-5" : ""}`}
        >
          {text}
        </p>
        {collapsible ? (
          <button
            type="button"
            aria-expanded={expanded}
            aria-controls={textId}
            onClick={() => setExpanded((value) => !value)}
            className="mt-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
          >
            {expanded ? labels.showLess : labels.readMore}
          </button>
        ) : null}
      </div>

      <footer className="mt-5 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4 text-sm">
        <div className="min-w-0">
          {author ? (
            author.url ? (
              <a href={author.url} target="_blank" rel="noopener noreferrer" className="font-medium text-ink hover:underline">
                {author.name}
                <span className="sr-only"> {labels.newTab}</span>
              </a>
            ) : (
              <span className="font-medium text-ink">{author.name}</span>
            )
          ) : null}
          <p className="text-xs text-muted">
            {sourceLabel}
            {date ? ` · ${date}` : null}
          </p>
        </div>
        {originalUrl ? (
          <a
            href={originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-ink"
          >
            {labels.viewOriginal}
            <IconArrowUpRight className="size-3.5" />
            <span className="sr-only"> {labels.newTab}</span>
          </a>
        ) : null}
      </footer>
    </article>
  );
}
