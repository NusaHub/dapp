import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type ProjectCardProps = {
    imageUrl: string;
    title: string;
    developer: string;
    genre: string;
    gameType: string;
    status: string;
    funded: number;
    target: number;
};

const ProjectCard = ({
    imageUrl,
    title,
    developer,
    genre,
    gameType,
    status,
    funded,
    target
}: ProjectCardProps) => {
    const progressPercentage = Math.min((funded / target) * 100, 100);

    return (
        <Card className="overflow-hidden hover:shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
            <CardHeader className="p-0 relative"> {/* <-- Tambah 'relative' */}
                {/* Badge Status (Baru) */}
                <Badge
                    className={cn(
                        "absolute top-4 right-4 z-10",
                        status === 'Fully Funded' ? "bg-green-500" : "bg-primary"
                    )}
                >
                    {status}
                </Badge>
                <Image
                    src={imageUrl}
                    alt={title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover"
                />
            </CardHeader>
            <CardContent className="p-4">
                <div className="flex gap-2 mb-2">
                    <Badge variant="secondary">{genre}</Badge>
                    <Badge variant="outline">{gameType.toUpperCase()}</Badge>
                </div>
                <CardTitle className="text-xl font-bold mb-1">{title}</CardTitle>
                <p className="text-sm text-muted-foreground mb-4">by {developer}</p>

                <div>
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-primary">
                            {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(funded)}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            {progressPercentage.toFixed(0)}%
                        </span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                    <p className="text-xs text-right mt-1 text-muted-foreground">
                        Target: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(target)}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default ProjectCard;