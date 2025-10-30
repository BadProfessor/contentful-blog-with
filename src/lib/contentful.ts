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
  const fields = entry.fields as BlogPost['fields']
  
  return {
    id: entry.sys.id,
    title: fields.title || 'Untitled',
    slug: fields.slug || '',
    excerpt: fields.excerpt || '',
    content: fields.content || null,
    publishedDate: fields.publishedDate || entry.sys.createdAt,
    featuredImageUrl: fields.featuredImage?.fields?.file?.url
      ? `https:${fields.featuredImage.fields.file.url}`
      : undefined,
    featuredImageAlt: fields.featuredImage?.fields?.title || fields.title,
    author: fields.author,
    category: fields.category,
    tags: fields.tags || [],
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
      content_type: 'blogPost',
      order: ['-fields.publishedDate'],
      limit: 100,
    })

    return response.items.map(transformBlogPost)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostEntry | null> {
  if (!contentfulClient) {
    throw new Error('Contentful client not initialized. Please configure your credentials.')
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      'fields.slug': slug,
      limit: 1,
    })

    if (response.items.length === 0) {
      return null
    }

    return transformBlogPost(response.items[0])
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw error
  }
}

export async function getAllCategories(): Promise<string[]> {
  if (!contentfulClient) {
    return []
  }

  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      select: ['fields.category'],
      limit: 1000,
    })

    const categories = new Set<string>()
    response.items.forEach((item) => {
      const category = (item.fields as any).category
      if (category) {
        categories.add(category)
      }
    })

    return Array.from(categories).sort()
  } catch (error) {
    console.error('Error fetching categories:', error)
    return []
  }
}
