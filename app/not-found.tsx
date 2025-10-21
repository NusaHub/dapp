import { Button } from '@/components/ui/button'
import Link from 'next/link'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="mb-8">
                    <div className="relative w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-4xl sm:text-6xl font-bold text-primary">404</span>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2">
                        Page Not Found
                    </h1>
                    <p className="text-muted-foreground mb-6 text-sm sm:text-base">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                    <div className="space-y-3">
                        <Link href="/" className="block">
                            <Button className="w-full bg-primary hover:bg-primary/90">
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/game-projects" className="block">
                            <Button variant="outline" className="w-full hover:bg-accent hover:text-accent-foreground">
                                Explore Projects
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound;