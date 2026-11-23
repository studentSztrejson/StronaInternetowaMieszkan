import Image from "next/image";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import type { GalleryItem, GalleryLabels } from "./types";

interface GalleryMediaProps {
  item: GalleryItem;
  index: number;
  labels: Pick<GalleryLabels, "placeholderTitle" | "placeholderNote">;
  sizes: string;
  fit?: "cover" | "contain";
  compact?: boolean;
  priority?: boolean;
  className?: string;
}

/** Zdjęcie lub placeholder wypełniający kontener (kontener musi mieć position: relative). */
export function GalleryMedia({
  item,
  index,
  labels,
  sizes,
  fit = "cover",
  compact = false,
  priority = false,
  className = "",
}: GalleryMediaProps) {
  if (!item.src) {
    return (
      <PhotoPlaceholder
        index={index}
        title={labels.placeholderTitle}
        note={labels.placeholderNote}
        compact={compact}
        className={className}
      />
    );
  }

  return (
    <Image
      src={item.src}
      alt={item.alt}
      fill
      sizes={sizes}
      // Galeria renderuje wariant desktopowy i mobilny jednocześnie (jeden ukryty przez CSS).
      // Zamiast `preload` (pobrałby zdjęcie dla obu wariantów) używamy wysokiego priorytetu
      // przy leniwym ładowaniu – ukryty wariant nie pobiera wtedy obrazu.
      fetchPriority={priority ? "high" : undefined}
      className={`${fit === "cover" ? "object-cover" : "object-contain"} ${className}`}
    />
  );
}
