import { decimals } from "@/utils/helper";

export function structureProject(project: any) {
  return {
    name: project.name,
    fundingGoal: project.fundingGoal / decimals(),
    paymentToken: Number(project.paymentToken),
    fundRaised: project.fundRaised / decimals(),
    owner: project.owner.toString(),
    milestone: structuredProjectMilestone(project.milestone),
  };
}

export function structuredProjectMilestone(milestone: any) {
  return {
    timestamps: milestone.timestamps.map((t: any) => Number(t)),
    targets: milestone.targets.map((t: any) => t.toString()),
  };
}

export function structuredFunding(funding: any) {
  return {
    amount: Number(funding.amount) / decimals(),
    fundPerMilestone: Number(funding.fundPerMilestone) / decimals(),
    percentageFundAmount: Number(funding.percentageFundAmount),
  };
}

export function structuredProgress(progress: any) {
  return {
    text: progress.text,
    amount: Number(progress.amount) / decimals(),
    proposalId: Number(progress.proposalId),
  };
}
