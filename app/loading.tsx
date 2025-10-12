export default function Loading() {
    return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-6">
                <div className="mb-8 flex justify-center">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-3 border-primary/20 border-t-primary animate-spin"></div>
                    </div>
                </div>
                <div>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Fund the future of
                        <span className="text-primary font-semibold"> indie gaming</span>
                    </p>
                </div>
            </div>
        </div>
    )
}