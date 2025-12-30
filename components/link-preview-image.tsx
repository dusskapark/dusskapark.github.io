'use client'

import { useState } from 'react'

interface LinkPreviewImageProps {
    src: string
    alt: string
    className?: string
    type: 'cover' | 'icon'
}

export function LinkPreviewImage({ src, alt, className = '', type }: LinkPreviewImageProps) {
    const [hasError, setHasError] = useState(false)

    if (hasError) {
        return null
    }

    if (type === 'cover') {
        return (
            <div className="relative aspect-[1.91/1] w-full overflow-hidden">
                <img
                    src={src}
                    alt={alt}
                    className={className}
                    onError={() => setHasError(true)}
                />
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
        />
    )
}
