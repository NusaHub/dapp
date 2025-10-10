/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";

async function getCurrentUser() {
    // TODO: Implement this to get the current logged-in user
    return {
        id: "user_123",
        role: "investor",
        walletAddress: "0xInvestorWalletAddress"
    };
}

const investSchema = z.object({
    projectId: z.string(),
    amount: z.number().positive(),
    currency: z.enum(["IDRX", "USDT"]),
});

export async function investInProject(values: z.infer<typeof investSchema>) {
    try {
        const validatedFields = investSchema.safeParse(values);
        if (!validatedFields.success) return { error: "Invalid input data." };

        const { projectId, amount, currency } = validatedFields.data;
        const user = await getCurrentUser();

        // TODO: AUTH CHECK - Pastikan pengguna adalah investor
        if (!user || user.role !== 'investor') {
            return { error: "You are not authorized to perform this action." };
        }

        console.log("--- PROSES INVESTASI ---");
        console.log("-> PANGGIL SMART CONTRACT: Transfer dana investasi", { from: user.walletAddress, amount, currency });
        console.log("-> PANGGIL BACKEND SERVER: Catat transaksi investasi dan update jumlah dana terkumpul untuk proyek", projectId);

        revalidatePath(`/game-projects/${projectId}`);
        return { success: "Investment successful!" };
    } catch (error) {
        return { error: "An unexpected error occurred during investment." };
    }
}

const milestoneOutputSchema = z.object({
    projectId: z.string(),
    milestoneId: z.string(),
    outputType: z.enum(["general", "monetary"]),
    outputDescription: z.string().min(10),
    usdtAmount: z.number().optional(),
    idrxAmount: z.number().optional(),
});

export async function submitMilestoneOutput(values: z.infer<typeof milestoneOutputSchema>) {
    try {
        const validatedFields = milestoneOutputSchema.safeParse(values);
        if (!validatedFields.success) return { error: "Invalid output data." };

        const { projectId, milestoneId, ...outputData } = validatedFields.data;
        const user = await getCurrentUser();

        // TODO: AUTH CHECK - Pastikan pengguna adalah pemilik proyek

        console.log("--- PROSES SIMPAN OUTPUT MILESTONE ---");
        console.log("-> PANGGIL BACKEND SERVER: Simpan output untuk milestone", milestoneId, "dengan data:", outputData);

        revalidatePath(`/game-projects/${projectId}`);
        return { success: "Milestone output saved successfully!" };
    } catch (error) {
        return { error: "Failed to save milestone output." };
    }
}

const commentSchema = z.object({
    projectId: z.string(),
    text: z.string().min(1),
    parentId: z.string().optional(),
});

export async function postComment(values: z.infer<typeof commentSchema>) {
    try {
        const validatedFields = commentSchema.safeParse(values);
        if (!validatedFields.success) return { error: "Comment cannot be empty." };

        const { projectId, text, parentId } = validatedFields.data;
        const user = await getCurrentUser();

        // TODO: AUTH CHECK - Pastikan pengguna sudah login
        if (!user) return { error: "You must be logged in to comment." };

        console.log("--- PROSES KIRIM KOMENTAR ---");
        console.log("-> PANGGIL BACKEND SERVER: Simpan komentar baru", { projectId, text, parentId, authorId: user.id });

        revalidatePath(`/game-projects/${projectId}`);
        return { success: "Comment posted!" };
    } catch (error) {
        return { error: "Failed to post comment." };
    }
}

const projectActionSchema = z.object({
    projectId: z.string(),
    milestoneId: z.string().optional(),
});

export async function withdrawFunds(values: z.infer<typeof projectActionSchema>) {
    const { projectId, milestoneId } = values;
    // TODO: AUTH CHECK - Pastikan user adalah pemilik proyek

    console.log("--- PROSES WITHDRAW DANA MILESTONE ---");
    console.log("-> PANGGIL SMART CONTRACT: Lakukan penarikan dana (withdraw) untuk milestone", milestoneId);
    console.log("-> PANGGIL BACKEND SERVER: Tandai milestone sebagai 'withdrawn' jika perlu");

    revalidatePath(`/game-projects/${projectId}`);
    return { success: "Withdraw process initiated." };
}

export async function cashOut(values: z.infer<typeof projectActionSchema>) {
    const { projectId } = values;
    // TODO: AUTH CHECK - Pastikan user adalah pemilik & proyek sudah selesai

    console.log("--- PROSES CASH OUT ---");
    console.log("-> PANGGIL SMART CONTRACT: Lakukan cash out sisa dana untuk proyek", projectId);

    revalidatePath(`/game-projects/${projectId}`);
    return { success: "Cash out process initiated." };
}

export async function voteOnMilestone(values: z.infer<typeof projectActionSchema>) {
    const { projectId, milestoneId } = values;
    const user = await getCurrentUser();
    // TODO: AUTH CHECK - Pastikan user adalah investor di proyek ini

    console.log("--- PROSES VOTE MILESTONE ---");
    console.log("-> PANGGIL BACKEND SERVER atau SMART CONTRACT: Catat suara (vote) dari user", user.id, "untuk milestone", milestoneId);

    revalidatePath(`/game-projects/${projectId}`);
    return { success: "Vote submitted." };
}