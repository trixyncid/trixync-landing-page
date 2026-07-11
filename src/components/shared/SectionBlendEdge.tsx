import { cn } from "@/lib/utils";

/** Soft edge fade so hero effects dissolve into the page background */
export function SectionBlendEdge({
  position = "bottom",
  className,
}: {
  position?: "top" | "bottom" | "both";
  className?: string;
}) {
  return (
    <>
      {(position === "top" || position === "both") && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-background to-transparent",
            className,
          )}
        />
      )}
      {(position === "bottom" || position === "both") && (
        <div
          aria-hidden
          className={cn(
            "pointer-events-none absolute inset-x-0 bottom-0 z-20 h-48 bg-gradient-to-t from-background via-background/80 to-transparent md:h-64",
            className,
          )}
        />
      )}
    </>
  );
}
