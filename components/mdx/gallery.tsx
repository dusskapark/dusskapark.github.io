import { ImageLightbox } from "@/components/image-lightbox"
import { cn } from "@/lib/utils"

interface GalleryProps {
  columns?: number
  fullWidth?: boolean
  images: string | string[]
  caption?: string
}

export function Gallery({
  columns = 2,
  fullWidth = false,
  images,
  caption
}: GalleryProps) {
  const imageArray = typeof images === 'string'
    ? images.split(',').map(img => img.trim())
    : images

  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'grid-cols-2'

  return (
    <div className={cn(
      "my-8",
      fullWidth && "w-full -mx-4 px-4 md:-mx-8 md:px-8"
    )}>
      <div className={cn("grid gap-4", gridCols)}>
        {imageArray.map((image, index) => (
          <ImageLightbox
            key={index}
            src={image}
            alt={caption || `Gallery image ${index + 1}`}
            type="gallery"
          />
        ))}
      </div>
      {caption && (
        <p className="mt-4 text-center text-sm italic text-muted-foreground">
          {caption}
        </p>
      )}
    </div>
  )
}
