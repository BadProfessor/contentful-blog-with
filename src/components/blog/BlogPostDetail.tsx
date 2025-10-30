import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, User } from '@phosphor-icons/react'
import type { BlogPostEntry } from '@/types/blog'
import { RichTextRenderer } from './RichTextRenderer'
import { format } from 'date-fns'

interface BlogPostDetailProps {
  post: BlogPostEntry
  onBack: () => void
}

export function BlogPostDetail({ post, onBack }: BlogPostDetailProps) {
  const formattedDate = format(new Date(post.publishedDate), 'MMMM d, yyyy')
  
  const safeTitle = typeof post.title === 'string' ? post.title : 'Untitled'
  const safeExcerpt = typeof post.excerpt === 'string' ? post.excerpt : ''
  const safeCategory = typeof post.category === 'string' ? post.category : ''
  const safeAuthor = typeof post.author === 'string' ? post.author : ''
  const safeTags = Array.isArray(post.tags) ? post.tags.filter(tag => typeof tag === 'string') : []

  return (
    <article className="mx-auto max-w-4xl">
      <Button
        variant="ghost"
        onClick={onBack}
        className="mb-8 -ml-4 transition-transform hover:-translate-x-1"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Articles
      </Button>

      {post.featuredImageUrl && (
        <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || safeTitle}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8 space-y-4">
        {safeCategory && (
          <Badge variant="secondary" className="text-sm">
            {safeCategory}
          </Badge>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {safeTitle}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={post.publishedDate}>{formattedDate}</time>
          </div>
          {safeAuthor && (
            <>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{safeAuthor}</span>
              </div>
            </>
          )}
        </div>
      </header>

      {safeExcerpt && (
        <>
          <p className="mb-8 text-xl leading-relaxed text-secondary">{safeExcerpt}</p>
          <Separator className="mb-8" />
        </>
      )}

      <div className="mb-12">
        <RichTextRenderer content={post.content} />
      </div>

      {safeTags.length > 0 && (
        <>
          <Separator className="mb-8" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            {safeTags.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        </>
      )}
    </article>
  )
}
