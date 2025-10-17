"use client";

import { Progress } from "@/components/ui/progress";
import { type ProjectDetails } from "@/lib/types";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import InvestDialog from "./InvestDialog";
import ActionAlertDialog from "./ActionAlertDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import CountdownTimer from "./CountdownTimer";
import { cashOut } from "@/services/hub";

interface ProjectSidebarProps {
  project: ProjectDetails;
  userInvestmentAmount: number;
}



const ProjectSidebar = ({
  project,
  userInvestmentAmount,
}: ProjectSidebarProps) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(project.walletAddress);
    toast.success("Wallet address copied to clipboard!");
  };
  const isInvestDisabled = project.status == "Fully Funded";

  const onCashOut = async () => {
    toast.info("Cash out process initiated.");
    const result = await cashOut(Number(project.id));
    if (result) {
      toast.success("Cash out successful! Funds have been transferred.");
    } else {
      toast.error("Cash out failed. Please try again.");
    }
  };

  return (
    <aside className="sticky top-24 space-y-6">
      <div className="p-6 rounded-lg border bg-card text-card-foreground space-y-4">
        <div className="pb-4 border-b">
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

        <ActionAlertDialog
          triggerText="Withdraw"
          title="Are you sure you want to withdraw?"
          description="This action will initiate the milestone withdrawal process."
          onConfirm={() => toast.info("Withdraw process initiated.")}
        />
        <ActionAlertDialog
          triggerText="Cash Out"
          title="Are you sure you want to cash out?"
          description="This will cash out the remaining funds after project completion."
          onConfirm={() => onCashOut()}
          variant="destructive"
        />
        <ActionAlertDialog
          triggerText="Vote on Milestone"
          title="Do you approve this milestone?"
          description="Your vote will be recorded on the blockchain."
          type="vote"
          onApprove={() =>
            toast.success("Milestone approved! Vote recorded on blockchain.")
          }
          onReject={() =>
            toast.error("Milestone rejected! Vote recorded on blockchain.")
          }
        />
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
