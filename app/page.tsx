import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import projects from "@/data/projects.json"
import type { Project } from "@/types/project"

export default function Home() {
  const visibleProjects = (projects as Project[])
    .filter(p => p.visible)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-sm uppercase tracking-wide text-muted-foreground">
            Hello! I'm Joo Hyung Park
          </p>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            An Impact-driven Product designer
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground">
            who enjoys solving complex problems based on variety Experiences from a wide range of enterprise products.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button size="lg">Get In Touch</Button>
            <Button size="lg" variant="outline">View Resume</Button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold">Featured Projects</h2>
            <Button variant="ghost">View All</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
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
