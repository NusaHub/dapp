import { z } from "zod";

export const projectSchema = z.object({
    gameImage: z.any()
        .refine((file) => file?.size <= 5000000, `Size must be less than 5MB.`)
        .refine(
            (file) => ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file?.type),
            "Only .jpg, .jpeg, .png, and .webp formats are supported."
        ),
    gameName: z.string().min(3, { message: "Game name must be at least 3 characters long." }),
    description: z.string().min(20, { message: "Description must be at least 20 characters long." }),
    devName: z.string().min(2, { message: "Developer name must be at least 2 characters long." }),
    genre: z.string().min(1, { message: "Genre must be selected." }),
    gameType: z.enum(['web2', 'web3']),
    fundingTarget: z.number().positive({ message: "Funding target must be greater than 0." }),

    milestones: z.array(
        z.object({
            month: z.string().min(1, "Month must not be empty."),
            target: z.string().min(3, "Milestone target must not be empty."),
            output: z.string().min(3, "Output milestone must not be empty."),
        })
    ).min(1, "At least one milestone is required."),

    externalLinks: z.array(
        z.object({
            title: z.string().min(3, "Link title must not be empty."),
            url: z.string().url({ message: "Invalid URL." }),
        })
    ).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;