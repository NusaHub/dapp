/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import VerificationCaptureCard from "@/components/VerificationCaptureCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import Loader from "@/components/Loader";
import { toast } from "sonner";
import performVerification from "./actions";
import { registerIdentity } from "@/services/identity";
import { keccak256 } from "viem";

async function addVerifiedUser(vaultId: string) {
  console.log("Menambahkan user terverifikasi dengan vault ID:", vaultId);
  return Promise.resolve();
}

const VerificationPage = () => {
  const router = useRouter();

  const identityVideoRef = useRef<HTMLVideoElement>(null);
  const faceVideoRef = useRef<HTMLVideoElement>(null);
  const canvasIdentityRef = useRef<HTMLCanvasElement>(null);
  const canvasFaceRef = useRef<HTMLCanvasElement>(null);

  const [capturedIdentity, setCapturedIdentity] = useState<File | null>(null);
  const [capturedFace, setCapturedFace] = useState<File | null>(null);
  const [identityActive, setIdentityActive] = useState(false);
  const [faceActive, setFaceActive] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [verificationResult, setVerificationResult] = useState<any>(null);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);

  const principal = "user-wallet-address-123";

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (identityActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (identityVideoRef.current) {
            identityVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => toast.error("Error accessing camera: " + err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [identityActive]);

  useEffect(() => {
    let stream: MediaStream | null = null;

    if (faceActive) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((s) => {
          stream = s;
          if (faceVideoRef.current) {
            faceVideoRef.current.srcObject = stream;
          }
        })
        .catch((err) => toast.error("Error accessing camera: " + err));
    }

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [faceActive]);

  const handleStartCamera = (type: "identity" | "face") => {
    if (type === "identity") {
      setCapturedIdentity(null);
      setIdentityActive(true);
      setFaceActive(false);
    } else {
      setCapturedFace(null);
      setFaceActive(true);
      setIdentityActive(false);
    }
  };

  const captureImage = (type: "identity" | "face") => {
    const video =
      type === "identity" ? identityVideoRef.current : faceVideoRef.current;
    const canvas =
      type === "identity" ? canvasIdentityRef.current : canvasFaceRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas
      .getContext("2d")
      ?.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const file = new File([blob], `${principal}-${type}-image.jpg`, {
        type: "image/jpeg",
      });
      if (type === "identity") {
        setCapturedIdentity(file);
        setIdentityActive(false);
      } else {
        setCapturedFace(file);
        setFaceActive(false);
      }
    }, "image/jpeg");
  };

  const verifyIdentity = async () => {
    if (!capturedIdentity || !capturedFace) return;
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("identityImage", capturedIdentity);
      formData.append("faceImage", capturedFace);

      const result = await performVerification(formData);

      if (result.success) {
        setVerificationResult(result.data);
        setIsResultDialogOpen(true);
      } else {
        toast.error("Verification Failed", { description: result.error });
      }
    } catch (error) {
      console.error("Server Action crashed or network error:", error);
      toast.error("An Unexpected Error Occurred", {
        description: "Please check your connection and try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmVerification = async () => {
    setIsResultDialogOpen(false);
    setIsLoading(true);
    try {
      const salt = crypto.getRandomValues(new Uint8Array(16)); // 16-byte random
      const hashWithSalt = keccak256(
        new Uint8Array([
          ...salt,
          ...new TextEncoder().encode(verificationResult),
        ])
      );

      await addVerifiedUser(hashWithSalt);
      const result = await registerIdentity(hashWithSalt);
      console.log(result);
      if (result) {
        toast.success("Identity Confirmed!", {
          description: "You are now a verified user.",
        });
        router.push("/game-projects");
      }
    } catch (error) {
      //   toast.error("Confirmation Failed", {
      //     description: "Could not save verification data.",
      //   });
      console.error(error);
    } finally {
      setIsLoading(false);
      setCapturedIdentity(null);
      setCapturedFace(null);
    }
  };

  const handleReverify = () => {
    setIsResultDialogOpen(false);
    setCapturedIdentity(null);
    setCapturedFace(null);
  };

  const isVerificationReady = capturedIdentity && capturedFace;

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Identity Verification
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          To ensure a secure platform, please verify your identity.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
        <VerificationCaptureCard
          title="1. Capture Your Identity Card"
          description="Position your KTP inside the frame. Ensure the image is clear and well-lit."
          videoRef={identityVideoRef}
          canvasRef={canvasIdentityRef}
          capturedImage={capturedIdentity}
          isCameraActive={identityActive}
          onStartCamera={() => handleStartCamera("identity")}
          onCapture={() => captureImage("identity")}
          placeholderType="identity"
          isDisabled={isLoading}
        />
        <VerificationCaptureCard
          title="2. Capture Your Face"
          description="Position your face inside the frame. Make sure there are no obstructions."
          videoRef={faceVideoRef}
          canvasRef={canvasFaceRef}
          capturedImage={capturedFace}
          isCameraActive={faceActive}
          onStartCamera={() => handleStartCamera("face")}
          onCapture={() => captureImage("face")}
          placeholderType="face"
          isDisabled={isLoading}
        />
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={verifyIdentity}
          disabled={!isVerificationReady || isLoading}
          size="lg"
          className="w-full max-w-md"
        >
          {isLoading ? <Loader className="mr-2" /> : null}
          {isLoading ? "Verifying..." : "Verify Your Identity"}
        </Button>
      </div>

      <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Verification Successful!</DialogTitle>
            <DialogDescription>
              Please confirm if the details below are correct.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Name:</strong> {verificationResult?.fullName}
            </p>
            <p>
              <strong>Date of Birth:</strong> {verificationResult?.dob}
            </p>
            <p>
              <strong>Nationality:</strong>{" "}
              {verificationResult?.nationality_full}
            </p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={handleReverify}>
              Re-verify
            </Button>
            <Button onClick={handleConfirmVerification}>Confirm Details</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default VerificationPage;
