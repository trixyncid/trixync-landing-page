"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import type { LucideIcon } from "lucide-react";
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
  const [spot, setSpot] = useState({ x: 50, y: 50 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    setSpot({ x, y });

    if (!reduced) {
      setTilt({
        x: (event.clientX - (rect.left + rect.width / 2)) / 32,
        y: (event.clientY - (rect.top + rect.height / 2)) / 32,
      });
    }
  };

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setSpot({ x: 50, y: 50 });
        setTilt({ x: 0, y: 0 });
      }}
      style={
        reduced
          ? undefined
          : {
              transform: hovering
                ? `translate3d(${tilt.x}px, ${tilt.y}px, 0)`
                : undefined,
              transition: "transform 0.12s ease-out",
            }
      }
      className={cn(
        "group relative flex h-full min-h-[15rem] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/20",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(420px circle at ${spot.x}% ${spot.y}%, ${glow}, transparent 65%)`,
        }}
        aria-hidden
      />

      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <motion.div
          animate={reduced ? undefined : hovering ? { scale: 1.06, rotate: 3 } : { scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className={cn(
            "mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border/60 bg-background/40 backdrop-blur-sm",
            accent,
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </motion.div>

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
    </motion.article>
  );
}
