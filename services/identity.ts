import { config } from "@/components/provider/Web3Provider";
import { readContract, writeContract } from "wagmi/actions";
import { NUSA_TOKEN } from "./network";
import { NUSA_abi } from "@/abi/NUSA_abi";

export async function delegate(address: string) {
  try {
    const result = await writeContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "delegate",
      args: [address],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function registerIdentity(hash: string) {
  try {
    const result = await writeContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "registerIdentity",
      args: [hash],
    });
    return result;
  } catch (error) {
    console.error(error);
  }
}

export async function getIdentity(address: string) {
  try {
    const hash = await readContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "registerIdentity",
      args: [address],
    });
    return hash;
  } catch (error) {
    console.error(error);
  }
}