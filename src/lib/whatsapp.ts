/** Normalize Indonesian/local numbers to wa.me format (digits only, 62 prefix). */
export function normalizeWhatsAppNumber(number: string): string {
  const digits = number.replace(/\D/g, "");
  if (digits.startsWith("0")) return `62${digits.slice(1)}`;
  if (digits.startsWith("62")) return digits;
  return digits;
}

export function buildWhatsAppUrl(number: string, message?: string): string {
  const phone = normalizeWhatsAppNumber(number);
  const base = `https://wa.me/${phone}`;
  if (!message?.trim()) return base;
  return `${base}?text=${encodeURIComponent(message.trim())}`;
}

type ContactWhatsAppField = {
  label: string;
  value: string;
};

export function buildContactWhatsAppMessage({
  intro,
  fields,
}: {
  intro: string;
  fields: ContactWhatsAppField[];
}): string {
  const lines = [
    intro,
    "",
    ...fields
      .filter((field) => field.value.trim().length > 0)
      .map((field) => `${field.label}: ${field.value.trim()}`),
  ];

  return lines.join("\n");
}
