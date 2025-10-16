import { NusaHub_abi } from "@/abi/NusaHub_abi";
import { config } from "@/components/provider/Web3Provider";
import { readContract, writeContract } from "wagmi/actions";
import { NUSA_HUB } from "./network";
import { decimals } from "@/utils/helper";

export async function postProject(
  projectId: number,
  projectName: string,
  paymentToken: number,
  fundingGoal: number,
  timestamps: number[],
  targets: string[]
) {
  try {
    const convertedFundingGoal = fundingGoal * decimals();
    const result = await writeContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "postProject",
      args: [
        projectId,
        projectName,
        paymentToken,
        convertedFundingGoal,
        timestamps,
        targets,
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function fundProject(projectId: number, fundAmount: number) {
  try {
    const convertedFundAmount = fundAmount * decimals();
    const result = await writeContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "fundProject",
      args: [projectId, convertedFundAmount],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function updateProgress(
  projectId: number,
  amount: number,
  proposalId: number,
  description: string
) {
  try {
    const convertedAmount = amount * decimals();
    const result = await writeContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "updateProgress",
      args: [projectId, convertedAmount, proposalId, description],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function withdrawFundsForInvestor(
  projectId: number,
  milestoneTimestampIndex: number
) {
  try {
    const result = await writeContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "withdrawFundsForInvestor",
      args: [projectId, milestoneTimestampIndex],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function cashOut(projectId: number) {
  try {
    const result = await writeContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "cashOut",
      args: [projectId],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProject(projectId: number) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getProject",
      args: [projectId],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getFundingByUser(projectId: number, user: string) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getFundingByUser",
      args: [projectId, user],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getInvestorStatus(projectId: number, user: string) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getInvestorStatus",
      args: [projectId, user],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getMilestoneStatus(
  projectId: number,
  milestoneTimestampIndex: number
) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getMilestoneStatus",
      args: [projectId, milestoneTimestampIndex],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function hasWithdrawnStatus(
  projectId: number,
  milestoneTimestampIndex: number,
  user: string
) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "hasWithdrawnStatus",
      args: [projectId, milestoneTimestampIndex, user],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getFundRaisedPerMilestone(
  projectId: number,
  milestoneTimestampIndex: number
) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getFundRaisedPerMilestone",
      args: [projectId, milestoneTimestampIndex],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProgresses(
  projectId: number,
  milestoneTimestampIndex: number
) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getProgresses",
      args: [projectId, milestoneTimestampIndex],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getAvailablePaymentToken() {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getAvailablePaymentToken",
    });
    const [idrx, usdt] = result as [string, string];
    return [idrx, usdt];
  } catch (error) {
    console.error(error);
  }
}
