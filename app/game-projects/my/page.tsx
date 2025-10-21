import { Metadata } from 'next'
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { dummyProjects, currentUserId } from '@/lib/dummy-data';

export const metadata: Metadata = {
    title: "My Game Projects",
    description: "Manage and view the status of all game projects you've created on NusaHub. Track funding progress, manage milestones, and communicate with your investors.",
    keywords: "my projects, game management, project dashboard, game funding, developer portal",
    alternates: {
        canonical: '/game-projects/my',
    },
    openGraph: {
        title: "My Game Projects - NusaHub",
        description: "Manage and view the status of all game projects you've created on NusaHub. Track funding progress and manage milestones.",
        url: "https://nusahub.io/game-projects/my",
    },
    twitter: {
        title: "My Game Projects - NusaHub",
        description: "Manage and view the status of all game projects you've created on NusaHub. Track funding progress and manage milestones.",
    }
}

export default function MyGameProjectsPage() {

    const myProjects = dummyProjects.filter(p => p.ownerId === currentUserId);

    return (
        <div className="container mx-auto max-w-7xl py-12 px-4 flex flex-col flex-grow">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">My Game Projects</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Manage and view the status of all projects you&#39;ve created.
                </p>
            </div>

            {myProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {myProjects.map((project) => (
                        <Link href={`/game-projects/${project.id}`} key={project.id}>
                            <div className="h-full">
                                <ProjectCard
                                    imageUrl={project.gameImage}
                                    title={project.gameName}
                                    developer={project.devName}
                                    genre={project.genre}
                                    gameType={project.gameType}
                                    status={project.status}
                                    funded={project.fundedAmount}
                                    target={project.fundingTarget}
                                />
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <div className="flex-grow flex flex-col items-center justify-center">
                    <p className="text-center text-muted-foreground">You haven&#39;t created any projects yet.</p>
                </div>
            )}
        </div>
    );
}