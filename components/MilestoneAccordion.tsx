"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { type Milestone } from "@/lib/types";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getProposalId, proposeProgress } from "@/services/governor";
import { updateProgress } from "@/services/hub";
import { idrxApprove, usdtApprove } from "@/services/token";
import { Loader2, CheckCircle } from "lucide-react";

interface MilestoneAccordionProps {
  milestones: Milestone[];
  projectId: number;
  paymentToken: number;
  onMilestoneUpdate?: () => void;
}

const MilestoneAccordion = ({
  milestones,
  projectId,
  paymentToken,
  onMilestoneUpdate,
}: MilestoneAccordionProps) => {
  const [outputTypes, setOutputTypes] = useState<
    Record<string, "general" | "monetary">
  >({});
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [approvalStates, setApprovalStates] = useState<Record<string, boolean>>(
    {}
  );
  const [approvingStates, setApprovingStates] = useState<
    Record<string, boolean>
  >({});
  const [formData, setFormData] = useState<
    Record<string, { description: string; amount: number }>
  >({});

  const handleTypeChange = (
    milestoneId: string,
    type: "general" | "monetary"
  ) => {
    console.log("🔄 [TypeChange] Output type changed:", { milestoneId, type });
    setOutputTypes((prev) => ({ ...prev, [milestoneId]: type }));

    if (type !== "monetary") {
      setApprovalStates((prev) => {
        const newApprovals = { ...prev };
        delete newApprovals[milestoneId];
        return newApprovals;
      });
    }
  };

  const handleInputChange = (
    milestoneId: string,
    field: "description" | "amount",
    value: string
  ) => {
    console.log("📝 [InputChange]:", { milestoneId, field, value });

    setFormData((prev) => ({
      ...prev,
      [milestoneId]: {
        ...prev[milestoneId],
        [field]: field === "amount" ? Number(value) : value,
      },
    }));

    if (field === "amount" && outputTypes[milestoneId] === "monetary") {
      setApprovalStates((prev) => {
        const newApprovals = { ...prev };
        delete newApprovals[milestoneId];
        return newApprovals;
      });
    }
  };

  const handleApproval = async (milestoneId: string) => {
    const formValues = formData[milestoneId];

    if (!formValues?.amount || formValues.amount <= 0) {
      toast.error("Please enter a valid amount before approval");
      return;
    }

    setApprovingStates((prev) => ({ ...prev, [milestoneId]: true }));

    try {
      console.log("🔐 [Approval] Starting approval process:", {
        milestoneId,
        amount: formValues.amount,
        paymentToken,
        tokenType: paymentToken === 0 ? "IDRX" : "USDT",
      });

      let approvalResult;
      if (paymentToken === 0) {
        toast.info("Approving IDRX tokens...");
        approvalResult = await idrxApprove(formValues.amount);
      } else {
        toast.info("Approving USDT tokens...");
        approvalResult = await usdtApprove(formValues.amount);
      }

      if (approvalResult) {
        setApprovalStates((prev) => ({ ...prev, [milestoneId]: true }));
        toast.success(
          `${
            paymentToken === 0 ? "IDRX" : "USDT"
          } tokens approved successfully!`
        );
        console.log("✅ [Approval] Success:", approvalResult);
      } else {
        throw new Error("Approval failed");
      }
    } catch (error) {
      console.error("❌ [Approval] Error:", error);
      toast.error("Approval failed. Please try again.");
    } finally {
      setApprovingStates((prev) => ({ ...prev, [milestoneId]: false }));
    }
  };

  const handleSaveOutput = async (milestoneId: string) => {
    const formValues = formData[milestoneId];
    const outputType = outputTypes[milestoneId] || "general";

    if (!formValues?.description) {
      toast.error("Please provide a description for this milestone output");
      return;
    }

    if (outputType === "monetary" && !approvalStates[milestoneId]) {
      toast.error("Please approve tokens first before saving milestone output");
      return;
    }

    setLoadingStates((prev) => ({ ...prev, [milestoneId]: true }));

    try {
      toast.info("Creating proposal for milestone progress...");
      const proposeResult = await proposeProgress(
        formValues.description,
        projectId
      );
      console.log(projectId);

      const proposalId =
        proposeResult &&
        (await getProposalId(formValues.description, projectId));

      console.log("✅ [Save] Proposal created:", {
        proposalId: BigInt(String(proposalId!)),
        description: formValues.description,
      });

      if (!proposalId) {
        throw new Error("Failed to create proposal");
      }

      toast.info("Updating milestone progress...");
      const amount =
        outputType === "monetary" && formValues.amount ? formValues.amount : 0;

      console.log("📤 [Save] Calling updateProgress:", {
        projectId,
        amount,
        proposalId,
        description: formValues.description,
        outputType,
      });

      const result = await updateProgress(
        projectId,
        amount,
        BigInt(String(proposalId)),
        formValues.description
      );
      console.log("✅ [Save] Update progress result:", result);

      if (result) {
        toast.success(
          `Milestone output saved successfully! Proposal ID: ${proposalId}`
        );

        setFormData((prev) => {
          const newData = { ...prev };
          delete newData[milestoneId];
          return newData;
        });

        setOutputTypes((prev) => {
          const newTypes = { ...prev };
          delete newTypes[milestoneId];
          return newTypes;
        });

        setApprovalStates((prev) => {
          const newApprovals = { ...prev };
          delete newApprovals[milestoneId];
          return newApprovals;
        });

        setTimeout(() => {
          if (onMilestoneUpdate) {
            onMilestoneUpdate();
          }
        }, 3000);
      } else {
        throw new Error("Failed to update progress");
      }
    } catch (error) {
      console.error("❌ [Save] Error:", error);
      toast.error("Failed to save milestone output. Please try again.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [milestoneId]: false }));
    }
  };

  return (
    <section>
      <h2 className="text-3xl font-bold mb-4">Milestones</h2>
      <Accordion type="single" collapsible className="w-full">
        {milestones.map((milestone) => (
          <AccordionItem value={milestone.id} key={milestone.id}>
            <AccordionTrigger className="text-lg hover:no-underline">
              <div className="flex items-center justify-between w-full mr-4">
                <span>{format(milestone.date, "dd MMMM yyyy")}</span>
                <div className="flex items-center gap-3">
                  {/* Vote Count */}
                  {milestone.voteCount && (
                    <span className="text-sm text-muted-foreground">
                      {milestone.voteCount} votes
                    </span>
                  )}
                </div>
              </div>{" "}
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <p>
                <strong>Target:</strong> {milestone.target}
              </p>

              <div className="p-4 border rounded-md bg-background">
                <h4 className="font-semibold mb-2">Milestone Output</h4>
                {milestone.outputDescription ? (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {milestone.outputDescription}
                    </p>
                    {milestone.outputType === "monetary" && (
                      <div className="mt-2 text-sm space-y-1">
                        {paymentToken === 0 ? (
                          <p>
                            <strong>IDRX:</strong> {milestone.output || "N/A"}
                          </p>
                        ) : (
                          <p>
                            <strong>USDT:</strong> {milestone.output || "N/A"}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSaveOutput(milestone.id);
                    }}
                  >
                    <RadioGroup
                      onValueChange={(value: "general" | "monetary") =>
                        handleTypeChange(milestone.id, value)
                      }
                      defaultValue="general"
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="general"
                          id={`g-${milestone.id}`}
                        />
                        <Label htmlFor={`g-${milestone.id}`}>General</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value="monetary"
                          id={`m-${milestone.id}`}
                        />
                        <Label htmlFor={`m-${milestone.id}`}>Monetary</Label>
                      </div>
                    </RadioGroup>

                    <Textarea
                      placeholder="Describe the output or update for this milestone..."
                      required
                      value={formData[milestone.id]?.description || ""}
                      onChange={(e) =>
                        handleInputChange(
                          milestone.id,
                          "description",
                          e.target.value
                        )
                      }
                    />

                    {outputTypes[milestone.id] === "monetary" && (
                      <div className="space-y-4">
                        <Label className="text-sm font-medium">
                          Amount ({paymentToken === 0 ? "IDRX" : "USDT"} - will
                          be converted automatically):
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          required
                          min="0"
                          step="0.01"
                          value={formData[milestone.id]?.amount || ""}
                          onChange={(e) =>
                            handleInputChange(
                              milestone.id,
                              "amount",
                              e.target.value
                            )
                          }
                        />

                        <div className="p-3 bg-purple-50 border border-purple-200 rounded-md">
                          <p className="text-sm text-purple-700">
                            Before saving, you need to approve{" "}
                            {paymentToken === 0 ? "IDRX" : "USDT"} tokens for
                            this transaction.
                          </p>
                        </div>
                      </div>
                    )}

                    {outputTypes[milestone.id] === "monetary" &&
                    !approvalStates[milestone.id] ? (
                      <Button
                        size="sm"
                        type="button"
                        onClick={() => handleApproval(milestone.id)}
                        disabled={
                          approvingStates[milestone.id] ||
                          !formData[milestone.id]?.amount
                        }
                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                      >
                        {approvingStates[milestone.id] ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Approving {paymentToken === 0 ? "IDRX" : "USDT"}...
                          </>
                        ) : (
                          <>
                            Approve {paymentToken === 0 ? "IDRX" : "USDT"}{" "}
                            Tokens
                          </>
                        )}
                      </Button>
                    ) : (
                      <div className="space-y-2">
                        {approvalStates[milestone.id] && (
                          <div className="flex items-center gap-2 text-green-600 text-sm">
                            <CheckCircle className="h-4 w-4" />
                            {paymentToken === 0 ? "IDRX" : "USDT"} tokens
                            approved successfully
                          </div>
                        )}
                        <Button
                          size="sm"
                          type="submit"
                          disabled={loadingStates[milestone.id]}
                          className="w-full sm:w-auto"
                        >
                          {loadingStates[milestone.id] ? (
                            <>
                              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              Processing...
                            </>
                          ) : (
                            "Save Output"
                          )}
                        </Button>
                      </div>
                    )}
                  </form>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default MilestoneAccordion;
