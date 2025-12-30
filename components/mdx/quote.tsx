import Image from "next/image"
import { cn } from "@/lib/utils"

interface QuoteProps {
  fullWidth?: boolean
  backgroundColor?: string
  fontColor?: string
  images?: string
  text: string
  caption?: string
}

export function Quote({
  fullWidth = false,
  backgroundColor,
  fontColor,
  images,
  text,
  caption
}: QuoteProps) {
  return (
    <div className={cn(
      "my-8",
      fullWidth && "w-full -mx-4 px-4 md:-mx-8 md:px-8"
    )}>
      <div
        className="rounded-lg p-6 md:p-8"
        style={{
          backgroundColor: backgroundColor || 'hsl(var(--muted))',
          color: fontColor
        }}
      >
        {images && (
          <div className="mb-6 relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={images}
              alt="Quote image"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              className="object-cover"
              loading="lazy"
            />
          </div>
        )}

        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          style={{ color: fontColor }}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      {caption && (
        <p className="mt-2 text-center text-sm italic text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}
