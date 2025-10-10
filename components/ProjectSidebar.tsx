"use client";

import { Progress } from "@/components/ui/progress";
import { type ProjectDetails } from "@/lib/types";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import InvestDialog from "./InvestDialog";
import ActionAlertDialog from "./ActionAlertDialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProjectSidebar = ({ project }: { project: ProjectDetails }) => {

    const handleCopy = () => {
        navigator.clipboard.writeText(project.walletAddress);
        toast.success("Wallet address copied to clipboard!");
    };

    return (
        <aside className="sticky top-24 space-y-6">
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <h2 className="text-2xl font-semibold">Funding Status</h2>
                <p className="text-sm text-muted-foreground mb-4">{project.status}</p>
                <Progress value={(project.fundedAmount / project.fundingTarget) * 100} className="mb-2" />
                <p className="text-xl font-bold text-primary">
                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(project.fundedAmount)}
                </p>
                <p className="text-sm text-muted-foreground">
                    raised of {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(project.fundingTarget)}
                </p>
            </div>

            <div className="p-6 rounded-lg border bg-card text-card-foreground space-y-3">
                <h3 className="font-semibold text-center mb-4">Project Actions</h3>

                {project.status === 'Funding' && <InvestDialog projectName={project.gameName} />}

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
                    onConfirm={() => toast.info("Cash out process initiated.")}
                    variant="destructive"
                />
                <ActionAlertDialog
                    triggerText="Vote on Milestone"
                    title="Do you approve this milestone?"
                    description="Your vote will be recorded on the blockchain."
                    onConfirm={() => toast.info("Your vote has been submitted.")}
                />
            </div>

            <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <h3 className="font-semibold mb-2">Project Wallet</h3>
                <div className="flex items-center gap-2">
                    <p className="text-sm text-muted-foreground break-all flex-1">{project.walletAddress}</p>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                        <Copy className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            <div className="p-6 rounded-lg border bg-card text-card-foreground">
                <h3 className="font-semibold mb-2">External Links</h3>
                <div className="space-y-2 flex flex-col">
                    {project.externalLinks.map(link => (
                        <Link key={link.title} href={link.url} target="_blank" rel="noopener noreferrer">
                            <Button variant="link" className="p-0 h-auto">{link.title}</Button>
                        </Link>
                    ))}
                </div>
            </div>
        </aside>
    );
}

export default ProjectSidebar;