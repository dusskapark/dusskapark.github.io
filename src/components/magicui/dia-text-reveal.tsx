import { useEffect } from "react";
import { animate, motion, useMotionValue, useTransform } from "motion/react";

// Adapted from Magic UI's Dia Text Reveal: a short color band passes over the
// text when its associated scene becomes active, then returns to the theme color.
export function DiaTextReveal({ text, active, reducedMotion }: { text: string; active: boolean; reducedMotion: boolean }) {
  const position = useMotionValue(117);
  const backgroundImage = useTransform(position, (value) => {
    const start = value - 17;
    const end = value + 17;
    return `linear-gradient(90deg, var(--foreground) ${start}%, #c679c4 ${start}%, #fa3d1d ${start + 8.5}%, #ffb005 ${value}%, #e1e1fe ${end - 8.5}%, #0358f7 ${end}%, var(--foreground) ${end}%)`;
  });

  useEffect(() => {
    if (!active || reducedMotion) {
      position.set(117);
      return;
    }
    position.set(-17);
    const animation = animate(position, 117, { duration: 1.25, ease: "easeInOut" });
    return () => animation.stop();
  }, [active, reducedMotion, position]);

  const sweeping = active && !reducedMotion;
  return <motion.span className="narrative-dia-text" style={{ backgroundImage: sweeping ? backgroundImage : "none", backgroundClip: sweeping ? "text" : undefined, WebkitBackgroundClip: sweeping ? "text" : undefined, color: sweeping ? "transparent" : "inherit", WebkitTextFillColor: sweeping ? "transparent" : "currentColor" }}>{text}</motion.span>;
}
