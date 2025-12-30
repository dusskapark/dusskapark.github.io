"use client"

import Link from "next/link"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
            <div className="container mx-auto flex h-14 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2">
                    <span className="font-bold text-lg">JP</span>
                </Link>

                <nav className="flex items-center gap-4">
                    <AnimatedThemeToggler />
                </nav>
            </div>
        </header>
    )
}
