import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import projects from "@/data/projects.json"
import type { Project } from "@/types/project"

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }))
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = (projects as Project[]).find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost">&larr; Back to Home</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Badge variant="secondary">{project.subtitle}</Badge>
            <time className="text-sm text-muted-foreground">
              {new Date(project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {project.title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {project.description}
          </p>

          {(project.role || project.team) && (
            <div className="flex flex-col gap-2 pt-4 border-t">
              {project.role && (
                <p className="text-sm">
                  <span className="font-semibold">Role:</span> {project.role}
                </p>
              )}
              {project.team && (
                <p className="text-sm">
                  <span className="font-semibold">Team:</span> {project.team}
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Featured Image */}
      <section className="container mx-auto px-4 pb-12">
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video relative rounded-lg overflow-hidden bg-muted">
            <Image
              src={project.featured_image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
          <p className="text-muted-foreground">
            Full project details coming soon...
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JooHyung Park. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
