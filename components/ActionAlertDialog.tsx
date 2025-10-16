"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface ActionAlertDialogProps {
    triggerText: string;
    title: string;
    description: string;
    onConfirm?: () => void;
    onApprove?: () => void;
    onReject?: () => void;
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | null;
    type?: "confirmation" | "vote";
}

const ActionAlertDialog = ({
    triggerText,
    title,
    description,
    onConfirm,
    onApprove,
    onReject,
    variant,
    type = "confirmation"
}: ActionAlertDialogProps) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant={variant || "outline"} className="w-full">{triggerText}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    <AlertDialogDescription>{description}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {type === "vote" ? (
                        <>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button
                                    variant="destructive"
                                    onClick={onReject}
                                    className="mr-2"
                                >
                                    Reject
                                </Button>
                            </AlertDialogAction>
                            <AlertDialogAction asChild>
                                <Button
                                    variant="default"
                                    onClick={onApprove}
                                >
                                    Approve
                                </Button>
                            </AlertDialogAction>
                        </>
                    ) : (
                        <>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction asChild>
                                <Button variant={variant} onClick={onConfirm}>Confirm</Button>
                            </AlertDialogAction>
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default ActionAlertDialog;