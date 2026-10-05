"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useId, useState, type RefObject } from "react";
import { cn } from "@/lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLDivElement | null>;
  fromRef: RefObject<HTMLDivElement | null>;
  toRef: RefObject<HTMLDivElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

/**
 * AnimatedBeam — draws an animated gradient beam between two DOM nodes (Magic UI).
 * Endpoints are measured from live layout, so the host nodes can sit anywhere in
 * the container. Powered by `motion`, which is already a dependency; the pulse is
 * dropped automatically when the user prefers reduced motion.
 */
export function AnimatedBeam({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  pathColor = "var(--border)",
  pathWidth = 2,
  pathOpacity = 0.3,
  gradientStartColor = "#656f45",
  gradientStopColor = "#b7c48a",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) {
  const id = useId();
  const reduced = useReducedMotion();
  const [pathD, setPathD] = useState("");
  const [dim, setDim] = useState({ width: 0, height: 0 });

  const gradient = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const updatePath = () => {
      const from = fromRef.current;
      const to = toRef.current;
      if (!from || !to) return;
      const box = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      setDim({ width: box.width, height: box.height });
      const startX = a.left - box.left + a.width / 2 + startXOffset;
      const startY = a.top - box.top + a.height / 2 + startYOffset;
      const endX = b.left - box.left + b.width / 2 + endXOffset;
      const endY = b.top - box.top + b.height / 2 + endYOffset;
      const controlY = startY - curvature;
      setPathD(
        `M ${startX},${startY} Q ${(startX + endX) / 2},${controlY} ${endX},${endY}`,
      );
    };
    const observer = new ResizeObserver(updatePath);
    observer.observe(container);
    updatePath();
    return () => observer.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      fill="none"
      width={dim.width}
      height={dim.height}
      viewBox={`0 0 ${dim.width} ${dim.height}`}
      xmlns="http://www.w3.org/2000/svg"
      className={cn("beam-svg", className)}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <path
        d={pathD}
        strokeWidth={pathWidth}
        stroke={`url(#${id})`}
        strokeLinecap="round"
      />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          animate={
            reduced
              ? undefined
              : {
                  x1: gradient.x1,
                  x2: gradient.x2,
                  y1: gradient.y1,
                  y2: gradient.y2,
                }
          }
          transition={
            reduced
              ? undefined
              : {
                  delay,
                  duration,
                  ease: [0.16, 1, 0.3, 1],
                  repeat: Infinity,
                  repeatDelay: 0,
                }
          }
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
}
