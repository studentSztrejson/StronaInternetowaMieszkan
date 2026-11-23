/** Zdjęcie przekazywane do galerii (tekst alternatywny już w wybranym języku). */
export interface GalleryItem {
  /** null = placeholder (brak prawdziwego zdjęcia). */
  src: string | null;
  alt: string;
  width?: number;
  height?: number;
}

export interface GalleryLabels {
  regionLabel: string;
  showAll: string;
  openPhoto: string;
  dialogLabel: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  thumbnails: string;
  thumbnail: string;
  placeholderTitle: string;
  placeholderNote: string;
}
