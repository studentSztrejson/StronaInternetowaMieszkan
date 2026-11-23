"use client";

import { useRef, useState, type MouseEvent } from "react";
import { IconGrid } from "@/components/icons";
import { t } from "@/lib/format";
import { GalleryMedia } from "./gallery-media";
import { Lightbox } from "./lightbox";
import type { GalleryItem, GalleryLabels } from "./types";

interface GalleryProps {
  items: GalleryItem[];
  apartmentName: string;
  labels: GalleryLabels;
}

/** Układ siatki zależny od liczby zdjęć (desktop). */
function gridLayout(count: number) {
  if (count >= 5) return { grid: "grid-cols-4 grid-rows-2", first: "col-span-2 row-span-2" };
  if (count >= 3) return { grid: "grid-cols-3 grid-rows-2", first: "col-span-2 row-span-2" };
  if (count === 2) return { grid: "grid-cols-2 grid-rows-1", first: "" };
  return { grid: "grid-cols-1 grid-rows-1", first: "" };
}

const TILE =
  "group relative block h-full w-full overflow-hidden bg-mist focus-visible:z-10 focus-visible:outline-offset-[-3px]";
const TILE_MEDIA = "transition-transform duration-700 ease-out group-hover:scale-[1.03]";

export function Gallery({ items, apartmentName, labels }: GalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  // Przycisk, który otworzył podgląd – po zamknięciu wraca na niego fokus
  // (niektóre przeglądarki, np. Safari, nie nadają fokusu przyciskom po kliknięciu).
  const triggerRef = useRef<HTMLElement | null>(null);
  const total = items.length;

  const open = (index: number) => (event: MouseEvent<HTMLElement>) => {
    triggerRef.current = event.currentTarget;
    setOpenIndex(index);
  };

  const close = () => {
    setOpenIndex(null);
    triggerRef.current?.focus({ preventScroll: true });
  };
  if (total === 0) return null;

  const preview = items.slice(0, total >= 5 ? 5 : total >= 3 ? 3 : total);
  const layout = gridLayout(total);
  const openLabel = (i: number) => t(labels.openPhoto, { n: i + 1, total });

  const showAllButton = (className: string) => (
    <button
      type="button"
      onClick={open(0)}
      className={`inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white/95 px-4 py-2 text-sm font-medium text-ink shadow-sm backdrop-blur transition-colors hover:bg-white ${className}`}
    >
      <IconGrid className="size-4" />
      {labels.showAll}
      <span className="text-muted tabular-nums">({total})</span>
    </button>
  );

  return (
    <div role="region" aria-label={t(labels.regionLabel, { name: apartmentName })}>
      {/* Desktop / tablet: siatka */}
      <div className="relative hidden md:block">
        <ul
          className={`grid ${layout.grid} h-[clamp(380px,62vh,600px)] gap-2 overflow-hidden rounded-2xl`}
        >
          {preview.map((item, i) => (
            <li key={i} className={i === 0 ? layout.first : ""}>
              <button
                type="button"
                className={TILE}
                onClick={open(i)}
                aria-label={openLabel(i)}
              >
                <GalleryMedia
                  item={item}
                  index={i}
                  labels={labels}
                  sizes={i === 0 ? "(min-width: 1280px) 640px, 50vw" : "(min-width: 1280px) 320px, 25vw"}
                  compact={i !== 0}
                  priority={i === 0}
                  className={TILE_MEDIA}
                />
              </button>
            </li>
          ))}
        </ul>
        {showAllButton("absolute right-4 bottom-4")}
      </div>

      {/* Telefon: przewijana karuzela */}
      <div className="md:hidden">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 sm:-mx-8 sm:scroll-px-8 sm:px-8">
          {items.map((item, i) => (
            <li key={i} className="aspect-[4/3] w-[86%] shrink-0 snap-start overflow-hidden rounded-xl sm:w-[70%]">
              <button
                type="button"
                className={TILE}
                onClick={open(i)}
                aria-label={openLabel(i)}
              >
                <GalleryMedia
                  item={item}
                  index={i}
                  labels={labels}
                  sizes="86vw"
                  priority={i === 0}
                />
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex justify-end">{showAllButton("")}</div>
      </div>

      {openIndex !== null ? (
        <Lightbox
          items={items}
          startIndex={openIndex}
          title={t(labels.dialogLabel, { name: apartmentName })}
          labels={labels}
          onClose={close}
        />
      ) : null}
    </div>
  );
}
