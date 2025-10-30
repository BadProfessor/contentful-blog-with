import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Warning, ArrowClockwise } from '@phosphor-icons/react'

interface ErrorStateProps {
  message: string
  onRetry?: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="mx-auto max-w-md">
      <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
        <div className="rounded-full bg-destructive/10 p-4">
          <Warning size={48} className="text-destructive" weight="duotone" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">Something went wrong</h3>
          <p className="text-sm text-muted-foreground">{message}</p>
        </div>
        {onRetry && (
          <Button onClick={onRetry} className="mt-4">
            <ArrowClockwise size={20} className="mr-2" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
