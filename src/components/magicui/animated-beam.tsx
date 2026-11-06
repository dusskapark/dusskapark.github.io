import { useEffect, useId, useState, type RefObject } from "react";
import { motion } from "motion/react";

// Adapted from Magic UI's Animated Beam (MIT); geometry is measured relative to
// the containing card so the same component works at desktop and mobile sizes.
export function AnimatedBeam({ containerRef, fromRef, toRef, curvature = 0, delay = 0, reverse = false, reducedMotion, active }: {
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  delay?: number;
  reverse?: boolean;
  reducedMotion: boolean;
  active: boolean;
}) {
  const id = useId();
  const [geometry, setGeometry] = useState({ width: 0, height: 0, path: "", startX: 0, endX: 0 });

  useEffect(() => {
    const container = containerRef.current;
    const from = fromRef.current;
    const to = toRef.current;
    if (!container || !from || !to) return;
    const update = () => {
      const bounds = container.getBoundingClientRect();
      const a = from.getBoundingClientRect();
      const b = to.getBoundingClientRect();
      const x1 = a.left - bounds.left + a.width / 2;
      const y1 = a.top - bounds.top + a.height / 2;
      const x2 = b.left - bounds.left + b.width / 2;
      const y2 = b.top - bounds.top + b.height / 2;
      const path = `M ${x1},${y1} Q ${(x1 + x2) / 2},${(y1 + y2) / 2 - curvature} ${x2},${y2}`;
      setGeometry((previous) => previous.width === bounds.width && previous.height === bounds.height && previous.path === path ? previous : { width: bounds.width, height: bounds.height, path, startX: x1, endX: x2 });
    };
    update();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(update);
    observer?.observe(container);
    observer?.observe(from);
    observer?.observe(to);
    window.addEventListener("resize", update);
    return () => { observer?.disconnect(); window.removeEventListener("resize", update); };
  }, [containerRef, fromRef, toRef, curvature]);

  const start = reverse ? geometry.endX : geometry.startX;
  const end = reverse ? geometry.startX : geometry.endX;
  const halfBand = Math.max(12, Math.abs(end - start) * .18);

  return (
    <svg className="confidential-beam" aria-hidden="true" focusable="false" viewBox={`0 0 ${geometry.width} ${geometry.height}`}>
      <path d={geometry.path} stroke="var(--muted-foreground)" strokeOpacity=".28" strokeWidth="1.5" strokeLinecap="round" />
      {active && !reducedMotion && <>
        <path d={geometry.path} stroke={`url(#${id})`} strokeWidth="2.5" strokeLinecap="round" />
        <defs>
          <motion.linearGradient key={`${geometry.width}-${geometry.height}`} id={id} gradientUnits="userSpaceOnUse"
            initial={{ x1: start - halfBand, x2: start + halfBand, y1: 0, y2: 0 }}
            animate={{ x1: [start - halfBand, end - halfBand], x2: [start + halfBand, end + halfBand], y1: 0, y2: 0 }}
            transition={{ delay, duration: 2.8, ease: "linear", repeat: Infinity }}>
            <stop offset="0%" stopColor="#00b14f" stopOpacity="0" />
            <stop offset="30%" stopColor="#00b14f" />
            <stop offset="65%" stopColor="#65a8ff" />
            <stop offset="100%" stopColor="#65a8ff" stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </>}
    </svg>
  );
}
