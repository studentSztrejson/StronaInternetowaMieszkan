"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { IconChevronLeft, IconChevronRight, IconClose } from "@/components/icons";
import { t } from "@/lib/format";
import { GalleryMedia } from "./gallery-media";
import type { GalleryItem, GalleryLabels } from "./types";

interface LightboxProps {
  items: GalleryItem[];
  startIndex: number;
  title: string;
  labels: GalleryLabels;
  onClose: () => void;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Pełnoekranowy podgląd galerii oparty na natywnym <dialog>:
 * – pułapka fokusu, Escape i przywrócenie fokusu zapewnia przeglądarka,
 * – przewijanie poziome ze scroll-snap (gest przesunięcia na telefonach),
 * – klawiatura: ← → Home End, Escape zamyka.
 */
export function Lightbox({ items, startIndex, title, labels, onClose }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(startIndex);
  const indexRef = useRef(startIndex);
  const total = items.length;

  // Otwórz dialog i przewiń do klikniętego zdjęcia.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
    const track = trackRef.current;
    if (track) track.scrollTo({ left: startIndex * track.clientWidth, behavior: "instant" });
  }, [startIndex]);

  // Po zmianie rozmiaru okna utrzymaj bieżące zdjęcie w kadrze.
  useEffect(() => {
    const onResize = () => {
      const track = trackRef.current;
      if (track) track.scrollTo({ left: indexRef.current * track.clientWidth, behavior: "instant" });
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      const target = Math.max(0, Math.min(total - 1, next));
      const track = trackRef.current;
      indexRef.current = target;
      setIndex(target);
      track?.scrollTo({
        left: target * track.clientWidth,
        behavior: prefersReducedMotion() ? "instant" : "smooth",
      });
    },
    [total],
  );

  const handleScroll = () => {
    const track = trackRef.current;
    if (!track || track.clientWidth === 0) return;
    const current = Math.round(track.scrollLeft / track.clientWidth);
    if (current !== indexRef.current) {
      indexRef.current = current;
      setIndex(current);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    const keyMap: Record<string, number> = {
      ArrowRight: indexRef.current + 1,
      ArrowLeft: indexRef.current - 1,
      Home: 0,
      End: total - 1,
    };
    if (event.key in keyMap) {
      event.preventDefault();
      goTo(keyMap[event.key]);
    }
  };

  const counterText = t(labels.counter, { n: index + 1, total });

  return (
    <dialog
      ref={dialogRef}
      aria-label={title}
      onClose={onClose}
      onKeyDown={handleKeyDown}
      className="lightbox fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-hidden bg-[#101215] p-0 text-white backdrop:bg-black/80"
    >
      <div className="flex h-full flex-col">
        {/* Pasek górny */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/10"
            aria-label={labels.close}
          >
            <IconClose className="size-6" />
          </button>
          <p className="min-w-0 truncate text-sm text-white/70" aria-hidden="true">
            {title}
          </p>
          <p className="shrink-0 text-sm whitespace-nowrap tabular-nums text-white/90" aria-hidden="true">
            {index + 1} / {total}
          </p>
        </div>

        {/* Zdjęcia */}
        <div className="relative min-h-0 flex-1">
          <div
            ref={trackRef}
            onScroll={handleScroll}
            className="no-scrollbar flex h-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
          >
            {items.map((item, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={t(labels.counter, { n: i + 1, total })}
                aria-hidden={i !== index}
                className="flex h-full w-full shrink-0 snap-center items-center justify-center px-3 sm:px-20"
              >
                {item.src ? (
                  <div className="relative h-full w-full max-w-6xl">
                    <GalleryMedia item={item} index={i} labels={labels} sizes="100vw" fit="contain" />
                  </div>
                ) : (
                  <div className="relative aspect-[3/2] w-full max-w-4xl overflow-hidden rounded-xl">
                    <GalleryMedia item={item} index={i} labels={labels} sizes="100vw" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-disabled={index === 0}
                aria-label={labels.previous}
                className="absolute top-1/2 left-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 aria-disabled:cursor-default aria-disabled:opacity-30 sm:left-5 sm:inline-flex"
              >
                <IconChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-disabled={index === total - 1}
                aria-label={labels.next}
                className="absolute top-1/2 right-2 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur transition hover:bg-white/20 aria-disabled:cursor-default aria-disabled:opacity-30 sm:right-5 sm:inline-flex"
              >
                <IconChevronRight className="size-6" />
              </button>
            </>
          ) : null}
        </div>

        {/* Pasek dolny: miniatury (desktop) / strzałki (telefon) */}
        <div className="flex items-center justify-center gap-3 px-4 py-4 sm:py-5">
          {total > 1 ? (
            <>
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-disabled={index === 0}
                aria-label={labels.previous}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white aria-disabled:opacity-30 sm:hidden"
              >
                <IconChevronLeft className="size-5" />
              </button>
              <ul aria-label={labels.thumbnails} className="no-scrollbar hidden max-w-full gap-2 overflow-x-auto p-1 sm:flex">
                {items.map((item, i) => (
                  <li key={i} className="shrink-0">
                    <button
                      type="button"
                      onClick={() => goTo(i)}
                      aria-label={t(labels.thumbnail, { n: i + 1 })}
                      aria-current={i === index ? "true" : undefined}
                      className={`relative block h-12 w-18 overflow-hidden rounded-md transition-opacity ${
                        i === index ? "opacity-100 ring-2 ring-white" : "opacity-50 hover:opacity-80"
                      }`}
                    >
                      <GalleryMedia item={item} index={i} labels={labels} sizes="72px" compact />
                    </button>
                  </li>
                ))}
              </ul>
              <span className="text-sm tabular-nums text-white/80 sm:hidden" aria-hidden="true">
                {index + 1} / {total}
              </span>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-disabled={index === total - 1}
                aria-label={labels.next}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/20 text-white aria-disabled:opacity-30 sm:hidden"
              >
                <IconChevronRight className="size-5" />
              </button>
            </>
          ) : null}
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {counterText}
        </p>
      </div>
    </dialog>
  );
}
