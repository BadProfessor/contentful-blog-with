import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Warning } from '@phosphor-icons/react'

export function MissingCredentials() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="mx-auto max-w-2xl">
        <CardContent className="flex flex-col gap-6 py-12">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
              <Warning size={48} className="text-destructive" weight="duotone" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">
                Contentful Credentials Missing
              </h2>
              <p className="text-muted-foreground">
                Please add your Contentful credentials to continue.
              </p>
            </div>
          </div>

          <div className="space-y-4 rounded-lg bg-muted p-6 text-sm">
            <p className="font-medium text-foreground">Quick Setup:</p>
            <ol className="ml-4 list-decimal space-y-2 text-muted-foreground">
              <li>
                Create or open the <code className="rounded bg-background px-2 py-1">.env.local</code> file in the root directory
              </li>
              <li>Add your Contentful credentials:</li>
            </ol>
            <pre className="overflow-x-auto rounded bg-background p-4 text-xs">
              <code>{`VITE_CONTENTFUL_SPACE_ID=your_space_id_here
VITE_CONTENTFUL_ACCESS_TOKEN=your_access_token_here
VITE_CONTENTFUL_ENVIRONMENT=master`}</code>
            </pre>
            <ol className="ml-4 list-decimal space-y-2 text-muted-foreground" start={3}>
              <li>Save the file and restart the development server</li>
            </ol>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              variant="default"
              onClick={() =>
                window.open(
                  'https://app.contentful.com/deeplink?link=api_keys',
                  '_blank'
                )
              }
            >
              Get Your Contentful API Keys
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                window.open(
                  'https://github.com/contentful/contentful.js',
                  '_blank'
                )
              }
            >
              View Documentation
            </Button>
          </div>

          <p className="text-center text-xs text-muted-foreground">
            Don't have a Contentful account?{' '}
            <a
              href="https://www.contentful.com/sign-up/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline"
            >
              Sign up for free
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
