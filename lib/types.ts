export type Milestone = {
  id: string;
  date: Date;
  target: string;
  outputType?: "general" | "monetary";
  outputDescription?: string;
  output?: number;
  voteCount?: number;
  proposalId?: bigint;
  status: boolean;
  proposalStatus: number;
  // outputIDRX?: number;
};

export type Comment = {
  id: string;
  author: string;
  avatarUrl: string;
  timestamp: string;
  text: string;
  replies?: Comment[];
};

export type Investment = {
  investorId: string;
  amount: number;
};

export type ProjectDetails = {
  id: string;
  gameImage: string;
  gameName: string;
  description: string;
  devName: string;
  genre: "rpg" | "action" | "strategy" | "simulation";
  paymentToken: number;
  gameType: "web2" | "web3";
  fundedAmount: number;
  fundingTarget: number;
  status: "Not funded yet" | "Funding" | "Fully Funded";
  walletAddress: string;
  externalLinks: { title: string; url: string }[];
  milestones: Milestone[];
  comments: Comment[];
  ownerId: string;
  investorIds: string[];
  investments: Investment[];
  // fundingEndDate: Date;
  // fundingStartDate: Date;
};
