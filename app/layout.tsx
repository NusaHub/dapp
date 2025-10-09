import type { Metadata } from "next";
import { Poppins } from 'next/font/google'
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from "@/components/ui/sonner";

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: "NusaHub - Decentralized Game Funding Platform",
  description: "A platform for decentralized game funding, connecting game developers with investors through blockchain technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${poppins.variable} font-sans dark antialiased flex flex-col min-h-screen bg-background`}>
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
        <Footer />
        <Toaster richColors theme="dark" position="top-right" />
      </body>
    </html>
  );
}