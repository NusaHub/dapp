import { PinataSDK } from "pinata-web3";

const pinata = new PinataSDK({
  pinataJwt: process.env.PINATA_JWT!,
  pinataGateway: process.env.PINATA_GATEWAY,
});

export const uploadToIPFS = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const upload = await pinata.upload.file(formData.get("file") as File);
    return upload.IpfsHash;
  } catch (error) {
    console.error("Error uploading to IPFS:", error);
    return null;
  }
};
