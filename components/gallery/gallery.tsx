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

/** Układ siatki zależny od liczby zdjęć (desktop). cols/rows/firstSpan służą do obliczenia `sizes`. */
function gridLayout(count: number) {
  if (count >= 5) return { grid: "grid-cols-4 grid-rows-2", first: "col-span-2 row-span-2", cols: 4, rows: 2, firstSpan: 2 };
  if (count >= 3) return { grid: "grid-cols-3 grid-rows-2", first: "col-span-2 row-span-2", cols: 3, rows: 2, firstSpan: 2 };
  if (count === 2) return { grid: "grid-cols-2 grid-rows-1", first: "", cols: 2, rows: 1, firstSpan: 1 };
  return { grid: "grid-cols-1 grid-rows-1", first: "", cols: 1, rows: 1, firstSpan: 1 };
}

/*
 * Geometria siatki – musi odpowiadać klasom poniżej:
 * Container (max-w-7xl = 1280px, px-8 = 2×32px), gap-2 (8px), h-[clamp(380px,62vh,600px)].
 */
const GRID_MAX_WIDTH = 1280;
const GRID_PADDING = 64;
const GRID_GAP = 8;
const GRID_HEIGHT = "clamp(380px, 62vh, 600px)";
const GRID_MAX_HEIGHT = 600;

/**
 * Atrybut `sizes` dla kafelka siatki.
 *
 * Kafelki mają `object-cover`, więc zdjęcie jest rysowane szerzej niż kafelek,
 * gdy jego proporcje są „szersze” niż proporcje kafelka (np. zdjęcie 3:2 w prawie
 * kwadratowym kafelku jest skalowane do wysokości). Rzeczywista szerokość rysowania to
 * max(szerokość kafelka, wysokość kafelka × proporcje zdjęcia). Podanie samej szerokości
 * kafelka powodowało wybór zbyt małego wariantu i powiększanie (rozmycie) zdjęcia.
 */
function tileSizes(item: GalleryItem, layout: ReturnType<typeof gridLayout>, span: number) {
  const aspect = item.width && item.height ? item.width / item.height : 3 / 2;
  const colFrac = span / layout.cols;
  const rowFrac = span / layout.rows;
  const fixedW = (GRID_PADDING + (layout.cols - 1) * GRID_GAP) * colFrac - (span - 1) * GRID_GAP;
  const fixedH = (layout.rows - 1) * GRID_GAP * rowFrac - (span - 1) * GRID_GAP;

  const width = `calc(min(100vw, ${GRID_MAX_WIDTH}px) * ${colFrac} - ${fixedW}px)`;
  const height = `calc(${GRID_HEIGHT} * ${rowFrac} - ${fixedH}px)`;
  const drawn = `max(${width}, calc(${height} * ${aspect.toFixed(3)}))`;

  // Zapas dla przeglądarek bez obsługi max()/clamp() w `sizes`: rozmiar przy maksymalnej siatce.
  const fallback = Math.round(
    Math.max(GRID_MAX_WIDTH * colFrac - fixedW, (GRID_MAX_HEIGHT * rowFrac - fixedH) * aspect),
  );
  // Poniżej 768px siatka jest ukryta (md:block) – minimalny rozmiar, żeby np. po zwężeniu
  // okna przeglądarka nie dociągała dużego wariantu dla niewidocznego zdjęcia.
  return `(min-width: 768px) ${drawn}, (min-width: 768px) ${fallback}px, 64px`;
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
                  sizes={tileSizes(item, layout, i === 0 ? layout.firstSpan : 1)}
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
