import { HeroCodeBlock } from "@/components/hero-code-block"
import { Header } from "@/components/header"
import { ProjectsList } from "@/components/projects-list"
import { getAllProjects } from "@/lib/mdx"

export default function Home() {
  const projects = getAllProjects()

  return (
    <div className="min-h-screen">
      {/* Header with Theme Toggle */}
      <Header />

      {/* Hero Section */}
      <HeroCodeBlock />

      {/* Projects Section */}
      <ProjectsList projects={projects} />

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JooHyung Park. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
