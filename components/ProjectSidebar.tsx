"use client";

import { Progress } from "@/components/ui/progress";
import { Milestone, type ProjectDetails } from "@/lib/types";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import InvestDialog from "./InvestDialog";
import ActionAlertDialog from "./ActionAlertDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import {
  cashOut,
  hasWithdrawnStatus,
  withdrawFundsForInvestor,
} from "@/services/hub";
import { useEffect, useState } from "react";
import {
  proposalDeadline,
  proposalSnapshot,
  voteProgress,
} from "@/services/governor";
import ConfirmDialog from "./ConfirmDialog";
import { useAccount } from "wagmi";

interface ProjectSidebarProps {
  project: ProjectDetails;
  userInvestmentAmount: number;
  setSidebarLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProjectSidebar = ({
  project,
  userInvestmentAmount,
  setSidebarLoading,
}: ProjectSidebarProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(project.walletAddress);
    toast.success("Wallet address copied to clipboard!");
  };
  const isInvestDisabled = project.status == "Fully Funded";
  const [milestone, setMilestone] = useState<Milestone | null>(null);
  // const [loading, setLoading] = useState(true);

  const [pendingTimer, setPendingTimer] = useState<Date | undefined>(undefined);
  const [activeTimer, setActiveTimer] = useState<Date | undefined>(undefined);
  const [withdrawStatus, setWithdrawStatus] = useState(false);

  const address = useAccount();

  const onCashOut = async () => {
    toast.info("Cash out process initiated.");
    const result = await cashOut(Number(project.id));
    if (result) {
      toast.success("Cash out successful! Funds have been transferred.");
    } else {
      toast.error("Cash out failed. Please try again.");
    }
  };

  useEffect(() => {
    if (!address) return;
    console.log(project.milestones);
    try {
      fetchMilestone();
    } catch (error) {
      console.log(error);
    } finally {
      setSidebarLoading(false);
    }
  }, [project]);

  useEffect(() => {}, [address]);

  const fetchMilestone = async () => {
    const findMilestone = project.milestones.find(
      (m: any) =>
        m.proposalStatus === 0 ||
        m.proposalStatus === 1 ||
        m.proposalStatus === 3 ||
        m.proposalStatus === 4 ||
        m.proposalStatus === 7
    );

    if (findMilestone) {
      setMilestone(findMilestone);
      if (findMilestone.proposalStatus == 0) {
        const snapshot = await proposalSnapshot(findMilestone.proposalId!);
        setPendingTimer(snapshot);
      } else if (findMilestone.proposalStatus == 1) {
        const deadline = await proposalDeadline(findMilestone.proposalId!);
        setActiveTimer(deadline);
      } else if (findMilestone.proposalStatus == 7) {
        const statusWithdraw = await hasWithdrawnStatus(
          Number(project.id)!,
          Number(findMilestone.id),
          String(address.addresses)
        );
        setWithdrawStatus(statusWithdraw!);
      }
    }
  };

  const voting = async (support: number) => {
    const voteResult = await voteProgress(milestone?.proposalId!, support);

    if (voteResult) {
      support == 0
        ? toast.success("Milestone approved! Vote recorded on blockchain.")
        : toast.error("Milestone rejected! Vote recorded on blockchain.");
    }
  };

  const withdraw = async () => {
    const withdrawResult = await withdrawFundsForInvestor(
      Number(project.id)!,
      Number(milestone!.id)
    );

    if (withdrawResult) {
      toast.info("Withdraw process initiated.");
    }
  };

