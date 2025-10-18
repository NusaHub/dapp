import { config } from "@/components/provider/Web3Provider";
import { getBlock, getBlockNumber } from "wagmi/actions";

export async function getBlockTimestamp() {
  const block = await getBlock(config, {
    blockTag: "latest",
  });
  return Number(block.timestamp);
}

export async function getCountdownFromBlockNumber(blockNumber: number) {
  try {
    const currentBlockNumber = await getBlockNumber(config);
    const now = Math.floor(Date.now() / 1000);

    if (blockNumber <= currentBlockNumber) {
      const block = await getBlock(config, {
        blockNumber: BigInt(blockNumber),
      });
      return new Date(Number(block.timestamp) * 1000);
    } else {
      const diff = Number(blockNumber) - Number(currentBlockNumber);
      const estimated = now + diff * 2;
      return new Date(Number(estimated) * 1000);
    }
  } catch (error) {
    console.error(error);
    return;
  }
}
