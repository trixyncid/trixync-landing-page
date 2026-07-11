"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { useMotionValue, motion, useMotionTemplate } from "motion/react";
import React, { MouseEvent as ReactMouseEvent } from "react";
import { cn } from "@/lib/utils";

const CanvasRevealEffect = dynamic(
  () => import("@/components/ui/canvas-reveal-effect").then((m) => m.CanvasRevealEffect),
  { ssr: false },
);

export const CardSpotlight = ({
  children,
  radius = 350,
  color = "#2138B8",
  className,
  ...props
}: {
  radius?: number;
  color?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: ReactMouseEvent<HTMLDivElement>) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={cn(
        "group/spotlight relative overflow-hidden rounded-md border border-border/60 bg-card/30",
        className,
      )}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      {...props}
    >
      <motion.div
        className="pointer-events-none absolute z-0 -inset-px bg-brand/10 opacity-0 transition duration-300 group-hover/spotlight:opacity-100 dark:bg-brand/20"
        style={{
          maskImage: useMotionTemplate`
            radial-gradient(
              ${radius}px circle at ${mouseX}px ${mouseY}px,
              white,
              transparent 80%
            )
          `,
        }}
      >
        {isHovering && (
          <Suspense fallback={null}>
            <CanvasRevealEffect
              animationSpeed={5}
              containerClassName="pointer-events-none absolute inset-0 bg-transparent"
              colors={[
                [33, 56, 184],
                [56, 102, 242],
              ]}
              dotSize={3}
            />
          </Suspense>
        )}
      </motion.div>
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};
