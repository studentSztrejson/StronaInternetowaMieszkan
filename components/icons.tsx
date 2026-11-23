import type { ReactNode, SVGProps } from "react";

/**
 * Zestaw prostych ikon liniowych (24×24, obrys 1.5) – bez zewnętrznych bibliotek.
 * Ikony są dekoracyjne (aria-hidden); znaczenie przekazuje tekst lub aria-label rodzica.
 */
export type IconProps = SVGProps<SVGSVGElement>;

function Svg({ children, ...props }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* Interfejs ----------------------------------------------------------------- */

export const IconClose = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </Svg>
);

export const IconMenu = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 8h16M4 16h16" />
  </Svg>
);

export const IconChevronLeft = (p: IconProps) => (
  <Svg {...p}>
    <path d="M15 5l-7 7 7 7" />
  </Svg>
);

export const IconChevronRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M9 5l7 7-7 7" />
  </Svg>
);

export const IconArrowUpRight = (p: IconProps) => (
  <Svg {...p}>
    <path d="M7 17L17 7M9 7h8v8" />
  </Svg>
);

export const IconArrowUp = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </Svg>
);

export const IconGrid = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="6" height="6" rx="1" />
    <rect x="14" y="4" width="6" height="6" rx="1" />
    <rect x="4" y="14" width="6" height="6" rx="1" />
    <rect x="14" y="14" width="6" height="6" rx="1" />
  </Svg>
);

export const IconPlus = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
);

export const IconClock = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </Svg>
);

export const IconImage = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="4.5" width="18" height="15" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.5" />
    <path d="M21 15.5l-5-5-9 9" />
  </Svg>
);

export const IconMapPin = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21s-6.5-5.8-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 15.2 12 21 12 21z" />
    <circle cx="12" cy="9.8" r="2.3" />
  </Svg>
);

export const IconMail = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3.5 6.5l8.5 6 8.5-6" />
  </Svg>
);

export const IconPhone = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3.5h2.6l1.6 4.2-2 1.4a11 11 0 0 0 6.2 6.2l1.4-2 4.2 1.6v2.6a2 2 0 0 1-2.1 2A15.5 15.5 0 0 1 4.5 5.6a2 2 0 0 1 2-2.1z" />
  </Svg>
);

export const IconChat = (p: IconProps) => (
  <Svg {...p}>
    <path d="M20 11.6a8 8 0 0 1-11.7 7.1L4 20l1.3-4.1A8 8 0 1 1 20 11.6z" />
    <path d="M9 10.5h6M9 13.5h4" />
  </Svg>
);

export const IconCalendar = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
    <path d="M3.5 10h17M8 3v4M16 3v4" />
  </Svg>
);

export const IconStar = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />
  </Svg>
);

export const IconShieldCheck = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3l7 3v5.2c0 4.6-3 8.3-7 9.8-4-1.5-7-5.2-7-9.8V6z" />
    <path d="M9 12l2 2 4-4" />
  </Svg>
);

export const IconDocument = (p: IconProps) => (
  <Svg {...p}>
    <path d="M6.5 3h7.5l4.5 4.5V21h-12z" />
    <path d="M14 3v4.5h4.5M9.5 12.5h5M9.5 16h5" />
  </Svg>
);

export const IconBuilding = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 21V5.5L12 3v18M12 7.5l7.5 2V21M3 21h18" />
    <path d="M7.5 8.5h1.5M7.5 12h1.5M7.5 15.5h1.5M15 12.5h1.5M15 16h1.5" />
  </Svg>
);

/* Parametry apartamentu ----------------------------------------------------- */

export const IconUsers = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0M15.5 5.6a3.2 3.2 0 0 1 0 5.8M17.5 14.3a5.5 5.5 0 0 1 3 5.2" />
  </Svg>
);

export const IconBed = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 18.5V6.5M3 13.5h18v5M21 13.5a3 3 0 0 0-3-3h-7v3" />
    <circle cx="7" cy="10.8" r="1.6" />
  </Svg>
);

export const IconBath = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 12h17v1.5a5 5 0 0 1-5 5h-7a5 5 0 0 1-5-5z" />
    <path d="M6 12V6.2a2 2 0 0 1 3.6-1.2M7 18.5L6 20.5M17 18.5l1 2" />
  </Svg>
);

export const IconArea = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
  </Svg>
);

/* Udogodnienia -------------------------------------------------------------- */

export const IconWifi = (p: IconProps) => (
  <Svg {...p}>
    <path d="M2.5 9.5a13.5 13.5 0 0 1 19 0M5.5 12.6a9.2 9.2 0 0 1 13 0M8.5 15.6a5 5 0 0 1 7 0" />
    <circle cx="12" cy="18.6" r=".9" fill="currentColor" />
  </Svg>
);

