import { config } from "@/components/provider/Web3Provider";
import { readContract } from "wagmi/actions";
import { IDRX, NUSA_TOKEN, USDT } from "./network";
import { IDRX_abi } from "@/abi/IDRX_abi";
import { USDT_abi } from "@/abi/USDT_abi";
import { NUSA_abi } from "@/abi/NUSA_abi";

export async function nusaBalance(address: string) {
  try {
    const balance = await readContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "balanceOf",
      args: [address],
    });
    return balance;
  } catch (error) {
    console.error(error);
  }
}

export async function idrxBalance(address: string) {
  try {
    const balance = await readContract(config, {
      abi: IDRX_abi,
      address: IDRX,
      functionName: "balanceOf",
      args: [address],
    });
    return balance;
  } catch (error) {
    console.error(error);
  }
}

export async function usdtBalance(address: string) {
  try {
    const balance = await readContract(config, {
      abi: USDT_abi,
      address: USDT,
      functionName: "balanceOf",
      args: [address],
    });
    return balance;
  } catch (error) {
    console.error(error);
  }
}
