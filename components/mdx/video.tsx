import { cn } from "@/lib/utils"

interface VideoProps {
  url: string
  fullWidth?: boolean
  caption?: string
}

export function Video({ url, fullWidth = false, caption }: VideoProps) {
  return (
    <div className={cn(
      "my-8",
      fullWidth && "w-full -mx-4 px-4 md:-mx-8 md:px-8"
    )}>
      <div className="relative aspect-video overflow-hidden rounded-lg bg-black">
        <iframe
          src={url}
          className="absolute inset-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
