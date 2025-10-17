import { config } from "@/components/provider/Web3Provider";
import { readContract, writeContract } from "wagmi/actions";
import { NUSA_TOKEN } from "./network";
import { NUSA_abi } from "@/abi/NUSA_abi";

// nanti kalo dia belum delegate (berlaku untuk investor dan game owner), maka dia harus delegate dulu di awal
// parameter address ini addressnya investor yang lagi login bos
// munculin keterangan di detail game yang ada kata" gini
// "Looks like you haven’t activated your voting rights yet. Tap below to delegate your tokens."
// nanti ada button "Delegate" lalu panggil function ini
// WRITE FUNCTION
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

// dia ngecek sudah delegate ato ga pas manggil function ini game detail
// parameter address ini addressnya investor yang lagi login bos
// kalo return true berarti udah delegate, jadi gaperlu di tampilin keterangan buat delegate (sifatnya cuma 1x aja)
// kalo false berarti perlu nampilin keterangan seperti function diatas
// READ FUNCTION
export async function delegates(address: string) {
  try {
    const result = await readContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "delegates",
      args: [address],
    });
    return result == "0x0000000000000000000000000000000000000000"
      ? false
      : true;
  } catch (error) {
    console.error(error);
  }
}

// kan user ato game owner perlu register ktpnya, nah nanti output verifikasinya yang berupa hash, dioper kesini
// WRITE FUNCTION
export async function registerIdentity(hash: string) {
  try {
    const result = await writeContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "registerIdentity",
      args: [hash],
    });
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

// ini buat cek user ato game owner udah verifikasi belum, kalo hashnya ga "" berarti kan udah verifikasi
// jadi dia bisa upload projek
// function ini dipanggil tiap user nekan 'create game' buat ngecek dah verif belum
// kalo belum berarti nanti diberi modal suruh verifikasi dulu dan diarahkan ke halaman verifikasi
// kalo udah yawes biarin
// READ FUNCTION
export async function getIdentity(address: string) {
  try {
    const hash = await readContract(config, {
      abi: NUSA_abi,
      address: NUSA_TOKEN,
      functionName: "getIdentity",
      args: [address],
    });
    return hash;
  } catch (error) {
    console.error(error);
  }
}
