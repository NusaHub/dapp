import React from 'react'
import Link from 'next/link';
import ProjectCard from '@/components/ProjectCard';
import { dummyProjects } from '@/lib/dummy-data';

const GameProjectsPage = () => {

    const allProjects = dummyProjects;

    return (
        <div className="container mx-auto max-w-7xl py-12 px-4 flex flex-col flex-grow">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight">All Game Projects</h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    Discover and support the next generation of games.
                </p>
            </div>

            {allProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allProjects.map((project) => (
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
                    <p className="text-center text-muted-foreground">No projects found.</p>
                </div>
            )}
        </div>
    );
}

export default GameProjectsPage;