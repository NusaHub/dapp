import Link from 'next/link';
import { Button } from '@/components/ui/button';

const Navbar = () => {
    return (
        <header className="py-4 px-6 md:px-10 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="text-2xl font-bold text-primary">
                    NusaHub
                </Link>
                <div className="hidden md:flex gap-6 items-center">
                    <Link href="/game-projects" className="text-muted-foreground hover:text-foreground transition-colors">
                        Game Projects
                    </Link>
                    <Link href="/game-projects/my" className="text-muted-foreground hover:text-foreground transition-colors">
                        My Game Projects
                    </Link>
                    <Link href="/game-projects/invested" className="text-muted-foreground hover:text-foreground transition-colors">
                        Invested Game Projects
                    </Link>
                    <Link href="/game-projects/create" className="text-muted-foreground hover:text-foreground transition-colors">
                        Create Game Project
                    </Link>
                    <Link href="/verification" className="text-muted-foreground hover:text-foreground transition-colors">
                        Verification
                    </Link>
                </div>
                <Button>Connect Wallet</Button>
            </nav>
        </header>
    );
};

export default Navbar