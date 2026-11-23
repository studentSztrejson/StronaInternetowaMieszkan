"use client";

import { useState } from "react";
import { IconMapPin } from "@/components/icons";
import { buttonClasses } from "@/components/ui";

interface MapPanelProps {
  /** Adres src iframe z Google Maps („Umieść mapę”). null = placeholder. */
  embedUrl: string | null;
  title: string;
  labels: {
    mapLabel: string;
    mapPlaceholder: string;
    mapLoad: string;
    mapConsent: string;
  };
}

/** Stylizowany, dekoracyjny „plan miasta” – wyświetlany zanim mapa zostanie załadowana. */
function DecorativeMap() {
  return (
    <svg
      viewBox="0 0 400 260"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <rect width="400" height="260" fill="#eef1f4" />
      <rect x="250" y="140" width="110" height="70" rx="10" fill="#e4eaf0" />
      <rect x="30" y="20" width="70" height="45" rx="8" fill="#e4eaf0" />
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M-10 92 L410 128" strokeWidth="12" />
        <path d="M128 -10 L168 270" strokeWidth="12" />
        <path d="M-10 212 Q200 176 410 220" strokeWidth="9" />
        <path d="M-10 40 L410 62" strokeWidth="5" />
        <path d="M62 -10 L84 270" strokeWidth="5" />
        <path d="M270 -10 L238 270" strokeWidth="7" />
        <path d="M338 -10 L356 270" strokeWidth="5" />
        <path d="M-10 160 L410 168" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function MapPanel({ embedUrl, title, labels }: MapPanelProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      role="region"
      aria-label={labels.mapLabel}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line bg-mist sm:aspect-[16/11]"
    >
      {loaded && embedUrl ? (
        <iframe
          src={embedUrl}
          title={title}
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <>
          <DecorativeMap />
          {/* Pinezka */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full" aria-hidden="true">
            <span className="flex size-12 items-center justify-center rounded-full bg-accent text-white shadow-[0_8px_20px_-6px_rgba(45,91,136,0.6)]">
              <IconMapPin className="size-6" />
            </span>
          </div>
          <div className="absolute inset-x-4 bottom-4 flex flex-col items-start gap-3 rounded-xl bg-white/95 p-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            {embedUrl ? (
              <>
                <p className="text-sm text-muted">{labels.mapConsent}</p>
                <button
                  type="button"
                  onClick={() => setLoaded(true)}
                  className={buttonClasses("primary", "md")}
                >
                  {labels.mapLoad}
                </button>
              </>
            ) : (
              <p className="text-sm text-muted">{labels.mapPlaceholder}</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
