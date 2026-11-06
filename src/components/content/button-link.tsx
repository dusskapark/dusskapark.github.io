import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Primary call-to-action link for MDX bodies, built on the shared Button. */
export function ButtonLink({
  href,
  children,
  variant = "default",
}: {
  href: string;
  children: ReactNode;
  variant?: "default" | "outline";
}) {
  const external = /^https?:\/\//.test(href);
  return (
    <p className="content-button-link">
      <Button asChild variant={variant}>
        <a
          href={href}
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {children}
          {external && (
            <>
              <ArrowUpRight aria-hidden="true" />
              <span className="content-sr-only"> (opens in a new tab)</span>
            </>
          )}
        </a>
      </Button>
    </p>
  );
}
