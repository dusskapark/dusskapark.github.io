"use client"

import { useState } from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react"

interface ContactModalProps {
    children?: React.ReactNode
}

type FormStatus = "idle" | "submitting" | "success" | "error"

export function ContactModal({ children }: ContactModalProps) {
    const [open, setOpen] = useState(false)
    const [status, setStatus] = useState<FormStatus>("idle")
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus("submitting")

        try {
            const response = await fetch("https://formspree.io/f/xpzydbng", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: "Portfolio Contact Form Submission",
                }),
            })

            if (response.ok) {
                setStatus("success")
                setFormData({ name: "", email: "", message: "" })
                // Close modal after showing success
                setTimeout(() => {
                    setOpen(false)
                    setStatus("idle")
                }, 2000)
            } else {
                setStatus("error")
            }
        } catch {
            setStatus("error")
        }
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button size="lg">
                        <Mail className="mr-2 h-4 w-4" />
                        Get in Touch
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Get In Touch
                    </DialogTitle>
                    <DialogDescription className="text-base">
                        Have a question or want to work together? Send me a
                        message and I&apos;ll get back to you as soon as possible.
                    </DialogDescription>
                </DialogHeader>

                {status === "success" ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 rounded-full bg-green-100 p-3 dark:bg-green-900/30">
                            <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
                        </div>
                        <h3 className="text-lg font-semibold">Message Sent!</h3>
                        <p className="text-muted-foreground">
                            Thanks for reaching out. I&apos;ll be in touch soon.
                        </p>
                    </div>
                ) : status === "error" ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/30">
                            <AlertCircle className="h-8 w-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h3 className="text-lg font-semibold">
                            Something went wrong
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                            Please try again or email me directly.
                        </p>
                        <Button
                            variant="outline"
                            onClick={() => setStatus("idle")}
                        >
                            Try Again
                        </Button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                id="name"
                                name="name"
                                placeholder="What should I call you?"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                disabled={status === "submitting"}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email">Your Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="What's your email address?"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                disabled={status === "submitting"}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                                id="message"
                                name="message"
                                placeholder="What's on your mind?"
                                rows={4}
                                value={formData.message}
                                onChange={handleChange}
                                required
                                disabled={status === "submitting"}
                                className="resize-none"
                            />
                        </div>

                        {/* Honeypot field for spam prevention */}
                        <input
                            type="text"
                            name="_gotcha"
                            style={{ display: "none" }}
                            tabIndex={-1}
                            autoComplete="off"
                        />

                        <div className="flex justify-end gap-3 pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setOpen(false)}
                                disabled={status === "submitting"}
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={status === "submitting"}
                                className="min-w-[120px]"
                            >
                                {status === "submitting" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-4 w-4" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                )}

                {/* Alternative contact option */}
                {status === "idle" && (
                    <p className="text-center text-sm text-muted-foreground">
                        Prefer email?{" "}
                        <a
                            href="mailto:dusskapark@gmail.com"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            dusskapark@gmail.com
                        </a>
                    </p>
                )}
            </DialogContent>
        </Dialog>
    )
}
