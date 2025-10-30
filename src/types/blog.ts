export interface BlogPost {
  sys: {
    id: string
    createdAt: string
    updatedAt: string
  }
  fields: {
    title: string
    slug: string
    excerpt: string
    content: any
    publishedDate: string
    featuredImage?: {
      fields: {
        title: string
        description?: string
        file: {
          url: string
          details: {
            size: number
            image?: {
              width: number
              height: number
            }
          }
          fileName: string
          contentType: string
        }
      }
    }
    author?: string
    category?: string
    tags?: string[]
  }
}

export interface BlogPostEntry {
  id: string
  title: string
  slug: string
  excerpt: string
  content: any
  publishedDate: string
  featuredImageUrl?: string
  featuredImageAlt?: string
  author?: string
  category?: string
  tags?: string[]
  createdAt: string
  updatedAt: string
}
