"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { ProjectDetails } from "@/lib/types";
import { useEffect, useState } from "react";
import { idrxApprove, usdtApprove } from "@/services/token";
import { toast } from "sonner";
import { fundProject } from "@/services/hub";

const InvestDialog = ({
  project,
  disabled,
}: {
  project: ProjectDetails;
  disabled?: boolean;
}) => {
  const [amount, setAmount] = useState<number>(0);
  const [approve, setApprove] = useState<boolean>(false);

  const onApprove = async () => {
    const approveFn = project.paymentToken === 0 ? idrxApprove : usdtApprove;

    try {
      const result = await approveFn(amount);
      if (result) {
        setApprove(true);
        toast.success("Successfully approved!");
      } else {
        toast.error("Approval failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during approval.");
    }
  };

  const onFund = async (amount: number) => {
    try {
      toast.loading("Waiting for wallet confirmation...");

      const result = await fundProject(Number(project.id), amount);

      toast.dismiss(); // tutup loading toast

      if (result) {
        toast.success("Investment successful!");
        window.location.reload();
      } else {
        toast.error("Investment failed. Please try again.");
      }
    } catch (error) {
      toast.dismiss();
      console.error(error);
      toast.error("Something went wrong during funding.");
    }
  };

  useEffect(() => {}, [approve]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full" disabled={disabled}>
          Invest in Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Invest in {project.gameName}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Choose Currency</Label>
            <RadioGroup defaultValue="idrx" className="flex space-x-4">
              {project.paymentToken == 0 ? (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="idrx" id="idrx" />
                  <Label htmlFor="idrx">IDRX</Label>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="usdt" id="usdt" />
                  <Label htmlFor="usdt">USDT</Label>
                </div>
              )}
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount to invest"
              value={amount || ""}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
        </div>
        {!approve ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              Allow NusaHub to use your{" "}
              {project.paymentToken === 0 ? "IDRX" : "USDT"} tokens for this
              transaction.
            </p>
            <Button onClick={onApprove} className="w-full">
              Approve
            </Button>
          </div>
        ) : (
          <Button onClick={() => onFund(amount)} className="w-full">
            Confirm Investment
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InvestDialog;
