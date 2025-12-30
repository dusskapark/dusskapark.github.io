import Link from 'next/link'
import Image from 'next/image'
import { LinkPreviewImage } from './link-preview-image'

interface LinkPreviewMetadata {
    title?: string
    description?: string
    image?: string
    icon?: string
    siteName?: string
    url: string
}

async function fetchMetadata(url: string): Promise<LinkPreviewMetadata> {
    try {
        // Validate URL first
        try {
            new URL(url)
        } catch {
            return {
                url,
                title: url,
                description: 'Invalid URL',
            }
        }

        const res = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; LinkPreviewBot/1.0)',
            },
            next: { revalidate: 86400 }, // Cache for 24 hours
        })

        if (!res.ok) {
            throw new Error(`HTTP ${res.status}`)
        }

        const html = await res.text()

        // Quick regex helper
        const extract = (regex: RegExp) => {
            const match = html.match(regex)?.[1]?.trim()
            return match && match.length > 0 ? match : undefined
        }

        // Helper to resolve relative URLs
        const resolveUrl = (relativeUrl: string | undefined): string | undefined => {
            if (!relativeUrl) return undefined
            try {
                // If it's already absolute, return as is
                if (relativeUrl.startsWith('http://') || relativeUrl.startsWith('https://')) {
                    return relativeUrl
                }
                // Resolve relative URL
                const baseUrl = new URL(url)
                return new URL(relativeUrl, baseUrl.origin).toString()
            } catch {
                return undefined
            }
        }

        // Extract Open Graph and meta tags
        const rawImage = extract(/<meta[^>]+property=["']og:image["'][^>]*content=["']([^"']+)["']/i) ||
            extract(/<link[^>]+rel=["']apple-touch-icon["'][^>]*href=["']([^"']+)["']/i)

        const rawIcon = extract(/<link[^>]+rel=["']icon["'][^>]*href=["']([^"']+)["']/i) ||
            extract(/<link[^>]+rel=["']shortcut icon["'][^>]*href=["']([^"']+)["']/i)

        const metadata: LinkPreviewMetadata = {
            url,
            title:
                extract(/<meta[^>]+property=["']og:title["'][^>]*content=["']([^"']+)["']/i) ||
                extract(/<meta[^>]+name=["']title["'][^>]*content=["']([^"']+)["']/i) ||
                extract(/<title>\s*([\s\S]*?)<\/title>/i),

            description:
                extract(/<meta[^>]+property=["']og:description["'][^>]*content=["']([^"']+)["']/i) ||
                extract(/<meta[^>]+name=["']description["'][^>]*content=["']([^"']+)["']/i),

            image: resolveUrl(rawImage),
            icon: resolveUrl(rawIcon),

            siteName:
                extract(/<meta[^>]+property=["']og:site_name["'][^>]*content=["']([^"']+)["']/i),
        }

        return metadata
    } catch (error) {
        console.error(`Failed to fetch metadata for ${url}:`, error)
        // Return fallback metadata
        const domain = (() => {
            try {
                return new URL(url).hostname
            } catch {
                return url
            }
        })()

        return {
            url,
            title: domain,
            description: 'Click to visit',
        }
    }
}

interface LinkPreviewCardProps {
    url: string
}

export async function LinkPreviewCard({ url }: LinkPreviewCardProps) {
    const metadata = await fetchMetadata(url)
    const domain = new URL(url).hostname

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block no-underline not-prose my-6"
        >
            <div className="overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-md">
                {/* Large Image on Top */}
                {metadata.image && (
                    <LinkPreviewImage
                        src={metadata.image}
                        alt={metadata.title || ''}
                        type="cover"
                    />
                )}

                {/* Content Section */}
                <div className="p-4">
                    {/* Site info with favicon */}
                    <div className="mb-2 flex items-center gap-2">
                        {metadata.icon && (
                            <LinkPreviewImage
                                src={metadata.icon}
                                alt=""
                                className="h-4 w-4"
                                type="icon"
                            />
                        )}
                        <span className="text-xs text-muted-foreground">
                            {metadata.siteName || domain}
                        </span>
                    </div>

                    {/* Title */}
                    <h4 className="mb-1 line-clamp-2 text-sm font-semibold leading-tight">
                        {metadata.title || domain}
                    </h4>

                    {/* Description */}
                    {metadata.description && (
                        <p className="line-clamp-2 text-xs text-muted-foreground">
                            {metadata.description}
                        </p>
                    )}
                </div>
            </div>
        </Link>
    )
}
