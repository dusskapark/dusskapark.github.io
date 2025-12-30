"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Copy, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { ContactModal } from "@/components/contact-modal"
import { Highlighter } from "@/components/ui/highlighter"
import { AuroraText } from "@/components/ui/aurora-text"


const codeSnippet = `import { ProductDesigner } from "@joohyung/park";

// Core skills every great designer needs
const joo = new ProductDesigner({
  experience: "10+ years",
  skills: [
    "UX Research & User Testing",
    "Data-Driven Design",
    "Design System",
  ],
});

// But wait... there's more 🎁
joo.implements<Builder>({
  canShip: true,
  tools: ["Figma Plugins", "React", "Open Source"],
});

// 🚀 Let's build something together!
await joo.contact(); // Open to chat anytime ☕`


export function HeroCodeBlock() {
    const [copied, setCopied] = useState(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(codeSnippet)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <section className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                {/* Left: Text Content */}
                <div className="space-y-6">
                    <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                        🟢 Open to Opportunities
                    </Badge>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                        <AuroraText
                            colors={["#FF0080", "#7928CA", "#0070F3", "#38bdf8", "#FF0080"]}
                            speed={0.8}
                        >
                            Impact-driven
                        </AuroraText>
                        <br />
                        <Highlighter
                            action="underline"
                            color="#7928CA"
                            strokeWidth={3}
                            animationDuration={1200}
                        >
                            Product Builder
                        </Highlighter>
                    </h1>

                    <p className="text-lg md:text-xl text-muted-foreground max-w-md">
                        Hello! I'm{" "}
                        <Highlighter
                            action="circle"
                            color="#FF0080"
                            strokeWidth={2}
                            animationDuration={800}
                            padding={4}
                        >
                            <span className="font-semibold text-foreground">Joo Hyung Park</span>
                        </Highlighter>
                        .
                        <br />
                        I solve complex problems with{" "}
                        <Highlighter
                            action="highlight"
                            color="rgba(121, 40, 202, 0.3)"
                            animationDuration={600}
                        >
                            <span className="text-purple-900 dark:text-purple-300 font-medium">
                                10+ years of experience
                            </span>
                        </Highlighter>{" "}
                        across developer tools and enterprise products.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <ContactModal>
                            <Button size="lg">
                                <Mail className="mr-2 h-4 w-4" />
                                Get in Touch
                            </Button>
                        </ContactModal>
                        <Button size="lg" variant="outline" asChild>
                            <Link href="https://www.linkedin.com/in/dusskapark/" target="_blank" rel="noopener noreferrer">
                                <Linkedin className="mr-2 h-4 w-4" />
                                LinkedIn
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Right: Code Editor */}
                <div className="relative">
                    {/* Installation badge */}
                    <div className="mb-4 flex justify-center lg:justify-start">
                        <code className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-2 text-sm font-mono text-muted-foreground">
                            <span className="text-green-500">$</span> npm install @joohyung/park
                        </code>
                    </div>

                    {/* Code window */}
                    <div className="rounded-xl border bg-card shadow-2xl overflow-hidden">
                        {/* Window header */}
                        <div className="flex items-center justify-between px-4 py-3 bg-secondary/50 border-b">
                            <div className="flex items-center gap-2">
                                {/* Traffic lights */}
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                {/* Tab */}
                                <div className="ml-4 px-3 py-1 rounded-md bg-background text-xs font-mono text-muted-foreground">
                                    hire-me.ts
                                </div>
                            </div>

                            {/* Copy button */}
                            <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 text-xs"
                                onClick={handleCopy}
                            >
                                {copied ? (
                                    <>
                                        <Check className="h-3 w-3 mr-1" />
                                        Copied!
                                    </>
                                ) : (
                                    <>
                                        <Copy className="h-3 w-3 mr-1" />
                                        Copy
                                    </>
                                )}
                            </Button>
                        </div>

                        {/* Code content */}
                        <div className="p-4 overflow-x-auto">
                            <pre className="text-sm font-mono leading-relaxed">
                                <code>
                                    {codeSnippet.split('\n').map((line, i) => (
                                        <div key={i} className="flex">
                                            <span className="select-none w-8 text-muted-foreground/50 text-right mr-4">
                                                {i + 1}
                                            </span>
                                            <span className="flex-1">
                                                {renderCodeLine(line)}
                                            </span>
                                        </div>
                                    ))}
                                </code>
                            </pre>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

// Simple syntax highlighting
function renderCodeLine(line: string) {
    // Keywords
    const keywords = ['import', 'from', 'const', 'new', 'await', 'console']
    // String patterns
    const stringPattern = /"[^"]*"|'[^']*'|`[^`]*`/g
    // Comments
    if (line.trim().startsWith('//')) {
        return <span className="text-green-500">{line}</span>
    }

    let result = line

    // Highlight keywords
    keywords.forEach(kw => {
        const regex = new RegExp(`\\b${kw}\\b`, 'g')
        result = result.replace(regex, `__KW__${kw}__/KW__`)
    })

    // Split and render
    const parts = result.split(/(__KW__|__\/KW__)/g).filter(Boolean)

    return (
        <>
            {parts.map((part, i) => {
                if (part === '__KW__' || part === '__/KW__') return null
                if (keywords.includes(part)) {
                    return <span key={i} className="text-purple-500 font-semibold">{part}</span>
                }
                // Check for strings in this part
                const stringParts = part.split(stringPattern)
                const strings = part.match(stringPattern) || []

                if (strings.length === 0) {
                    return <span key={i}>{part}</span>
                }

                return (
                    <span key={i}>
                        {stringParts.map((sp, j) => (
                            <span key={j}>
                                {sp}
                                {strings[j] && <span className="text-amber-500">{strings[j]}</span>}
                            </span>
                        ))}
                    </span>
                )
            })}
        </>
    )
}
