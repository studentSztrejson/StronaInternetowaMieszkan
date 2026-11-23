import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Wordmark } from "@/components/site-header";
import { buttonClasses } from "@/components/ui";
import { DEFAULT_APARTMENT_ID, apartmentPath } from "@/lib/apartments";
import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

const dict = getDictionary(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: `404 — ${dict.notFound.title}`,
};

/** 404 dla adresów, które nie pasują do żadnej trasy (root layout jest w app/[lang]). */
export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} className={`${geistSans.variable} antialiased`}>
      <body className="bg-white font-sans text-ink">
        <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 text-center">
          <Wordmark />
          <h1 className="mt-6 text-3xl font-medium tracking-tight">{dict.notFound.title}</h1>
          <p className="max-w-md text-muted">{dict.notFound.text}</p>
          <Link href={apartmentPath(DEFAULT_LOCALE, DEFAULT_APARTMENT_ID)} className={buttonClasses("primary", "lg")}>
            {dict.notFound.back}
          </Link>
        </main>
      </body>
    </html>
  );
}
