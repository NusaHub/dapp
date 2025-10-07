/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import IDAnalyzer from 'idanalyzer';
import { PinataSDK } from "pinata-web3";

const CoreAPI = new IDAnalyzer.CoreAPI(process.env.IDANALYZER_API_KEY!, "US");
const pinata = new PinataSDK({
    pinataJwt: process.env.PINATA_JWT!,
    pinataGateway: process.env.PINATA_GATEWAY,
});

const uploadToIPFS = async (file: File) => {
    try {
        const formData = new FormData();
        formData.append('file', file);
        const upload = await pinata.upload.file(formData.get('file') as File);
        return upload.IpfsHash;
    } catch (error) {
        console.error("Error uploading to IPFS:", error);
        return null;
    }
};

export async function performVerification(formData: FormData) {
    const identityImage = formData.get('identityImage') as File | null;
    const faceImage = formData.get('faceImage') as File | null;

    if (!identityImage || !faceImage) {
        return { success: false, error: "Missing image files." };
    }

    try {
        const identityHash = await uploadToIPFS(identityImage);
        const faceHash = await uploadToIPFS(faceImage);

        if (!identityHash || !faceHash) {
            return { success: false, error: "IPFS upload failed." };
        }

        const identityUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${identityHash}`;
        const faceUrl = `https://${process.env.PINATA_GATEWAY}/ipfs/${faceHash}`;

        CoreAPI.setBiometricThreshold(0.6);
        CoreAPI.enableAuthentication(true, 2);

        const response = await CoreAPI.scan({
            document_primary: identityUrl,
            biometric_photo: faceUrl,
        });

        if (response.error) {
            return { success: false, error: response.error.message };
        }

        if (response.result?.nationality_full !== 'Indonesia') {
            return { success: false, error: "Nationality must be Indonesia." };
        }

        if (response.face?.isIdentical) {
            return { success: true, data: response.result };
        } else {
            return { success: false, error: "The biometric data does not match." };
        }

    } catch (err: any) {
        console.error("Verification Action Error:", err);
        return { success: false, error: err.message || "An unknown error occurred." };
    }
}