import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { HeroCodeBlock } from "@/components/hero-code-block"
import { Header } from "@/components/header"
import projects from "@/data/projects.json"
import type { Project } from "@/types/project"

export default function Home() {
  const visibleProjects = (projects as Project[])
    .filter(p => p.visible)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return (
    <div className="min-h-screen">
      {/* Header with Theme Toggle */}
      <Header />

      {/* Hero Section */}
      <HeroCodeBlock />

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
