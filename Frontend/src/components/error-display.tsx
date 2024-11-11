import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"

interface ErrorDisplayProps {
  error: string
  title?: string
  onRetry?: () => void
}

export function ErrorDisplay({ error, title = "Error", onRetry }: ErrorDisplayProps) {
  return (
    <Alert variant="destructive" className="max-w-md mx-auto">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="font-semibold">{title}</AlertTitle>
      <AlertDescription className="mt-2">
        <p>{error}</p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-2 bg-destructive/10 border-destructive/20 hover:bg-destructive/20 hover:text-destructive-foreground"
          >
            Try Again
          </Button>
        )}
      </AlertDescription>
    </Alert>
  )
}