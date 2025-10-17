import { NusaHub_abi } from "@/abi/NusaHub_abi";
import { config } from "@/components/provider/Web3Provider";
import { readContract, writeContract } from "wagmi/actions";
import { NUSA_HUB } from "./network";
import { decimals } from "@/utils/helper";
import {
  structuredFunding,
  structuredProgress,
  structureProject,
} from "./helper/structured";

// buat ngepost projek
// payment token ini kalo 0 berarti IDRX, kalo 1 berarti USDT
// WRITE FUNCTION
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

// buat dipanggil investor kalo mau investasi
// inget panggil approve dulu ya di file token.ts (entah itu idrxApprove ato usdtApprove tergantung projeknya nerima dalam IDRX or USDT)
// WRITE FUNCTION
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

// ini dipanggil sama game owner kalo dia mau update progress
// nah kan ada progress yang ada uange dan ada yang gada uange, kalo gada uange kasi 0
// nah proposalId ini didapetin dari function proposeProgress di governor.ts
// WRITE FUNCTION
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

// buat investor withdraw uangnya tiap milestone
// milestoneTimestampIndex itu id milestonenya
// WRITE FUNCTION
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

// buat cashout sisa uangnya investor
// WRITE FUNCTION
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

// buat fetch projek
// READ FUNCTION
export async function getProject(projectId: number) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getProject",
      args: [projectId],
    });
    return structureProject(result);
  } catch (error) {
    console.error(error);
  }
}

// buat tau user udah invest berapa di suatu projek
// READ FUNCTION
export async function getFundingByUser(projectId: number, user: string) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getFundingByUser",
      args: [projectId, user],
    });
    return structuredFunding(result);
  } catch (error) {
    console.error(error);
  }
}

// user itu addressnya user dan ini buat return true or false
// lek true berarti user invest di projek tersebut
// READ FUNCTION
export async function getInvestorStatus(projectId: number, user: string) {
  try {
    const result = await readContract(config, {
      abi: NusaHub_abi,
      address: NUSA_HUB,
      functionName: "getInvestorStatus",
      args: [projectId, user],
    });
    return Boolean(result);
  } catch (error) {
    console.error(error);
  }
}

// buat cek status permilestone, kalo true berarti dah komplit milestonenya
// kalo false ya jek blm komplit
// READ FUNCTION
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
    return Boolean(result);
  } catch (error) {
    console.error(error);
  }
}

// buat cek apakah investor udah withdraw di milestone tersebut, returnnya true or false
// READ FUNCTION
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
    return Boolean(result);
  } catch (error) {
    console.error(error);
  }
}

// progressnya ini buat progress yang diupload game owner tiap milestone
// READ FUNCTION
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
    return structuredProgress(result);
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


// to do
// 1. ngurangi funding kalo investor cashout