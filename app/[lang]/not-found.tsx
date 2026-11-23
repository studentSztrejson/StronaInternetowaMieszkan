import Link from "next/link";
import { Wordmark } from "@/components/site-header";
import { buttonClasses } from "@/components/ui";
import { DEFAULT_APARTMENT_ID, apartmentPath } from "@/lib/apartments";
import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";

/** 404 w obrębie /{lang}/... – np. nieznany apartament. */
export default function NotFound() {
  const dict = getDictionary(DEFAULT_LOCALE);
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-6 px-5 text-center">
      <Wordmark className="text-ink" />
      <h1 className="mt-6 text-3xl font-medium tracking-tight text-ink">{dict.notFound.title}</h1>
      <p className="max-w-md text-muted">{dict.notFound.text}</p>
      <Link href={apartmentPath(DEFAULT_LOCALE, DEFAULT_APARTMENT_ID)} className={buttonClasses("primary", "lg")}>
        {dict.notFound.back}
      </Link>
    </main>
  );
}
