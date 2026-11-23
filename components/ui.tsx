import type { ReactNode } from "react";
import { IconClock } from "@/components/icons";

/* Przyciski ----------------------------------------------------------------- */

type ButtonVariant = "primary" | "accent" | "secondary" | "ghost-light";
type ButtonSize = "md" | "lg";

const BUTTON_BASE =
  "inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-colors duration-200 select-none";

const BUTTON_VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-ink text-white hover:bg-graphite",
  accent: "bg-accent text-white hover:bg-accent-strong",
  secondary: "border border-line bg-white text-ink hover:border-ink/40",
  "ghost-light": "border border-white/25 text-white hover:bg-white/10",
};

const BUTTON_SIZES: Record<ButtonSize, string> = {
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

/** Klasy przycisku – do użycia na <a>, <Link> lub <button>. */
export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "lg", extra = "") {
  return `${BUTTON_BASE} ${BUTTON_VARIANTS[variant]} ${BUTTON_SIZES[size]} ${extra}`.trim();
}

/* Kontener i sekcja --------------------------------------------------------- */

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Eyebrow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <p className={`text-xs font-medium uppercase tracking-[0.18em] text-accent ${className}`}>
      {children}
    </p>
  );
}

interface SectionProps {
  id: string;
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: "white" | "mist";
  children: ReactNode;
  /** Dodatkowa treść po prawej stronie nagłówka sekcji (desktop). */
  aside?: ReactNode;
}

export function Section({ id, eyebrow, title, intro, tone = "white", aside, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section
      id={id}
      aria-labelledby={titleId}
      className={tone === "mist" ? "bg-mist" : "bg-white"}
    >
      <Container className="py-20 sm:py-28">
        <div className="mb-10 flex flex-col gap-6 sm:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2
              id={titleId}
              className="mt-3 text-3xl font-medium tracking-tight text-balance text-ink sm:text-4xl"
            >
              {title}
            </h2>
            {intro ? <div className="mt-4 text-base leading-relaxed text-muted">{intro}</div> : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>
        {children}
      </Container>
    </section>
  );
}

/* Stan „do uzupełnienia” ---------------------------------------------------- */

export function PendingBadge({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  const colors =
    tone === "dark"
      ? "border-white/25 text-white/70"
      : "border-line text-muted bg-white";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-dashed px-3 py-1 text-xs ${colors}`}
    >
      <IconClock className="size-3.5" />
      {children}
    </span>
  );
}

/** Link zewnętrzny – otwiera się w nowej karcie, z informacją dla czytników ekranu. */
export function ExternalLink({
  href,
  children,
  className,
  newTabLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  newTabLabel: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
