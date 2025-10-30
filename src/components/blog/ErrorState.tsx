import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Warning, ArrowClockwise, Book } from '@phosphor-icons/react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  const showSetupGuide = message.includes('content type') || message.includes('Content model')
  
  return (
    <Card className="mx-auto max-w-2xl">
      <CardContent className="flex flex-col items-center gap-6 py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <Warning size={48} className="text-destructive" weight="duotone" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Something went wrong</h3>
          <p className="text-sm text-muted-foreground max-w-md">{message}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          {onRetry && (
            <Button onClick={onRetry} variant="default">
              <ArrowClockwise size={20} className="mr-2" />
              Try Again
            </Button>
          )}
          {showSetupGuide && (
            <Button
              variant="outline"
              onClick={() => window.open('https://github.com/contentful/contentful.js#getting-started', '_blank')}
            >
              <Book size={20} className="mr-2" />
              Setup Guide
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
