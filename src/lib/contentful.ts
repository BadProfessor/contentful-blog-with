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
  
  return {
    id: entry.sys.id,
    title: fields.title || fields.name || 'Untitled',
    slug: fields.slug || fields.title?.toLowerCase().replace(/\s+/g, '-') || entry.sys.id,
    excerpt: fields.excerpt || fields.description || fields.summary || '',
    content: fields.content || fields.body || fields.text || null,
    publishedDate: fields.publishedDate || fields.date || entry.sys.createdAt,
    featuredImageUrl: fields.featuredImage?.fields?.file?.url
      ? `https:${fields.featuredImage.fields.file.url}`
      : fields.image?.fields?.file?.url
      ? `https:${fields.image.fields.file.url}`
      : undefined,
    featuredImageAlt: fields.featuredImage?.fields?.title || fields.image?.fields?.title || fields.title || 'Blog post image',
    author: fields.author || fields.authorName || undefined,
    category: fields.category || fields.categoryName || undefined,
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
      limit: 100,
    })

    return response.items.map(transformBlogPost).sort((a, b) => {
      return new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
    })
  } catch (error: any) {
    console.error('Error fetching blog posts:', error)
    throw error
  }
}