  return (
    <aside className="sticky top-24 space-y-6">
      <div className="p-6 rounded-lg border bg-card text-card-foreground space-y-4">
        <div className="pb-4 border-b">
          {milestone?.proposalStatus == 0 && (
            <CountdownTimer
              targetDate={pendingTimer!}
              title="Vote Starts In"
              endMessage="Voting is about to begin!"
            />
          )}
          {milestone?.proposalStatus == 1 && (
            <CountdownTimer
              targetDate={activeTimer!}
              title="Vote Ends In"
              endMessage="Voting is about to end!"
            />
          )}
          {/* {project.status === 'Not funded yet' && (
                        <CountdownTimer
                            targetDate={project.fundingStartDate}
                            title="Funding Starts In"
                            endMessage="Funding is about to begin!"
                        />
                    )}
                    {project.status === 'Funding' && (
                        <CountdownTimer
                            targetDate={project.fundingEndDate}
                            title="Funding Ends In"
                            endMessage="Funding has ended!"
                        />
                    )} */}
        </div>
        <div>
          <h2 className="text-2xl font-semibold">Funding Status</h2>
          <p className="text-sm text-muted-foreground mb-4">{project.status}</p>
          <Progress
            value={(project.fundedAmount / project.fundingTarget) * 100}
            className="mb-2"
          />
          {project.paymentToken == 0 ? (
            <div>
              <p className="text-xl font-bold text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(project.fundedAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                raised of{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                }).format(project.fundingTarget)}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-bold text-primary">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "USD",
                }).format(project.fundedAmount)}
              </p>
              <p className="text-sm text-muted-foreground">
                raised of{" "}
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "USD",
                }).format(project.fundingTarget)}
              </p>

              {userInvestmentAmount > 0 && (
                <div className="p-6 rounded-lg border bg-card text-card-foreground">
                  <h3 className="font-semibold mb-2">Your Investment</h3>
                  <p className="text-xl font-bold">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                    }).format(userInvestmentAmount)}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-card text-card-foreground space-y-3">
        <h3 className="font-semibold text-center mb-4">Project Actions</h3>

        <InvestDialog project={project} disabled={isInvestDisabled} />

        {milestone?.proposalStatus == 7 && !withdrawStatus && (
          <ActionAlertDialog
            triggerText="Withdraw"
            title="Are you sure you want to withdraw?"
            description="This action will initiate the milestone withdrawal process."
            onConfirm={() => withdraw()}
          />
        )}

        {milestone?.proposalStatus == 4 && (
          <ActionAlertDialog
            triggerText="Execute"
            title="Execute Milestone"
            description="Confirm to start the process for this milestone."
            onConfirm={() => withdraw()}
          />
        )}

        <ActionAlertDialog
          triggerText="Cash Out"
          title="Are you sure you want to cash out?"
          description="This will cash out the remaining funds after project completion."
          onConfirm={() => onCashOut()}
          variant="destructive"
        />

        {milestone?.proposalStatus == 1 && (
          <ActionAlertDialog
            triggerText="Vote on Milestone"
            title="Do you approve this milestone?"
            description="Your vote will be recorded on the blockchain."
            type="vote"
            onApprove={() => voting(0)}
            onReject={() => voting(1)}
          />
        )}
      </div>

      {/* <div className="p-6 rounded-lg border bg-card text-card-foreground space-y-3"> */}
      {/* <h3 className="font-semibold text-center mb-4">Project Actions</h3> */}
      <div className="p-6 rounded-lg border bg-card text-card-foreground">
        <h3 className="font-semibold mb-2">Project Wallet</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground break-all flex-1">
            {project.walletAddress}
          </p>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-6 rounded-lg border bg-card text-card-foreground">
        <h3 className="font-semibold mb-2">External Links</h3>
        <div className="space-y-2 flex flex-col">
          {project.externalLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="p-0 h-auto">
                {link.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};
{
  /* 
      <div className="p-6 rounded-lg border bg-card text-card-foreground">
        <h3 className="font-semibold mb-2">Project Wallet</h3>
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted-foreground break-all flex-1">
            {project.walletAddress}
          </p>
          <Button variant="ghost" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-6 rounded-lg border bg-card text-card-foreground">
        <h3 className="font-semibold mb-2">External Links</h3>
        <div className="space-y-2 flex flex-col">
          {project.externalLinks.map((link) => (
            <Link
              key={link.title}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="link" className="p-0 h-auto">
                {link.title}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}; */
}

export default ProjectSidebar;
