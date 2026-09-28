import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Timeline({
  align,
  children,
}: {
  align?: "left" | "right";
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "content-timeline content-wide",
        align && `content-timeline-${align}`,
      )}
    >
      <ol className="content-timeline-list">{children}</ol>
    </div>
  );
}

export function TimelineItem({
  date,
  children,
}: {
  date: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="content-timeline-item">
      <div className="content-timeline-date">{date}</div>
      <div className="content-timeline-body">{children}</div>
    </li>
  );
}
