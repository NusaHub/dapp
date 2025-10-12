'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="mb-8">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 bg-destructive/10 rounded-full flex items-center justify-center">
                        <svg className="w-12 h-12 sm:w-16 sm:h-16 text-destructive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                        Something went wrong!
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        We encountered an unexpected error while loading this page. Don&apos;t worry, we&apos;re working to fix it.
                    </p>
                    <div className="space-y-3">
                        <Button
                            onClick={reset}
                            className="w-full bg-primary hover:bg-primary/90"
                        >
                            Try again
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/'}
                            variant="outline"
                            className="w-full hover:bg-accent hover:text-accent-foreground"
                        >
                            Back to Home
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}