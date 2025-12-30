import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import type { Project } from '@/types/project'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectMDX {
  slug: string
  frontmatter: {
    title: string
    tags: string[]
    date: string
    description: string
    featured_image: string
    team?: string
    role?: string
    visible?: boolean
  }
  content: string
}

export function getProjectContent(slug: string): ProjectMDX | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`)

    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      frontmatter: data as ProjectMDX['frontmatter'],
      content,
    }
  } catch (error) {
    console.error(`Error loading MDX for ${slug}:`, error)
    return null
  }
}

export function getAllProjectSlugs(): string[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }

    const files = fs.readdirSync(contentDirectory)
    return files
      .filter(file => file.endsWith('.mdx'))
      .map(file => file.replace(/\.mdx$/, ''))
  } catch (error) {
    console.error('Error getting project slugs:', error)
    return []
  }
}

export function getAllProjects(): Project[] {
  try {
    if (!fs.existsSync(contentDirectory)) {
      return []
    }

    const files = fs.readdirSync(contentDirectory)
    const projects: Project[] = []

    files
      .filter(file => file.endsWith('.mdx'))
      .forEach(file => {
        const slug = file.replace(/\.mdx$/, '')
        const fullPath = path.join(contentDirectory, file)
        const fileContents = fs.readFileSync(fullPath, 'utf8')
        const { data } = matter(fileContents)

        projects.push({
          slug,
          title: data.title || '',
          tags: data.tags || [],
          date: data.date || '',
          description: data.description || '',
          featured_image: data.featured_image || '',
          gallery_images: data.gallery_images || [],
          team: data.team,
          role: data.role,
          visible: data.visible !== false, // default to true if not specified
        })
      })

    return projects
  } catch (error) {
    console.error('Error getting all projects:', error)
    return []
  }
}
