import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Bento grid — a mosaic of varied-size cards (Magic UI style), adapted to this
 * codebase's custom-CSS idiom so it plays nicely with Tailwind v4. Layout and
 * spans are driven by classes in globals.css (`.bento-grid`, `.bento-card`).
 */
export function BentoGrid({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { children: ReactNode }) {
  return (
    <div className={cn("bento-grid", className)} {...props}>
      {children}
    </div>
  );
}

export function BentoCard({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"div"> & { children: ReactNode }) {
  return (
    <div className={cn("bento-card", className)} {...props}>
      {children}
    </div>
  );
}
