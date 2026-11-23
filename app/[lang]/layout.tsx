import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { DEFAULT_LOCALE, getDictionary, isLocale, LOCALES } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  const dict = getDictionary(isLocale(lang) ? lang : DEFAULT_LOCALE);
  return {
    metadataBase: new URL(SITE.url ?? "http://localhost:3000"),
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;

  return (
    <html
      lang={isLocale(lang) ? lang : DEFAULT_LOCALE}
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} antialiased`}
    >
      <body className="min-h-dvh bg-white font-sans text-ink">{children}</body>
    </html>
  );
}
