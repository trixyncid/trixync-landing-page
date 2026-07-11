export const faqIds = [
  "what-is-trixync",
  "engagement-process",
  "timeline",
  "pricing",
  "iot-capability",
  "post-launch",
  "industries",
  "remote-work",
  "medan-based",
  "maintenance",
] as const;

export type FaqId = (typeof faqIds)[number];

export const faqCategoryKeys = ["all", "studio", "process", "technical", "support"] as const;

export type FaqCategoryKey = (typeof faqCategoryKeys)[number];

export const faqCategoryMap: Record<FaqId, Exclude<FaqCategoryKey, "all">> = {
  "what-is-trixync": "studio",
  industries: "studio",
  "medan-based": "studio",
  "engagement-process": "process",
  timeline: "process",
  pricing: "process",
  "iot-capability": "technical",
  maintenance: "technical",
  "post-launch": "support",
  "remote-work": "support",
};

export function faqIdsForCategory(category: FaqCategoryKey): FaqId[] {
  if (category === "all") return [...faqIds];
  return faqIds.filter((id) => faqCategoryMap[id] === category);
}
