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
  title: {
    default: "NusaHub - Decentralized Game Funding Platform",
    template: "%s | NusaHub"
  },
  description: "Connect game developers with investors through blockchain technology. Discover innovative gaming projects, invest in the future of gaming, and support Indonesian game development.",
  keywords: "game funding, blockchain, web3 gaming, decentralized finance, game investment, Indonesian games, crypto gaming, NFT gaming",
  authors: [{ name: "NusaHub Team" }],
  creator: "NusaHub",
  publisher: "NusaHub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://nusahub.io'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', type: 'image/svg+xml', sizes: '32x32' },
      { url: '/favicon-16x16.svg', type: 'image/svg+xml', sizes: '16x16' }
    ],
    shortcut: '/favicon.svg',
    apple: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.svg', sizes: '32x32', type: 'image/svg+xml' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nusahub.io',
    siteName: 'NusaHub',
    title: 'NusaHub - Decentralized Game Funding Platform',
    description: 'Connect game developers with investors through blockchain technology. Discover innovative gaming projects and support the future of gaming.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'NusaHub - Decentralized Game Funding Platform',
      }
    ],
  },
  twitter: {
    title: "NusaHub - Decentralized Game Funding Platform",
    description: "Connect game developers with investors through blockchain technology. Discover innovative gaming projects and support the future of gaming.",
    card: 'summary_large_image',
    site: '@nusahub_io',
    creator: '@nusahub_io',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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