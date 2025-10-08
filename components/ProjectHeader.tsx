import { Badge } from "@/components/ui/badge";
import { type ProjectDetails } from "@/lib/types";
import Image from "next/image";

const ProjectHeader = ({ project }: { project: ProjectDetails }) => {
    return (
        <section>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden mb-4">
                <Image
                    src={project.gameImage}
                    alt={project.gameName}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                />
            </div>
            <div className="flex gap-2 mb-2">
                <Badge variant="secondary">{project.genre.toUpperCase()}</Badge>
                <Badge variant="outline">{project.gameType.toUpperCase()}</Badge>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight">{project.gameName}</h1>
            <p className="text-lg text-muted-foreground">by {project.devName}</p>
            <p className="mt-4 text-foreground/80">{project.description}</p>
        </section>
    );
}

export default ProjectHeader;