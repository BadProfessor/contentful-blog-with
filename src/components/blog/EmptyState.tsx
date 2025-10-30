import { Card, CardContent } from '@/components/ui/card'
import { Article } from '@phosphor-icons/react'

interface EmptyStateProps {
  title?: string
  description?: string
}

export function EmptyState({
  title = 'No articles found',
  description = 'Try adjusting your search or filters to find what you\'re looking for.',
}: EmptyStateProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="rounded-full bg-muted p-4">
          <Article size={48} className="text-muted-foreground" weight="duotone" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  )
}
