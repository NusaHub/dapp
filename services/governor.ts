import { NusaHub_abi } from "@/abi/NusaHub_abi";
import { config } from "@/components/provider/Web3Provider";
import { readContract, writeContract } from "wagmi/actions";
import { NUSA_GOVERNOR, NUSA_HUB } from "./network";
import { NusaGovernor_abi } from "@/abi/NusaGovernor_abi";
import { encodeFunctionData } from "viem";
import { keccak256, toUtf8Bytes } from "ethers";
import { getCountdownFromBlockNumber } from "./helper/converter";

export async function proposeProgress(description: string, projectId: number) {
  try {
    const calldata = encodeFunctionData({
      abi: NusaHub_abi,
      functionName: "processProgress",
      args: [projectId],
    });

    const result = await writeContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "proposeProgress",
      args: [[NusaHub_abi], [0], [calldata], description],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function voteProgress(proposalId: number, vote: number) {
  try {
    const result = await writeContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "voteProgress",
      args: [proposalId, vote],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function execute(projectId: number, description: string) {
  try {
    const calldata = encodeFunctionData({
      abi: NusaHub_abi,
      functionName: "processProgress",
      args: [projectId],
    });

    const result = await writeContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "execute",
      args: [
        [NusaHub_abi],
        [0],
        [calldata],
        keccak256(toUtf8Bytes(description)),
      ],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalVotes(proposalId: number) {
  try {
    const result = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "proposalVotes",
      args: [proposalId],
    });
    const [totalAgainst, totalFor] = result as [string, string];
    return [totalAgainst, totalFor];
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function state(proposalId: number) {
  try {
    const state = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "state",
      args: [proposalId],
    });
    return state;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalSnapshot(proposalId: number) {
  try {
    const snapshot = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "proposalSnapshot",
      args: [proposalId],
    });
    const countdown = await getCountdownFromBlockNumber(Number(snapshot));
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}

export async function proposalDeadline(proposalId: number) {
  try {
    const deadline = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "proposalDeadline",
      args: [proposalId],
    });
    const countdown = await getCountdownFromBlockNumber(Number(deadline));
    return countdown;
  } catch (error) {
    console.error(error);
    return;
  }
}
