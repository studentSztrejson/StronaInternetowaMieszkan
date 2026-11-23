import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // Root layout jest w app/[lang], więc 404 dla nieznanych ścieżek obsługuje app/global-not-found.tsx.
    globalNotFound: true,
  },
  // Domyślny widok: polski + Grzybowska 37 (zgodnie z DEFAULT_LOCALE i DEFAULT_APARTMENT_ID w lib/).
  async redirects() {
    return [
      { source: "/", destination: "/pl/grzybowska-37", permanent: false },
      { source: "/:lang(pl|en)", destination: "/:lang/grzybowska-37", permanent: false },
    ];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
