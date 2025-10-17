"use client";

import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { type Milestone } from "@/lib/types";
import { format } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const MilestoneAccordion = ({ milestones }: { milestones: Milestone[] }) => {
    const [outputTypes, setOutputTypes] = useState<Record<string, 'general' | 'monetary'>>({});

    const handleTypeChange = (milestoneId: string, type: 'general' | 'monetary') => {
        setOutputTypes(prev => ({ ...prev, [milestoneId]: type }));
    };

    const handleSaveOutput = (milestoneId: string) => {
        // TODO: Add logic to save the output via a Server Action
        toast.success(`Output for milestone ${milestoneId} saved!`);
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
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="space-y-4">
                            <p><strong>Target:</strong> {milestone.target}</p>

                            <div className="p-4 border rounded-md bg-background">
                                <h4 className="font-semibold mb-2">Milestone Output</h4>
                                {milestone.outputDescription ? (
                                    <div>
                                        <p className="text-sm text-muted-foreground">{milestone.outputDescription}</p>
                                        {milestone.outputType === 'monetary' && (
                                            <div className="mt-2 text-sm space-y-1">
                                                <p><strong>USDT:</strong> {milestone.outputUSDT || 'N/A'}</p>
                                                <p><strong>IDRX:</strong> {milestone.outputIDRX || 'N/A'}</p>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); handleSaveOutput(milestone.id); }}>
                                        <RadioGroup
                                            onValueChange={(value: 'general' | 'monetary') => handleTypeChange(milestone.id, value)}
                                            defaultValue="general"
                                            className="flex space-x-4"
                                        >
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="general" id={`g-${milestone.id}`} /><Label htmlFor={`g-${milestone.id}`}>General</Label></div>
                                            <div className="flex items-center space-x-2"><RadioGroupItem value="monetary" id={`m-${milestone.id}`} /><Label htmlFor={`m-${milestone.id}`}>Monetary</Label></div>
                                        </RadioGroup>

                                        <Textarea placeholder="Describe the output or update for this milestone..." required />

                                        {outputTypes[milestone.id] === 'monetary' && (
                                            <div className="grid grid-cols-2 gap-4">
                                                <Input type="number" placeholder="USDT Amount" required />
                                                <Input type="number" placeholder="IDRX Amount" required />
                                            </div>
                                        )}
                                        <Button size="sm" type="submit">Save Output</Button>
                                    </form>
                                )}
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </section>
    );
}

export default MilestoneAccordion;