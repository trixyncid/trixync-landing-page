import { cn } from "@/lib/utils";

export function SectionSkeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-muted/50",
        className ?? "h-64 w-full",
      )}
      aria-hidden
    />
  );
}
