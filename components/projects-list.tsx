"use client"

import { useMemo } from "react"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import type { Project } from "@/types/project"

export function ProjectsList({ projects }: { projects: Project[] }) {
  const visibleProjects = projects
    .filter(p => p.visible)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  // Get top 4 tags sorted by count
  const topTags = useMemo(() => {
    const tagCounts = new Map<string, number>()

    visibleProjects.forEach(project => {
      if (project.tags && Array.isArray(project.tags)) {
        project.tags.forEach(tag => {
          tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1)
        })
      }
    })

    return Array.from(tagCounts.entries())
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .slice(0, 4) // Take top 4
      .map(([tag, count]) => ({ tag, count }))
  }, [visibleProjects])

  // Filter projects by tag
  const getFilteredProjects = (tag: string | null) => {
    if (!tag) return visibleProjects
    return visibleProjects.filter(project =>
      project.tags && project.tags.includes(tag)
    )
  }

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Featured Projects</h2>
        </div>

        {/* Tabs Filter */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex items-center justify-between gap-4">
            <TabsList>
              <TabsTrigger value="all">
                All ({visibleProjects.length})
              </TabsTrigger>
              {topTags.map(({ tag, count }) => (
                <TabsTrigger key={tag} value={tag}>
                  {tag} ({count})
                </TabsTrigger>
              ))}
            </TabsList>

            <Button variant="outline" size="sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              Search
            </Button>
          </div>

          <TabsContent value="all" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </TabsContent>

          {topTags.map(({ tag }) => {
            const filtered = getFilteredProjects(tag)
            return (
              <TabsContent key={tag} value={tag} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filtered.map((project) => (
                    <ProjectCard key={project.slug} project={project} />
                  ))}
                </div>
              </TabsContent>
            )
          })}
        </Tabs>
      </div>
    </section>
  )
}
