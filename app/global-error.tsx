'use client'

import { useEffect } from 'react'

const GlobalError = ({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) => {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <html className="dark">
            <body className="font-sans dark antialiased bg-background text-foreground">
                <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
                    <div className="text-center max-w-md mx-auto px-6">
                        <div className="mb-8">
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 bg-red-500/10 rounded-full flex items-center justify-center">
                                <svg className="w-12 h-12 sm:w-16 sm:h-16 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h1 className="text-2xl sm:text-3xl font-semibold mb-2">
                                Application Error
                            </h1>
                            <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                                A critical error occurred. Please refresh the page or contact support if the problem persists.
                            </p>
                            <div className="space-y-3">
                                <button
                                    onClick={reset}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                                >
                                    Try again
                                </button>
                                <button
                                    onClick={() => window.location.href = '/'}
                                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full"
                                >
                                    Back to Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    )
}

export default GlobalError;