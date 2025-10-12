import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Create Game Project",
  description: "Start your game funding journey by creating a project on NusaHub. Connect with investors and bring your gaming vision to life through decentralized funding.",
  keywords: "create game project, game funding, indie game development, web3 gaming, blockchain funding, game investment",
  alternates: {
    canonical: '/game-projects/create',
  },
  openGraph: {
    title: "Create Game Project - NusaHub",
    description: "Start your game funding journey by creating a project on NusaHub. Connect with investors and bring your gaming vision to life.",
    url: "https://nusahub.io/game-projects/create",
  },
  twitter: {
    title: "Create Game Project - NusaHub",
    description: "Start your game funding journey by creating a project on NusaHub. Connect with investors and bring your gaming vision to life.",
  }
}

export default function CreateProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}