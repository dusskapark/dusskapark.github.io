import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Project } from "@/types/project"

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group">
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-video relative overflow-hidden bg-muted">
          <Image
            src={project.featured_image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary">{project.subtitle}</Badge>
            <time className="text-xs text-muted-foreground">
              {new Date(project.date).getFullYear()}
            </time>
          </div>
          <CardTitle className="line-clamp-2">{project.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription className="line-clamp-3">
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
