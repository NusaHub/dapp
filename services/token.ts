import { config } from "@/components/provider/Web3Provider";
import { readContract } from "wagmi/actions";
import { IDRX, NUSA_HUB, NUSA_TOKEN, USDT } from "./network";
import { IDRX_abi } from "@/abi/IDRX_abi";
import { USDT_abi } from "@/abi/USDT_abi";
import { NUSA_abi } from "@/abi/NUSA_abi";
import { decimals } from "@/utils/helper";

// ini buat nampilin user udah invest berapa di tiap projek
// nanti ini itu dibuat voting, sisteme adalah suara tiap user berdasarkan jumlah token yang ia punyai
// READ FUNCTION
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

// jadi nanti kalo investor mau fund project pake IDRX, sebelumnya dia harus run ini dulu
// tambahin modal ya buat nanya approve ini kayak kalimate "Before investing, please allow NusaHub to use your IDRX tokens for this transaction."
// fundAmount yang di parameter ini harus sama dengan yang dia invest di projek ini
// WRITE FUNCTION
export async function idrxApprove(fundAmount: number) {
  try {
    const convertedFundAmount = fundAmount * decimals();
    const balance = await readContract(config, {
      abi: IDRX_abi,
      address: IDRX,
      functionName: "approve",
      args: [NUSA_HUB, convertedFundAmount],
    });
    return balance;
  } catch (error) {
    console.error(error);
  }
}

// jadi nanti kalo investor mau fund project pake USDT, sebelumnya dia harus run ini dulu
// tambahin modal ya buat nanya approve ini kayak kalimate "Before investing, please allow NusaHub to use your USDT tokens for this transaction."
// fundAmount yang di parameter ini harus sama dengan yang dia invest di projek ini
// WRITE FUNCTION
export async function usdtApprove(fundAmount: number) {
  try {
    const convertedFundAmount = fundAmount * decimals();
    const balance = await readContract(config, {
      abi: USDT_abi,
      address: USDT,
      functionName: "approve",
      args: [NUSA_HUB, convertedFundAmount],
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
