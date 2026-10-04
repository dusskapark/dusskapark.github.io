import type { CSSProperties, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/**
 * Magic UI's Line Shadow Text: a word gains a slim, continuously drifting
 * diagonal line-shadow clipped to its glyphs. Pure CSS, so it stays inside the
 * text box — it never bleeds onto neighbouring content.
 */
interface LineShadowTextProps extends HTMLAttributes<HTMLElement> {
  children: string;
  shadowColor?: string;
}

export function LineShadowText({
  children,
  shadowColor = "black",
  className,
  ...props
}: LineShadowTextProps) {
  return (
    <span
      style={{ "--shadow-color": shadowColor } as CSSProperties}
      className={cn("line-shadow-text", className)}
      data-text={children}
      {...props}
    >
      {children}
    </span>
  );
}
