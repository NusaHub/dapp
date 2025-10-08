"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";

const InvestDialog = ({ projectName }: { projectName: string }) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full">Invest in Project</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Invest in {projectName}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label>Choose Currency</Label>
                        <RadioGroup defaultValue="idrx" className="flex space-x-4">
                            <div className="flex items-center space-x-2"><RadioGroupItem value="idrx" id="idrx" /><Label htmlFor="idrx">IDRX</Label></div>
                            <div className="flex items-center space-x-2"><RadioGroupItem value="usdt" id="usdt" /><Label htmlFor="usdt">USDT</Label></div>
                        </RadioGroup>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="amount">Amount</Label>
                        <Input id="amount" type="number" placeholder="Enter amount to invest" />
                    </div>
                </div>
                <Button type="submit" className="w-full">Confirm Investment</Button>
            </DialogContent>
        </Dialog>
    );
}

export default InvestDialog;