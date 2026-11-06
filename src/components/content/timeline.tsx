import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

/** Splits labels like "Mar 2024: Working Demo" into a machine-readable date. */
function parseDateLabel(label: string) {
  const match = label.match(/^([A-Za-z]{3})[a-z]*\.?\s+(\d{4})\s*(?::\s*(.*))?$/);
  const month = match && MONTHS.indexOf(match[1].toLowerCase());
  if (!match || month === null || month < 0) return undefined;
  return {
    dateTime: `${match[2]}-${String(month + 1).padStart(2, "0")}`,
    when: label.slice(0, label.indexOf(match[2]) + 4),
    title: match[3],
  };
}

export function Timeline({
  align,
  label,
  children,
}: {
  align?: "left" | "right";
  /** Accessible name for the list, e.g. "Project timeline". */
  label?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "content-timeline content-wide",
        align && `content-timeline-${align}`,
      )}
    >
      <ol className="content-timeline-list" aria-label={label}>
        {children}
      </ol>
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
  const parsed = typeof date === "string" ? parseDateLabel(date) : undefined;
  return (
    <li className="content-timeline-item">
      <p className="content-timeline-date">
        {parsed ? (
          <>
            <time dateTime={parsed.dateTime}>{parsed.when}</time>
            {parsed.title && `: ${parsed.title}`}
          </>
        ) : (
          date
        )}
      </p>
      <div className="content-timeline-body">{children}</div>
    </li>
  );
}
