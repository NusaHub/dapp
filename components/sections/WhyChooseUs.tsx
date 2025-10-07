import { ShieldCheck, Milestone, ToyBrick } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-10 h-10 text-primary" />,
        title: 'Transparent & Secure',
        description: 'All funding and withdrawals are managed by audited smart contracts, ensuring transparency and security for both parties.',
    },
    {
        icon: <Milestone className="w-10 h-10 text-primary" />,
        title: 'Milestone-Based Funding',
        description: 'Developers receive funds based on project milestones, giving investors peace of mind and ensuring project accountability.',
    },
    {
        icon: <ToyBrick className="w-10 h-10 text-primary" />,
        title: 'True Ownership',
        description: 'Investors receive project tokens, representing their stake and granting them true ownership in the game\'s success.',
    },
];

const WhyChooseUs = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-12">
                    Why Choose NusaHub?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    {features.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center">
                            <div className="mb-4">{feature.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;