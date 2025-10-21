import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Identity Verification",
  description: "Complete your identity verification to access all features of the NusaHub platform. Secure verification process to ensure platform safety and compliance.",
  keywords: "identity verification, KYC, account verification, secure platform, user authentication",
  alternates: {
    canonical: '/verification',
  },
  openGraph: {
    title: "Identity Verification - NusaHub",
    description: "Complete your identity verification to access all features of the NusaHub platform. Secure verification process for platform safety.",
    url: "https://nusahub.io/verification",
  },
  twitter: {
    title: "Identity Verification - NusaHub",
    description: "Complete your identity verification to access all features of the NusaHub platform. Secure verification process for platform safety.",
  }
}

export default function VerificationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}