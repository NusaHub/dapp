"use server";

import { projectSchema, type ProjectFormValues } from "@/lib/validation";
import { uploadToIPFS } from "@/lib/global";

const createProjectAction = async (values: ProjectFormValues) => {
    const validatedFields = projectSchema.safeParse(values);

    if (!validatedFields.success) {
        return { success: false, error: "Invalid data provided." };
    }

    const { gameImage, ...projectData } = validatedFields.data;

    try {
        const ipfsHash = await uploadToIPFS(gameImage);
        if (!ipfsHash) {
            return { success: false, error: "Failed to upload game image." };
        }

        const finalProjectData = {
            ...projectData,
            imageUrl: `${process.env.PINATA_GATEWAY}/ipfs/${ipfsHash}`,
        };

        // TODO: Ganti bagian ini dengan logika backend Anda
        console.log("Saving to database:", finalProjectData);

        // TODO: Ganti bagian ini dengan logika web3 Anda (ethers.js / viem)
        console.log("Interacting with smart contract...");

        return { success: true, message: "Project created successfully!", data: finalProjectData };

    } catch (error) {
        console.error("Create Project Action Error:", error);
        if (error instanceof Error) {
            return { success: false, error: error.message };
        }
        return { success: false, error: "An unexpected error occurred." };
    }
}

export default createProjectAction;