import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types/project"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg h-full flex flex-col">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardHeader className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <time className="text-xs text-muted-foreground">
              {new Date(project.date).getFullYear()}
            </time>
          </div>
          <CardTitle
            className="line-clamp-2"
            dangerouslySetInnerHTML={{ __html: project.title }}
          />
          <div className="flex flex-wrap gap-1 mt-2">
            {project.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <CardDescription className="line-clamp-1">
            {project.description}
          </CardDescription>
          {project.role && (
            <p className="mt-4 text-sm text-muted-foreground">
              Role: {project.role}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
