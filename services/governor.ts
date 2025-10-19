import { NusaHub_abi } from "@/abi/NusaHub_abi";
import { config } from "@/components/provider/Web3Provider";
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from "wagmi/actions";
import { NUSA_GOVERNOR, NUSA_HUB } from "./network";
import { NusaGovernor_abi } from "@/abi/NusaGovernor_abi";
import { decodeEventLog, encodeFunctionData } from "viem";
import { keccak256, toUtf8Bytes } from "ethers";
import { getCountdownFromBlockNumber } from "./helper/converter";

// sebelum updateProgress, harus panggil ini dulu buat dapetin proposalId
// proposalId nanti baru dimasukkin ke paramnya updateProgress di hub.ts
// WRITE FUNCTION
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
      args: [[NUSA_HUB], [0], [calldata], description],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getProposalId(description: string, projectId: number) {
  const calldata = encodeFunctionData({
    abi: NusaHub_abi,
    functionName: "processProgress",
    args: [projectId],
  });
  try {
    const result = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "getProposalId",
      args: [[NUSA_HUB], [0], [calldata], keccak256(toUtf8Bytes(description))],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

// buat voting bos progressnya
// vote itu 0 berarti against atau nolak, 1 berarti setuju
// WRITE FUNCTION
export async function voteProgress(proposalId: bigint, vote: number) {
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

// perlu progress yang udah disetujui (kalo waktu votingnya udah habis), perlu ditekan execute manual oleh game ownernya
// biar tokennya bisa masuk ke dee
// WRITE FUNCTION
export async function execute(projectId: number, description: string) {
  try {
    const calldata = encodeFunctionData({
      abi: NusaHub_abi,
      functionName: "processProgress",
      args: [projectId],
    });
    console.log(await getProposalId(description, projectId));

    const result = await writeContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "execute",
      args: [[NUSA_HUB], [0], [calldata], keccak256(toUtf8Bytes(description))],
    });
    return result;
  } catch (error) {
    console.error(error);
    return;
  }
}

// buat tahu ae jumlah votenya berapa, yang setuju berapa yang nolak berapa
// READ FUNCTION
export async function proposalVotes(proposalId: bigint) {
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

// ini paling susah
// tugasnya ini itu ngecek functionnya di fase apa
// 0 berarti Pending
// 1 berarti Active
// 3 berarti Defeated (banyak yang vote no)
// 4 berarti Succeeded (banyak yang vote yes)
// 7 berarti Executed (udah dieksekusi)
// READ FUNCTION (enum)
export async function state(proposalId: bigint) {
  console.log("🔍 Proposal ID (raw):", proposalId);
  console.log("Type:", typeof proposalId);

  try {
    console.log("ahahhahaha");
    console.log(proposalId);
    const state = await readContract(config, {
      abi: NusaGovernor_abi,
      address: NUSA_GOVERNOR,
      functionName: "state",
      args: [proposalId],
    });
    console.log(state);
    return Number(state);
  } catch (error) {
    console.error(error);
    return 100;
  }
}

// dipake biar tahu votenya start di block ke berapa, cara implementasi cek 2 ini
// QuestDetail --> https://github.com/NusaQuest/frontend/blob/main/src/pages/QuestDetail.jsx
// Countdown --> https://github.com/NusaQuest/frontend/blob/main/src/components/sections/Countdown.jsx
// referensi kalo mau bikin countdown yang getCountdown (beda dari ini gapa kok aman) --> https://github.com/NusaQuest/frontend/blob/main/src/utils/helper.js
// READ FUNCTION
export async function proposalSnapshot(proposalId: bigint) {
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

// dipake biar tahu votenya selesai di block ke berapa, cara implementasi cek 2 ini
// QuestDetail --> https://github.com/NusaQuest/frontend/blob/main/src/pages/QuestDetail.jsx
// Countdown --> https://github.com/NusaQuest/frontend/blob/main/src/components/sections/Countdown.jsx
// referensi kalo mau bikin countdown yang getCountdown (beda dari ini gapa kok aman) --> https://github.com/NusaQuest/frontend/blob/main/src/utils/helper.js
// READ FUNCTION
export async function proposalDeadline(proposalId: bigint) {
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
