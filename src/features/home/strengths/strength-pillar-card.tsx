"use client";

import { useState } from "react";
import { useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import { useMobileLite } from "@/hooks/use-mobile-lite";
import { cn } from "@/lib/utils";

type StrengthPillarCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: string;
  glow: string;
  className?: string;
};

export function StrengthPillarCard({
  title,
  description,
  icon: Icon,
  accent,
  glow,
  className,
}: StrengthPillarCardProps) {
  const reduced = useReducedMotion();
  const mobileLite = useMobileLite();
  const interactive = !reduced && !mobileLite;
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });
    setTilt({
      x: (event.clientX - (rect.left + rect.width / 2)) / 32,
      y: (event.clientY - (rect.top + rect.height / 2)) / 32,
    });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setHovering(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovering(false);
        setSpot({ x: 50, y: 50 });
        setTilt({ x: 0, y: 0 });
      }}
      style={
        interactive && hovering
          ? {
              transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
              transition: "transform 0.12s ease-out",
            }
          : undefined
      }
      className={cn(
        "group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/20",
        className,
      )}
    >
      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${glow}, transparent 65%)`,
          }}
          aria-hidden
        />
      )}

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <div
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background/40 md:backdrop-blur-sm",
            accent,
            interactive && "transition-transform duration-200 group-hover:scale-105 group-hover:rotate-3",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </div>

        <h3 className="font-heading text-base font-semibold tracking-tight text-foreground md:text-[1.0625rem]">
          {title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{description}</p>

        <div
          className={cn(
            "mt-4 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-brand-light/70 to-transparent transition-transform duration-500 group-hover:scale-x-100",
          )}
          aria-hidden
        />
      </div>
    </article>
  );
}
