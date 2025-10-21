'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useAccount } from "wagmi";
import { useConnectModal } from "@xellar/kit";
import { truncate } from "@/utils/helper";

const Navbar = () => {
    const { address } = useAccount();
    const { open } = useConnectModal();

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const handleConnectWallet = () => {
        open();
        setIsMenuOpen(false);
    }

    const buttonText = isMounted && address ? truncate(address, 4, 4, 11) : "Connect Wallet";

    return (
        <header className="py-4 px-6 md:px-10 bg-background/80 backdrop-blur-sm sticky top-0 z-50 border-b border-secondary">
            <nav className="flex justify-between items-center max-w-7xl mx-auto">
                <Link href="/" className="flex items-center" onClick={closeMenu}>
                    <Image src="/logo.svg" alt="NusaHub Logo" width={140} height={48} className="hidden sm:block h-10 w-auto" priority />
                    <Image src="/logo-compact.svg" alt="NusaHub" width={100} height={40} className="sm:hidden h-8 w-auto" priority />
                </Link>

                <div className="hidden md:flex gap-6 items-center">
                    <Link href="/game-projects" className="text-muted-foreground hover:text-foreground transition-colors">Game Projects</Link>
                    <Link href="/game-projects/my" className="text-muted-foreground hover:text-foreground transition-colors">My Game Projects</Link>
                    <Link href="/game-projects/invested" className="text-muted-foreground hover:text-foreground transition-colors">Invested Projects</Link>
                    <Link href="/game-projects/create" className="text-muted-foreground hover:text-foreground transition-colors">Create Project</Link>
                    <Link href="/verification" className="text-muted-foreground hover:text-foreground transition-colors">Verification</Link>
                </div>

                <div className="hidden md:block">
                    <Button onClick={handleConnectWallet}>
                        {buttonText}
                    </Button>
                </div>

                <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </nav>

            {isMenuOpen && (
                <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-sm border-b border-secondary shadow-lg">
                    <div className="flex flex-col space-y-4 p-6 max-w-7xl mx-auto">
                        <Link href="/game-projects" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMenu}>Game Projects</Link>
                        <Link href="/game-projects/my" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMenu}>My Game Projects</Link>
                        <Link href="/game-projects/invested" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMenu}>Invested Projects</Link>
                        <Link href="/game-projects/create" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMenu}>Create Project</Link>
                        <Link href="/verification" className="text-muted-foreground hover:text-foreground transition-colors py-2" onClick={closeMenu}>Verification</Link>
                        <Button className="mt-4" onClick={handleConnectWallet}>
                            {buttonText}
                        </Button>
                    </div>
                </div>
            )}
        </header>
    );
}

export default Navbar;