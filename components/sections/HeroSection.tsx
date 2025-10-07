import { Button } from '@/components/ui/button';
import Link from 'next/link';

const HeroSection = () => {
    return (
        <section className="text-center py-20 md:py-32">
            <div className="max-w-4xl mx-auto px-4">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground mb-4">
                    Empowering Game Creators,
                    <br />
                    <span className="text-primary">Connecting Worlds</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
                    The decentralized hub where innovative game developers meet visionary investors to bring the next generation of games to life.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/game-projects">
                        <Button size="lg">Explore Projects</Button>
                    </Link>
                    <Link href="/game-projects/create">
                        <Button size="lg" variant="outline">
                            Create Project
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;