import { cn } from "@/lib/utils";
import { Container } from "./Container";

type SectionShellProps = React.HTMLAttributes<HTMLElement> & {
  id?: string;
  variant?: "default" | "muted" | "brand" | "ambient";
  containerSize?: "default" | "narrow" | "wide";
};

export function SectionShell({
  id,
  variant = "default",
  containerSize = "default",
  className,
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-14 md:py-20",
        id && "scroll-mt-20",
        variant === "brand" && "section-glow",
        className,
      )}
      {...props}
    >
      {(variant === "brand" || variant === "ambient") && (
        <div
          className={cn(
            "pointer-events-none absolute inset-0",
            variant === "brand" &&
              "bg-gradient-to-b from-brand/[0.04] via-transparent to-transparent",
            variant === "ambient" &&
              "bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(56,102,242,0.06),transparent_70%)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(56,102,242,0.12),transparent_70%)]",
          )}
          aria-hidden
        />
      )}
      <Container size={containerSize} className="relative z-10">
        {children}
      </Container>
    </section>
  );
}
