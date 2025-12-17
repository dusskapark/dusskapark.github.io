import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MDXRemote } from 'next-mdx-remote/rsc'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Gallery, Quote, Video } from '@/components/mdx'
import { getProjectContent } from '@/lib/mdx'
import projects from "@/data/projects.json"
import type { Project } from "@/types/project"
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

const components = {
  Gallery,
  Quote,
  Video,
}

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

  // Try to load MDX content
  const mdxContent = getProjectContent(params.slug)

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
            <Badge variant="secondary">
              {mdxContent?.frontmatter.subtitle || project.subtitle}
            </Badge>
            <time className="text-sm text-muted-foreground">
              {new Date(mdxContent?.frontmatter.date || project.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            {mdxContent?.frontmatter.title || project.title}
          </h1>

          <p className="text-lg text-muted-foreground">
            {mdxContent?.frontmatter.description || project.description}
          </p>

          {((mdxContent?.frontmatter.role || project.role) ||
            (mdxContent?.frontmatter.team || project.team)) && (
            <div className="flex flex-col gap-2 pt-4 border-t">
              {(mdxContent?.frontmatter.role || project.role) && (
                <p className="text-sm">
                  <span className="font-semibold">Role:</span>{' '}
                  {mdxContent?.frontmatter.role || project.role}
                </p>
              )}
              {(mdxContent?.frontmatter.team || project.team) && (
                <p className="text-sm">
                  <span className="font-semibold">Team:</span>{' '}
                  {mdxContent?.frontmatter.team || project.team}
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
              src={mdxContent?.frontmatter.featured_image || project.featured_image}
              alt={mdxContent?.frontmatter.title || project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </section>

      {/* MDX Content */}
      {mdxContent ? (
        <section className="container mx-auto px-4 py-12">
          <article className="max-w-3xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-a:text-primary prose-a:no-underline hover:prose-a:underline">
            <MDXRemote
              source={mdxContent.content}
              components={components}
              options={{
                mdxOptions: {
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeHighlight],
                },
              }}
            />
          </article>
        </section>
      ) : (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
            <p className="text-muted-foreground">
              Full project details coming soon...
            </p>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} JooHyung Park. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
