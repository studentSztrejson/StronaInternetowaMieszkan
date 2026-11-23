import { IconImage } from "@/components/icons";

interface PhotoPlaceholderProps {
  index: number;
  title: string;
  note: string;
  /** Wersja kompaktowa – bez opisu (miniatury, małe kafelki). */
  compact?: boolean;
  className?: string;
}

/**
 * Wizualny placeholder zdjęcia. Wyraźnie oznaczony jako tymczasowy –
 * nie jest przedstawiany jako autentyczna fotografia apartamentu.
 */
export function PhotoPlaceholder({ index, title, note, compact = false, className = "" }: PhotoPlaceholderProps) {
  return (
    <div
      className={`placeholder-pattern relative flex h-full w-full items-center justify-center overflow-hidden bg-[#eef1f4] text-[#5f6975] ${className}`}
    >
      <div className="pointer-events-none absolute inset-3 rounded-[inherit] border border-dashed border-[#c9d1da]" />
      {compact ? (
        <IconImage className="size-5" />
      ) : (
        <div className="relative flex flex-col items-center gap-2 px-6 text-center">
          <IconImage className="size-7 text-accent/70" />
          <p className="text-sm font-medium text-[#5d6672]">
            {title} <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
          </p>
          <p className="text-[11px] uppercase tracking-[0.14em]">{note}</p>
        </div>
      )}
    </div>
  );
}
