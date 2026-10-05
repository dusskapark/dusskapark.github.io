"use client";

import { useRef } from "react";
import { BrainCircuit, Code2, Component, Server } from "lucide-react";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { cn } from "@/lib/utils";

const NODES = [
  { label: "AI / ML", Icon: BrainCircuit },
  { label: "Dev experience", Icon: Code2 },
  { label: "Design systems", Icon: Component },
  { label: "Infrastructure", Icon: Server },
];

export function FocusBeams({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  const containerRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = [
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
    useRef<HTMLDivElement>(null),
  ];

  return (
    <div
      className={cn("focus-beams", dark && "focus-beams-dark")}
      ref={containerRef}
    >
      <div className="focus-beams-hub" ref={hubRef} aria-hidden="true">
        <span className="tiny-asterisk">✳</span>
      </div>

      <ul className="focus-beams-nodes">
        {NODES.map(({ label, Icon }, index) => (
          <li className="focus-beams-node" key={label}>
            <div className="focus-beams-icon" ref={nodeRefs[index]}>
              <Icon size={18} aria-hidden="true" />
            </div>
            <span className="focus-beams-text">{label}</span>
          </li>
        ))}
      </ul>

      {nodeRefs.map((nodeRef, index) => (
        <AnimatedBeam
          key={index}
          containerRef={containerRef}
          fromRef={hubRef}
          toRef={nodeRef}
          duration={4 + index * 0.5}
          delay={index * 0.4}
          curvature={0}
          pathWidth={1.6}
          pathOpacity={dark ? 0.4 : 0.25}
          pathColor={dark ? "rgba(250, 249, 246, 0.22)" : undefined}
          gradientStartColor={dark ? "#9aa868" : undefined}
          gradientStopColor={dark ? "#dce7ad" : undefined}
        />
      ))}
    </div>
  );
}
