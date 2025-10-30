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

  return (
    <Card
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
      onClick={onClick}
    >
      {post.featuredImageUrl && (
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={post.featuredImageUrl}
            alt={post.featuredImageAlt || post.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardHeader className="space-y-3 pb-4">
        {post.category && (
          <Badge variant="secondary" className="w-fit">
            {post.category}
          </Badge>
        )}
        <h2 className="font-display text-2xl font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
          {post.title}
        </h2>
      </CardHeader>
      <CardContent className="pb-4">
        <p className="line-clamp-3 text-base leading-relaxed text-muted-foreground">
          {post.excerpt}
        </p>
      </CardContent>
      <CardFooter className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
        {post.author && (
          <div className="flex items-center gap-2">
            <User size={16} />
            <span>{post.author}</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}
