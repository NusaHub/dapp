import React from 'react'
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { dummyProjects, currentUserId } from '@/lib/dummy-data';

const InvestedGameProjectsPage = () => {

    const investedProjects = dummyProjects.filter(p => p.investorIds.includes(currentUserId));

    return (
        <div className="container mx-auto max-w-7xl py-12 px-4 flex flex-col flex-grow">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">My Invested Projects</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Track the progress of projects you&#39;ve supported.
                </p>
            </div>

            {investedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {investedProjects.map((project) => (
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
                    <p className="text-center text-muted-foreground">You haven&#39;t invested in any projects yet.</p>
                </div>
            )}
        </div>
    );
}

export default InvestedGameProjectsPage;