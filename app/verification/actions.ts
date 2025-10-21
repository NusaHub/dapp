/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import IDAnalyzer from 'idanalyzer';
import { uploadToIPFS } from "@/lib/global";

const CoreAPI = new IDAnalyzer.CoreAPI(process.env.IDANALYZER_API_KEY!, "US");

const performVerification = async (formData: FormData) => {
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

export default performVerification;