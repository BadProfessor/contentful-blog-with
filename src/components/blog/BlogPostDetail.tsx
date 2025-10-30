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
            alt={post.featuredImageAlt || post.title}
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <header className="mb-8 space-y-4">
        {post.category && (
          <Badge variant="secondary" className="text-sm">
            {post.category}
          </Badge>
        )}
        <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-5xl">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar size={18} />
            <time dateTime={post.publishedDate}>{formattedDate}</time>
          </div>
          {post.author && (
            <>
              <span className="text-border">•</span>
              <div className="flex items-center gap-2">
                <User size={18} />
                <span>{post.author}</span>
              </div>
            </>
          )}
        </div>
      </header>

      {post.excerpt && (
        <>
          <p className="mb-8 text-xl leading-relaxed text-secondary">{post.excerpt}</p>
          <Separator className="mb-8" />
        </>
      )}

      <div className="mb-12">
        <RichTextRenderer content={post.content} />
      </div>

      {post.tags && post.tags.length > 0 && (
        <>
          <Separator className="mb-8" />
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            {post.tags.map((tag) => (
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
