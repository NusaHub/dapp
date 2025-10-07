import ProjectCard from '../ProjectCard';

const dummyProjects = [
    {
        imageUrl: 'https://placehold.co/400x200/8A42D4/FFFFFF?text=Project+A',
        title: 'Skyborne Legacy',
        developer: 'Nusantara Arts',
        genre: 'RPG',
        gameType: 'web3',
        status: 'Funding',
        funded: 75_000_000,
        target: 200_000_000,
    },
    {
        imageUrl: 'https://placehold.co/400x200/1E40AF/FFFFFF?text=Project+B',
        title: 'Cyber Runner 2077',
        developer: 'Garuda Games',
        genre: 'Action',
        gameType: 'web3',
        status: 'Fully Funded',
        funded: 180_000_000,
        target: 180_000_000,
    },
    {
        imageUrl: 'https://placehold.co/400x200/BE123C/FFFFFF?text=Project+C',
        title: 'Archipelago Tycoon',
        developer: 'Dev Merah Putih',
        genre: 'Simulation',
        gameType: 'web2',
        status: 'Funding',
        funded: 30_000_000,
        target: 100_000_000,
    },
];

const LatestProjects = () => {
    return (
        <section className="py-20 bg-secondary">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-10">
                    Discover Innovative Games
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {dummyProjects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestProjects;