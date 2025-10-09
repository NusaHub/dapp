export type Milestone = {
    id: string;
    month: Date;
    target: string;
    outputType?: 'general' | 'monetary';
    outputDescription?: string;
    outputUSDT?: number;
    outputIDRX?: number;
};

export type Comment = {
    id: string;
    author: string;
    avatarUrl: string;
    timestamp: string;
    text: string;
    replies?: Comment[];
};

export type ProjectDetails = {
    id: string;
    gameImage: string;
    gameName: string;
    description: string;
    devName: string;
    genre: 'rpg' | 'action' | 'strategy' | 'simulation';
    gameType: 'web2' | 'web3';
    fundedAmount: number;
    fundingTarget: number;
    status: 'Funding' | 'Fully Funded';
    walletAddress: string;
    externalLinks: { title: string; url: string; }[];
    milestones: Milestone[];
    comments: Comment[];
    ownerId: string;
    investorIds: string[];
};