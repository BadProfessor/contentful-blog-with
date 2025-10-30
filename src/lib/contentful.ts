import { createClient, Entry, ContentfulClientApi } from 'contentful'
import type { BlogPost, BlogPostEntry } from '@/types/blog'

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
const environment = import.meta.env.VITE_CONTENTFUL_ENVIRONMENT || 'master'

let contentfulClient: ContentfulClientApi<undefined> | null = null

if (spaceId && accessToken) {
  contentfulClient = createClient({
    space: spaceId,
    accessToken: accessToken,
    environment: environment,
  })
} else {
  console.warn('Contentful credentials not configured. Client not initialized.')
}

export { contentfulClient }

export function transformBlogPost(entry: Entry<any>): BlogPostEntry {
  const fields = entry.fields as any
  
  let featuredImageUrl: string | undefined
  
  if (fields.featuredImage?.fields?.file?.url) {
    featuredImageUrl = `https:${fields.featuredImage.fields.file.url}`
  } else if (fields.image?.fields?.file?.url) {
    featuredImageUrl = `https:${fields.image.fields.file.url}`
  } else if (fields.heroImage?.fields?.file?.url) {
    featuredImageUrl = `https:${fields.heroImage.fields.file.url}`
  } else if (fields.thumbnail?.fields?.file?.url) {
    featuredImageUrl = `https:${fields.thumbnail.fields.file.url}`
  }
  
  const title = String(fields.title || fields.name || fields.heading || 'Untitled')
  const slug = String(fields.slug || title.toLowerCase().replace(/\s+/g, '-') || entry.sys.id)
  
  const extractString = (value: any): string => {
    if (!value) return ''
    if (typeof value === 'string') return value
    if (typeof value === 'object') {
      if (value.fields) {
        const fieldValue = value.fields.title || value.fields.name || value.fields.text || ''
        return typeof fieldValue === 'string' ? fieldValue : ''
      }
      if (value.sys) {
        return ''
      }
    }
    try {
      const stringValue = String(value)
      if (stringValue === '[object Object]') return ''
      return stringValue
    } catch {
      return ''
    }
  }
  
  const extractTags = (tags: any): string[] => {
    if (!tags) return []
    if (Array.isArray(tags)) {
      return tags.map(tag => {
        if (typeof tag === 'string') return tag
        if (typeof tag === 'object' && tag.fields) {
          const tagValue = tag.fields.name || tag.fields.title || tag.fields.text || ''
          return typeof tagValue === 'string' ? tagValue : ''
        }
        try {
          const stringValue = String(tag)
          if (stringValue === '[object Object]') return ''
          return stringValue
        } catch {
          return ''
        }
      }).filter(Boolean)
    }
    return []
  }
  
  return {
    id: entry.sys.id,
    title,
    slug,
    excerpt: extractString(fields.excerpt || fields.description || fields.summary || fields.shortDescription),
    content: fields.content || fields.body || fields.text || fields.richText || null,
    publishedDate: fields.publishedDate || fields.date || fields.publishDate || entry.sys.createdAt,
    featuredImageUrl,
    featuredImageAlt: extractString(
      fields.featuredImage?.fields?.title 
      || fields.image?.fields?.title 
      || fields.heroImage?.fields?.title
      || fields.thumbnail?.fields?.title
      || title
    ) || 'Blog post image',
    author: extractString(fields.author || fields.authorName || fields.writer) || undefined,
    category: extractString(fields.category || fields.categoryName || fields.type) || undefined,
    tags: extractTags(fields.tags),
    createdAt: entry.sys.createdAt,
    updatedAt: entry.sys.updatedAt,
  }
}

export async function getBlogPosts(): Promise<BlogPostEntry[]> {
  if (!contentfulClient) {
    throw new Error('Contentful client not initialized. Please configure your credentials.')
  }

  try {
    const response = await contentfulClient.getEntries({
      limit: 100,
    })

    if (!response.items || response.items.length === 0) {
      return []
    }

    return response.items.map(transformBlogPost).sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}
