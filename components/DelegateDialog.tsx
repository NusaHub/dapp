"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { delegates, delegate } from "@/services/identity";
import { Loader2 } from "lucide-react";

const DelegateDialog = () => {
    const { address, isConnected } = useAccount();
    const [isOpen, setIsOpen] = useState(false);
    const [isDelegating, setIsDelegating] = useState(false);
    const [hasChecked, setHasChecked] = useState(false);

    useEffect(() => {
        const checkDelegateStatus = async () => {
            if (!address || !isConnected || hasChecked) return;

            try {
                const isDelegated = await delegates(address);

                if (!isDelegated) {
                    setTimeout(() => {
                        setIsOpen(true);
                    }, 1000);
                }

                setHasChecked(true);
            } catch (error) {
                console.error("Error checking delegate status:", error);
            }
        };

        checkDelegateStatus();
    }, [address, isConnected, hasChecked]);

    const handleDelegate = async () => {
        if (!address) {
            toast.error("Please connect your wallet first");
            return;
        }

        setIsDelegating(true);
        try {
            const result = await delegate(address);
            console.log(result);
            if (result) {
                toast.success("Successfully delegated your voting rights!");
                setIsOpen(false);
            } else {
                toast.error("Failed to delegate. Please try again.");
            }
        } catch (error) {
            console.error("Error delegating:", error);
            toast.error("Failed to delegate. Please check your wallet and try again.");
        } finally {
            setIsDelegating(false);
        }
    };

    const handleSkip = () => {
        setIsOpen(false);
        toast.info("You can delegate your tokens later from your profile settings.");
    };

    if (!isConnected) {
        return null;
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogContent className="sm:max-w-md">
                <AlertDialogHeader>
                    <AlertDialogTitle className="flex items-center gap-2">
                        Activate Your Voting Rights
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm leading-relaxed">
                        Looks like you haven&apos;t activated your voting rights yet. You need to delegate your tokens to participate in project milestone voting and governance decisions.
                        <br />
                        <br />
                        <strong>This is a one-time setup</strong> that enables you to vote on project milestones and earn rewards.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="flex-col sm:flex-row gap-2">
                    <Button
                        variant="outline"
                        onClick={handleSkip}
                        disabled={isDelegating}
                        className="w-full sm:w-auto"
                    >
                        Skip for now
                    </Button>
                    <AlertDialogAction asChild>
                        <Button
                            onClick={handleDelegate}
                            disabled={isDelegating}
                            className="bg-primary hover:bg-primary/90 w-full sm:w-auto"
                        >
                            {isDelegating ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Delegating...
                                </>
                            ) : (
                                "Delegate Now"
                            )}
                        </Button>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DelegateDialog;