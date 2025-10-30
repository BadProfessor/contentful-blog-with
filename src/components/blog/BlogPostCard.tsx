import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from '@phosphor-icons/react'
import type { BlogPostEntry } from '@/types/blog'
import { format } from 'date-fns'

interface BlogPostCardProps {
  post: BlogPostEntry
  onClick: () => void
}

export function BlogPostCard({ post, onClick }: BlogPostCardProps) {
  const formattedDate = format(new Date(post.publishedDate), 'MMM d, yyyy')
  
  const safeTitle = typeof post.title === 'string' ? post.title : 'Untitled'
  const safeExcerpt = typeof post.excerpt === 'string' ? post.excerpt : ''
  const safeCategory = typeof post.category === 'string' ? post.category : ''
  const safeAuthor = typeof post.author === 'string' ? post.author : ''

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl border-border bg-white"
      onClick={onClick}
    >
      {post.featuredImageUrl && (
        <div className="aspect-video w-full overflow-hidden bg-muted">
          <img
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || safeTitle}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-3 pb-4">
        {safeCategory && (
          <Badge variant="secondary" className="w-fit bg-primary/10 text-primary hover:bg-primary/20">
            {safeCategory}
          </Badge>
        )}
        <h2 className="text-xl font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
          {safeTitle}
        </h2>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
          {safeExcerpt}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar size={14} weight="regular" />
          <span>{formattedDate}</span>
        </div>
        {safeAuthor && (
          <div className="flex items-center gap-2">
            <User size={14} weight="regular" />
            <span>{safeAuthor}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
