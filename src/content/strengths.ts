export const strengthImages = {
  aiSystems: "/strengths/ai-systems.jpg",
  realWorld: "/strengths/real-world.jpg",
  centralize: "/strengths/centralize.jpg",
  production: "/strengths/production.jpg",
  stakeholders: "/strengths/stakeholders.jpg",
} as const;

export type StrengthKey = keyof typeof strengthImages;

export const strengthKeys = [
  "aiSystems",
  "realWorld",
  "centralize",
  "production",
  "stakeholders",
] as const;

export const strengthGridKeys = [
  "realWorld",
  "centralize",
  "production",
  "stakeholders",
] as const;

/** Bento grid placement — 3 columns on md+ */
export const strengthBentoLayout: Record<(typeof strengthKeys)[number], string> = {
  aiSystems: "md:col-span-2 md:row-span-2",
  realWorld: "md:col-span-1",
  centralize: "md:col-span-1",
  production: "md:col-span-2",
  stakeholders: "md:col-span-1",
};

export const strengthPillarMeta = {
  realWorld: {
    accent: "text-emerald-400/90",
    glow: "rgba(52, 211, 153, 0.14)",
  },
  centralize: {
    accent: "text-sky-400/90",
    glow: "rgba(56, 189, 248, 0.14)",
  },
  production: {
    accent: "text-violet-400/90",
    glow: "rgba(167, 139, 250, 0.14)",
  },
  stakeholders: {
    accent: "text-amber-400/90",
    glow: "rgba(251, 191, 36, 0.14)",
  },
} as const;