export const IconKitchen = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 10h18M5 10v6.5A3.5 3.5 0 0 0 8.5 20h7a3.5 3.5 0 0 0 3.5-3.5V10" />
    <path d="M9 7c0-1.4 1.3-2.5 3-2.5s3 1.1 3 2.5" />
  </Svg>
);

export const IconCoffee = (p: IconProps) => (
  <Svg {...p}>
    <path d="M4.5 9.5h11v4.5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
    <path d="M15.5 10.5h1.3a2.4 2.4 0 0 1 0 4.8h-1.6M8 3.5v2.5M11.5 3.5v2.5" />
  </Svg>
);

export const IconSnowflake = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9" />
    <path d="M9.5 4.5L12 6.5l2.5-2M9.5 19.5L12 17.5l2.5 2" />
  </Svg>
);

export const IconFlame = (p: IconProps) => (
  <Svg {...p}>
    <path d="M12 21a6 6 0 0 0 6-6c0-3.8-2.7-6-3.8-9.8-1.9 1.7-3 3.7-3 5.8-.9-.7-1.5-1.8-1.6-3C7.4 9.8 6 12.2 6 15a6 6 0 0 0 6 6z" />
  </Svg>
);

export const IconWasher = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="3" width="15" height="18" rx="2" />
    <circle cx="12" cy="13.5" r="4" />
    <path d="M8 6.5h.01M11 6.5h.01" />
  </Svg>
);

export const IconTv = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M8.5 20.5h7M12 17v3.5" />
  </Svg>
);

export const IconLaptop = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="5" width="14" height="10" rx="1.5" />
    <path d="M3 19h18" />
  </Svg>
);

export const IconElevator = (p: IconProps) => (
  <Svg {...p}>
    <rect x="5" y="3" width="14" height="18" rx="2" />
    <path d="M9 9.5l3-3 3 3M9 14.5l3 3 3-3" />
  </Svg>
);

export const IconParking = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4" y="4" width="16" height="16" rx="3.5" />
    <path d="M10 16.5v-9h3a2.5 2.5 0 0 1 0 5h-3" />
  </Svg>
);

export const IconBalcony = (p: IconProps) => (
  <Svg {...p}>
    <path d="M8 13V4h8v9M3.5 13h17M4 21h16M6 13v8M10 13v8M14 13v8M18 13v8" />
  </Svg>
);

export const IconOven = (p: IconProps) => (
  <Svg {...p}>
    <rect x="3.5" y="4" width="17" height="16" rx="2" />
    <path d="M3.5 8.5h17M7 6.25h.01M10 6.25h.01" />
    <rect x="7" y="11.5" width="10" height="5.5" rx="1" />
  </Svg>
);

export const IconDishwasher = (p: IconProps) => (
  <Svg {...p}>
    <rect x="4.5" y="3" width="15" height="18" rx="2" />
    <path d="M4.5 7.5h15M8 5.25h.01M8.5 17.5h7M9 15a3 3 0 0 1 6 0" />
  </Svg>
);

export const IconHairDryer = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="9" cy="9" r="5" />
    <circle cx="9" cy="9" r="1.6" />
    <path d="M13.6 7l6.4-1.5v7L13.6 11M8 14l-1.2 6.5h3L11 13.8" />
  </Svg>
);

export const IconTerrace = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 20.5h18M5 20.5v-4h14v4M12 16.5V9" />
    <path d="M12 11c-2.6 0-4.2-1.6-4.2-4.2 2.6 0 4.2 1.6 4.2 4.2zM12 10c0-2.6 1.6-4.2 4.2-4.2 0 2.6-1.6 4.2-4.2 4.2z" />
  </Svg>
);

export const IconSkyline = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3 20.5h18M5 20.5v-7h3v7M8 20.5V8h4v12.5M12 20.5v-9h3v9M15 20.5V5h4v15.5M17 5V3" />
  </Svg>
);

export const IconPlayground = (p: IconProps) => (
  <Svg {...p}>
    <path d="M3.5 20.5L7.5 4h9l4 16.5M7.5 4h9M10 4v9M14 4v9M9 13h6" />
  </Svg>
);

export const IconKey = (p: IconProps) => (
  <Svg {...p}>
    <circle cx="8" cy="15.5" r="3.8" />
    <path d="M10.7 12.8L19.5 4M16.5 7l2.3 2.3M14.2 9.3l1.8 1.8" />
  </Svg>
);
