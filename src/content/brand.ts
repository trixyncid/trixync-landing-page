export type LogoVariant = "full" | "text" | "icon";

export const brandAssets = {
  full: {
    light: "/brand/logo-full.svg",
    dark: "/brand/logo-full-white.svg",
    width: 783,
    height: 448,
  },
  text: {
    light: "/brand/logo-text.svg",
    dark: "/brand/logo-text-white.svg",
    width: 783,
    height: 67,
  },
  icon: {
    light: "/brand/logo-icon.svg",
    dark: "/brand/logo-icon-white.svg",
    width: 356,
    height: 316,
  },
} as const;

export const logoSizes = {
  sm: {
    full: "h-8",
    text: "h-5",
    icon: "h-7 w-7",
  },
  md: {
    full: "h-10",
    text: "h-6",
    icon: "h-8 w-8",
  },
  lg: {
    full: "h-12",
    text: "h-7",
    icon: "h-10 w-10",
  },
} as const;

export type LogoSize = keyof typeof logoSizes;
