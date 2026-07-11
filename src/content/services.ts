export type ServiceCategory = "systems" | "iot" | "platform" | "infrastructure";

export type ServiceItem = {
  id: string;
  category: ServiceCategory;
  icon: "workflow" | "cpu" | "layers" | "shield";
};

export const services: ServiceItem[] = [
  {
    id: "workflow-systems",
    category: "systems",
    icon: "workflow",
  },
  {
    id: "iot-integration",
    category: "iot",
    icon: "cpu",
  },
  {
    id: "platform-centralization",
    category: "platform",
    icon: "layers",
  },
  {
    id: "production-infrastructure",
    category: "infrastructure",
    icon: "shield",
  },
];

export const serviceCategoryKeys: Record<ServiceCategory, string> = {
  systems: "categorySystems",
  iot: "categoryIot",
  platform: "categoryPlatform",
  infrastructure: "categoryInfrastructure",
};

export const serviceFilterKeys = ["all", "systems", "iot", "platform", "infrastructure"] as const;

export type ServiceFilterKey = (typeof serviceFilterKeys)[number];

export const processStepKeys = ["discover", "design", "deliver", "support"] as const;

export type ProcessStepKey = (typeof processStepKeys)[number];

export function servicesForFilter(filter: ServiceFilterKey): ServiceItem[] {
  if (filter === "all") return [...services];
  return services.filter((service) => service.category === filter);
}

export const serviceVisualMeta: Record<
  ServiceItem["id"],
  { accent: string; glow: string; iconBg: string }
> = {
  "workflow-systems": {
    accent: "text-brand dark:text-brand-light",
    glow: "rgba(56, 102, 242, 0.12)",
    iconBg: "bg-brand/10 dark:bg-brand/15",
  },
  "iot-integration": {
    accent: "text-emerald-600 dark:text-emerald-400",
    glow: "rgba(52, 211, 153, 0.12)",
    iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
  },
  "platform-centralization": {
    accent: "text-sky-600 dark:text-sky-400",
    glow: "rgba(56, 189, 248, 0.12)",
    iconBg: "bg-sky-500/10 dark:bg-sky-500/15",
  },
  "production-infrastructure": {
    accent: "text-violet-600 dark:text-violet-400",
    glow: "rgba(139, 92, 246, 0.12)",
    iconBg: "bg-violet-500/10 dark:bg-violet-500/15",
  },
};
