import React from 'react'

export const Footer = () => {
    return (
        <footer className="border-t border-secondary">
            <div className="max-w-7xl mx-auto py-6 px-4 text-center text-muted-foreground text-sm">
                <p>&copy; {new Date().getFullYear()} NusaHub. All rights reserved.</p>
                <p className="mt-1">Empowering the next generation of Indonesian game developers.</p>
            </div>
        </footer>
    );
};

export default Footer;