import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const contentDirectory = path.join(process.cwd(), 'content/projects')

export interface ProjectMDX {
  slug: string
  frontmatter: {
    title: string
    subtitle: string
    date: string
    description: string
    featured_image: string
    team?: string
    role?: string
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
