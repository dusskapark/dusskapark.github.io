"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, X } from "lucide-react";
import { Dialog } from "radix-ui";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header
      className="site-header"
      id="top"
      style={{ viewTransitionName: "site-header" }}
    >
      <Link
        href="/"
        className="site-wordmark"
        aria-label="Joo — home"
        transitionTypes={["nav-back"]}
      >
        joo<span aria-hidden="true">.</span>
      </Link>
      <span className="header-caption">Design. Build. Make it useful.</span>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger
          className="menu-trigger"
          aria-label="Open navigation menu"
        >
          <span>Menu</span>
          <span className="menu-lines" aria-hidden="true">
            <i />
            <i />
          </span>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="menu-overlay" />
          <Dialog.Content className="menu-panel" aria-describedby={undefined}>
            <div className="menu-panel-top">
              <Dialog.Title className="menu-panel-title">Explore</Dialog.Title>
              <Dialog.Close
                className="menu-trigger"
                aria-label="Close navigation menu"
              >
                <span>Close</span>
                <X size={21} aria-hidden="true" />
              </Dialog.Close>
            </div>
            <nav className="menu-navigation" aria-label="Main navigation">
              {links.map((link, index) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  aria-current={pathname === link.href ? "page" : undefined}
                  transitionTypes={
                    link.href === "/" || link.href.startsWith("/#")
                      ? ["nav-back"]
                      : ["nav-forward"]
                  }
                  style={{ "--link-index": index } as React.CSSProperties}
                >
                  <span className="menu-link-number">0{index + 1}</span>
                  <span>{link.label}</span>
                  <ArrowUpRight
                    className="menu-link-arrow"
                    aria-hidden="true"
                  />
                </Link>
              ))}
            </nav>
            <div className="menu-bottom">
              <a href="mailto:dusskapark@gmail.com">dusskapark@gmail.com</a>
              <div className="social-links">
                <a
                  href="https://github.com/dusskapark"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <a
                  href="https://www.linkedin.com/in/dusskapark/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
                </a>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <noscript>
        <nav className="no-js-navigation" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
