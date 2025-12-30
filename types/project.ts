export interface Project {
  slug: string
  title: string
  tags: string[]
  date: string
  description: string
  featured_image: string
  gallery_images: string[]
  team?: string
  role?: string
  visible: boolean
  content?: string
}
