"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { IconClose, IconMenu } from "@/components/icons";
import { buttonClasses } from "@/components/ui";

export interface NavItem {
  href: string;
  label: string;
}

export interface LanguageOption {
  code: string;
  label: string;
  href: string;
  active: boolean;
}

interface SiteHeaderProps {
  homeHref: string;
  homeLabel: string;
  navLabel: string;
  nav: NavItem[];
  languages: LanguageOption[];
  languageLabel: string;
  contactLabel: string;
  menuOpenLabel: string;
  menuCloseLabel: string;
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <span
        aria-hidden="true"
        className="inline-flex size-8 items-center justify-center rounded-lg bg-accent text-[13px] font-semibold tracking-tight text-white"
      >
        PB
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight">Premium Blue</span>
        <span className="mt-1 text-[10px] font-medium uppercase tracking-[0.28em] opacity-60">
          Apartments
        </span>
      </span>
    </span>
  );
}

function LanguageSwitcher({ languages, label }: { languages: LanguageOption[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex items-center rounded-full border border-line p-0.5 text-xs font-medium">
        {languages.map((lang) => (
          <li key={lang.code}>
            <Link
              href={lang.href}
              scroll={false}
              hrefLang={lang.code}
              lang={lang.code}
              aria-current={lang.active ? "true" : undefined}
              className={`inline-flex h-8 min-w-10 items-center justify-center rounded-full px-2.5 uppercase tracking-wide transition-colors ${
                lang.active ? "bg-ink text-white" : "text-muted hover:text-ink"
              }`}
            >
              {lang.code}
              <span className="sr-only"> – {lang.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function SiteHeader({
  homeHref,
  homeLabel,
  navLabel,
  nav,
  languages,
  languageLabel,
  contactLabel,
  menuOpenLabel,
  menuCloseLabel,
}: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();

  // Escape zamyka menu mobilne.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const contactHref = nav.find((item) => item.href === "#contact")?.href ?? "#contact";

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-white/90 backdrop-blur-md supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-6 px-5 sm:h-20 sm:px-8">
        <Link href={homeHref} scroll={false} aria-label={homeLabel} className="shrink-0 text-ink">
          <Wordmark />
        </Link>

        <nav aria-label={navLabel} className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-full px-3 py-2 text-sm text-graphite transition-colors hover:bg-mist hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher languages={languages} label={languageLabel} />
          <a href={contactHref} className={buttonClasses("primary", "md", "max-sm:hidden")}>
            {contactLabel}
          </a>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full text-ink transition-colors hover:bg-mist xl:hidden"
            aria-expanded={menuOpen}
            aria-controls={menuId}
            aria-label={menuOpen ? menuCloseLabel : menuOpenLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose className="size-6" /> : <IconMenu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Menu mobilne */}
      <div
        id={menuId}
        hidden={!menuOpen}
        className="border-t border-line bg-white xl:hidden"
      >
        <nav aria-label={navLabel} className="mx-auto max-w-7xl px-5 py-4 sm:px-8">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-between border-b border-line/70 py-3.5 text-base text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={contactHref}
            onClick={() => setMenuOpen(false)}
            className={buttonClasses("primary", "lg", "mt-5 w-full sm:hidden")}
          >
            {contactLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
