"use client";

import Image from "next/image";
import { brandAssets, logoSizes, type LogoSize, type LogoVariant } from "@/content/brand";
import { useTheme } from "@/components/layout/ThemeProvider";
import { cn } from "@/lib/utils";

type LogoProps = {
  variant?: LogoVariant;
  size?: LogoSize;
  className?: string;
  priority?: boolean;
};

/** Theme-aware logo — loads only the active theme asset. */
export function Logo({
  variant = "full",
  size = "md",
  className,
  priority = false,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const asset = brandAssets[variant];
  const sizeClass = logoSizes[size][variant];
  const src = resolvedTheme === "dark" ? asset.dark : asset.light;

  return (
    <span className={cn("relative inline-flex shrink-0 items-center", className)}>
      <Image
        src={src}
        alt="Trixync"
        width={asset.width}
        height={asset.height}
        priority={priority}
        className={cn("w-auto", sizeClass)}
      />
    </span>
  );
}
