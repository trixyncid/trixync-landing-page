"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { useReducedMotion } from "motion/react";
import { Spotlight } from "@/components/ui/spotlight";
import { useHeavyEffects } from "@/hooks/use-heavy-effects";
import { useMobileLite } from "@/hooks/use-mobile-lite";
import { cn } from "@/lib/utils";

const StrengthAiScene = dynamic(
  () => import("./strength-ai-scene.client").then((m) => m.StrengthAiScene),
  { ssr: false },
);

type StrengthAiFeatureProps = {
  eyebrow: string;
  title: string;
  description: string;
  className?: string;
};

export function StrengthAiFeature({
  eyebrow,
  title,
  description,
  className,
}: StrengthAiFeatureProps) {
  const reduced = useReducedMotion();
  const mobileLite = useMobileLite();
  const { ref, ready: sceneReady } = useHeavyEffects({ idleTimeout: 2000 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);
  const interactive = !reduced && !mobileLite;

  const handleMouseMove = (event: React.MouseEvent<HTMLElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    setMouse({ x: (px - 0.5) * 2, y: (py - 0.5) * 2 });
    setTilt({
      x: (event.clientX - (rect.left + rect.width / 2)) / 28,
      y: (event.clientY - (rect.top + rect.height / 2)) / 28,
    });
  };

  return (
    <article
      onMouseMove={handleMouseMove}
      onMouseEnter={() => interactive && setHovering(true)}
      onMouseLeave={() => {
        if (!interactive) return;
        setHovering(false);
        setMouse({ x: 0, y: 0 });
        setTilt({ x: 0, y: 0 });
      }}
      style={
        interactive && hovering
          ? {
              transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
              transition: "transform 0.15s ease-out",
            }
          : undefined
      }
      className={cn(
        "group relative flex h-full min-h-[22rem] flex-col overflow-hidden rounded-2xl border border-border/50 bg-card/20 md:min-h-0",
        className,
      )}
    >
      {interactive && (
        <Spotlight
          className={cn(
            "-top-24 left-0 md:-top-20 md:left-16",
            hovering ? "opacity-100" : "opacity-0",
          )}
          fill="#3866F2"
        />
      )}

      <div
        ref={ref}
        className="relative min-h-[11rem] flex-1 overflow-hidden md:min-h-[12rem]"
      >
        <div
          className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,rgba(33,56,184,0.25),transparent_70%)]"
          aria-hidden
        />
        {sceneReady && <StrengthAiScene mouse={mouse} />}
        <div
          className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-brand/[0.08]"
          aria-hidden
        />
      </div>

      <div className="relative z-10 flex flex-col justify-end p-6 md:p-7">
        <p className="mb-2 text-xs font-medium uppercase tracking-[0.18em] text-brand-light">
          {eyebrow}
        </p>
        <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[0.9375rem]">
          {description}
        </p>
      </div>
    </article>
  );
}
