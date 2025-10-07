import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import type { RefObject } from 'react';
import { Camera, CreditCard, User } from "lucide-react";

type VerificationCaptureCardProps = {
    title: string;
    description: string;
    videoRef: RefObject<HTMLVideoElement | null>;
    canvasRef: RefObject<HTMLCanvasElement | null>;
    capturedImage: File | null;
    isCameraActive: boolean;
    onStartCamera: () => void;
    onCapture: () => void;
    placeholderType: 'identity' | 'face';
    isDisabled?: boolean;
};

const VerificationCaptureCard = ({
    title,
    description,
    videoRef,
    canvasRef,
    capturedImage,
    isCameraActive,
    onStartCamera,
    onCapture,
    placeholderType,
    isDisabled = false,
}: VerificationCaptureCardProps) => {

    const PlaceholderIcon = placeholderType === 'identity'
        ? <CreditCard className="w-24 h-24 text-muted-foreground" />
        : <User className="w-24 h-24 text-muted-foreground" />;

    return (
        <Card className="w-full max-w-lg bg-secondary border-border py-6">
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="relative aspect-video w-full overflow-hidden rounded-md bg-background flex items-center justify-center">
                    {capturedImage ? (
                        <Image
                            src={URL.createObjectURL(capturedImage)}
                            alt={`Captured ${placeholderType}`}
                            fill
                            className="object-cover"
                        />
                    ) : isCameraActive ? (
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    ) : (
                        PlaceholderIcon
                    )}
                    <canvas ref={canvasRef} className="hidden" />
                </div>
            </CardContent>
            <CardFooter>
                <Button
                    onClick={isCameraActive ? onCapture : onStartCamera}
                    className="w-full"
                    disabled={isDisabled}
                >
                    <Camera className="mr-2 h-4 w-4" />
                    {isCameraActive ? "Capture Image" : "Start Camera"}
                </Button>
            </CardFooter>
        </Card>
    );
};

export default VerificationCaptureCard;