'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

interface ImageLightboxProps {
    src: string
    alt: string
    className?: string
    type?: 'cover' | 'icon' | 'gallery'
}

export function ImageLightbox({ src, alt, className, type = 'gallery' }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [hasError, setHasError] = useState(false)

    // Close on ESC key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener('keydown', handleEscape)
            // Prevent body scroll when lightbox is open
            document.body.style.overflow = 'hidden'
        }

        return () => {
            document.removeEventListener('keydown', handleEscape)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Don't render anything if image failed to load
    if (hasError) {
        return null
    }

    // Determine rendering mode
    const isCover = type === 'cover'  // OG link preview
    const isGallery = type === 'gallery'  // Image gallery
    const isIcon = type === 'icon'  // Small favicon

    return (
        <>
            {/* Thumbnail - clickable with hover effect */}
            <div
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${isCover ? 'aspect-video w-full' :
                        isGallery ? 'w-full' :
                            ''
                    }`}
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={src}
                    alt={alt}
                    fill={isCover}
                    sizes={isCover ? "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px" : undefined}
                    width={isGallery || isIcon ? 800 : undefined}
                    height={isGallery || isIcon ? 600 : undefined}
                    className={`transition-transform duration-300 group-hover:scale-105 ${isCover ? 'h-full w-full object-cover' :
                            isGallery ? 'w-full h-auto' :
                                'h-full w-full object-cover'
                        }`}
                    loading="lazy"
                    onError={() => setHasError(true)}
                />
                {/* Overlay hint on hover */}
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
            </div>

            {/* Lightbox Modal */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
                    onClick={() => setIsOpen(false)}
                >
                    {/* Close button */}
                    <button
                        className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                        onClick={() => setIsOpen(false)}
                    >
                        <X className="h-6 w-6" />
                    </button>

                    {/* Full size image */}
                    <div
                        className="relative max-h-[90vh] max-w-[90vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={src}
                            alt={alt}
                            width={1920}
                            height={1080}
                            className="h-auto w-auto max-h-[90vh] max-w-[90vw] object-contain"
                            priority
                        />
                    </div>

                    {/* Caption */}
                    {alt && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-lg bg-black/50 px-4 py-2 text-sm text-white">
                            {alt}
                        </div>
                    )}
                </div>
            )}
        </>
    )
}
