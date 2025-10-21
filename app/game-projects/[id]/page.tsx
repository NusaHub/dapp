/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type Metadata } from "next";
import { Milestone, type ProjectDetails } from "@/lib/types";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectSidebar from "@/components/ProjectSidebar";
import MilestoneAccordion from "@/components/MilestoneAccordion";
import CommentSection from "@/components/CommentSection";
import { getMilestoneStatus, getProgresses, getProject } from "@/services/hub";
import React, { useEffect, useState, useCallback } from "react";
import Loading from "@/app/loading";
import { state } from "@/services/governor";
import { keccak256 } from "ethers";
import { getProjectById, Project } from "@/repository/api";
import { toast } from "sonner";

const currentUser = {
  id: "user456",
};

const twoMinutesFromNow = new Date(Date.now() + 2 * 60 * 1000);
console.log("Two minutes:", twoMinutesFromNow);
const oneDayAfterStart = new Date(
  twoMinutesFromNow.getTime() + 24 * 60 * 60 * 1000
);

// const dummyProject: ProjectDetails = {
//   id: "1",
//   gameImage: "https://placehold.co/400x450/8A42D4/FFFFFF?text=Skyborne+Legacy",
//   gameName: "Skyborne Legacy",
//   description:
//     "Skyborne Legacy is a sprawling RPG set in a mystical archipelago where ancient magic and futuristic technology collide. Players embark on a heroic journey to uncover lost artifacts, tame mythical beasts, and shape the destiny of a world torn by conflict. With a dynamic storyline, deep character customization, and a vast open world, Skyborne Legacy offers an unforgettable adventure for every player.",
//   devName: "Nusantara Arts",
//   genre: "rpg",
//   gameType: "web3",
//   fundedAmount: 75_000_000,
//   fundingTarget: 200_000_000,
//   status: "Not funded yet",
//   walletAddress: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
//   externalLinks: [
//     { title: "Official Website", url: "#" },
//     { title: "Gameplay Trailer", url: "#" },
//   ],
//   milestones: [
//     {
//       id: "m1",
//       date: new Date("2026-01-31"),
//       target: "Alpha Release for early backers.",
//       status: false,
//       proposalStatus: 0,
//     },
//     {
//       id: "m2",
//       date: new Date("2026-04-30"),
//       target: "Beta version with core mechanics implemented.",
//       outputType: "general",
//       outputDescription: "Beta version v0.8 has been delivered to all backers.",
//       status: false,
//       proposalStatus: 0,
//     },
//     {
//       id: "m3",
//       date: new Date("2026-08-31"),
//       target: "Full release on mainnet.",
//       status: false,
//       proposalStatus: 0,
//     },
//   ],
//   investments: [
//     { investorId: "user456", amount: 15_000_000 },
//     { investorId: "user789", amount: 20_000_000 },
//   ],
//   comments: [
//     {
//       id: "c1",
//       author: "Investor A",
//       avatarUrl: "https://placehold.co/40x40/000/FFF?text=A",
//       timestamp: "2 hours ago",
//       text: "This project looks amazing! Can't wait for the alpha.",
//       replies: [
//         {
//           id: "r1",
//           author: "Nusantara Arts",
//           avatarUrl: "https://placehold.co/40x40/8A42D4/FFF?text=D",
//           timestamp: "1 hour ago",
//           text: "Thank you for your support! We're working hard on it.",
//         },
//       ],
//     },
//     {
//       id: "c2",
//       author: "Gamer B",
//       avatarUrl: "https://placehold.co/40x40/000/FFF?text=B",
//       timestamp: "5 hours ago",
//       text: "What engine is this game built on?",
//       replies: [],
//     },
//   ],
//   paymentToken: 0,
//   ownerId: "user123",
//   investorIds: ["user456", "user789"],
// };

// async function generateMetadata({
//   params,
// }: {
//   params: { id: string };
// }): Promise<Metadata> {
//   // In a real app, you would fetch the project data here
//   // const project = await getProjectById(params.id);
//   const project = dummyProject; // Using dummy data for now

//   return {
//     title: `${project.gameName} - Game Project`,
//     description:
//       project.description.length > 160
//         ? project.description.substring(0, 160) + "..."
//         : project.description,
//     keywords: `${project.gameName}, ${project.devName}, ${project.genre}, ${project.gameType}, game funding, indie game, web3 gaming`,
//     alternates: {
//       canonical: `/game-projects/${params.id}`,
//     },
//     openGraph: {
//       title: `${project.gameName} - Game Project - NusaHub`,
//       description:
//         project.description.length > 160
//           ? project.description.substring(0, 160) + "..."
//           : project.description,
//       url: `https://nusahub.io/game-projects/${params.id}`,
//       images: [
//         {
//           url: project.gameImage,
//           width: 400,
//           height: 450,
//           alt: project.gameName,
//         },
//       ],
//     },
//     twitter: {
//       title: `${project.gameName} - Game Project - NusaHub`,
//       description:
//         project.description.length > 160
//           ? project.description.substring(0, 160) + "..."
//           : project.description,
//       images: [project.gameImage],
//     },
//   };
// }

const ProjectDetailPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = React.use(params);

  // Nantinya, gunakan params.id untuk fetch data proyek dari backend
  // const project = await getProjectById(params.id);
  //   const project = dummyProject;

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarLoading, setSidebarLoading] = useState<boolean>(true);
  const [serverData, setServerData] = useState<Project>();

  const fetchScProject = useCallback(async () => {
    const projectId = (await params).id;
    if (typeof projectId !== "string") {
      toast.error("Project ID tidak valid.");
      setLoading(false);
      return;
    }

    const uuidAsUint256 = Number(projectId);
    console.log("✅ Converted UUID to Uint256:", uuidAsUint256.toString());

    try {
      setLoading(true);
      const projectData = await getProjectById(projectId);
      console.log("✅ Fetched project data from server:", projectData);
      setServerData(projectData);

      console.log(
        `🔄 Fetching project data from onChain for ID: ${uuidAsUint256}`
      );
      // ganti angkanya ya kocak
      const result = await getProject(Number(uuidAsUint256));
      // null diganti data dari server resultnya
      const convertedResult = await mapToProjectDetails(
        result,
        projectData,
        uuidAsUint256
      );
      console.log("✅ Updated project data:", {
        milestoneCount: convertedResult.milestones.length,
        milestonesWithOutput: convertedResult.milestones.filter(
          (m) => m.outputDescription
        ).length,
      });
      console.log(
        "📋 Detailed milestones data:",
        convertedResult.milestones.map((m, i) => ({
          index: i,
          id: m.id,
          target: m.target,
          outputDescription: m.outputDescription,
          outputType: m.outputType,
          output: m.output,
          proposalId: m.proposalId,
        }))
      );
      setProject(convertedResult);
    } catch (error) {
      console.error("❌ Error fetching project:", error);
    } finally {
      setLoading(false);
      console.log(
        `Success fetch project data from onChain for ID: ${uuidAsUint256}`
      );
    }
  }, []);

  useEffect(() => {
    fetchScProject();
  }, [fetchScProject]);

  // diganti kocak
  const userInvestmentAmount = 0;

  async function mapToProjectDetails(
    scData: any,
    serverData: any,
    uuidAsUint256: any
  ): Promise<ProjectDetails> {
    const milestones: Milestone[] = scData.milestone.timestamps.map(
      (t: number, i: number) => ({
        id: String(i),
        date: new Date(t * 1000), // konversi dari epoch seconds
        target: scData.milestone.targets[i],
        outputType: "",
        outputDescription: "",
        output: 0,
      })
    );

    const milestonesWithProgress: Milestone[] = await Promise.all(
      milestones.map(async (m, i) => {
        try {
          const projectId = (await params).id;
          const uuidAsUint256 = BigInt(projectId);

          const result = await getProgresses(Number(uuidAsUint256), i);
          const milestoneStatus = await getMilestoneStatus(Number(id), i);
          const proposalStatus = await state(result!.proposalId);

          console.log(`🔍 Progress for milestone ${i}:`, result);

          const mappedMilestone: Milestone = {
            ...m,
            status: milestoneStatus!,
            output: result?.amount || 0,
            proposalStatus: proposalStatus,
            outputType: (result?.amount && result.amount > 0
              ? "monetary"
              : "general") as "general" | "monetary",
            outputDescription: result?.text || "",
            proposalId: result?.proposalId,
          };

          console.log(`📝 Mapped milestone ${i}:`, mappedMilestone);
          return mappedMilestone;
        } catch (error) {
          console.error(`Error fetching progress for milestone ${i}:`, error);
          return {
            ...m,
            output: 0,
            outputType: "general",
            outputDescription: "",
            proposalId: undefined,
          };
        }
      })
    );

    return {
      id: String(uuidAsUint256), // bisa diganti dari parameter lain kalau ada ID-nya
      gameImage: serverData.cover_image_url, // nanti bisa diganti dari metadata IPFS
      gameName: scData.name,
      description: serverData.description, // belum ada di contract, jadi kosong dulu
      devName: serverData.developer_name, // bisa diisi dari frontend form
      genre: serverData.genre, // sementara default
      gameType: serverData.game_type, // default juga
      fundedAmount: scData.fundRaised,
      paymentToken: scData.paymentToken,
      fundingTarget: scData.fundingGoal,
      investments: [
        {
          investorId: "",
          amount: 0,
        },
      ],
      status:
        scData.fundRaised === 0
          ? "Not funded yet"
          : scData.fundRaised >= scData.fundingGoal
          ? "Fully Funded"
          : "Funding",
      walletAddress: scData.owner,
      externalLinks: [], // nanti bisa diisi dari metadata
      milestones: milestonesWithProgress,
      comments: [], // bisa diisi dari API lain atau db
      ownerId: "raw.owner",
      investorIds: serverData.investor_wallet_addresses, // bisa diisi dari on-chain investor list
    };
  }

  useEffect(() => {
    console.log(sidebarLoading);
  }, [loading, sidebarLoading]);

  if (!project?.milestones || loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-12">
          <ProjectHeader project={project} />
          <MilestoneAccordion
            milestones={project.milestones}
            projectId={Number(id)} // TODO: ganti dengan Number(params.id) atau project.id yang sesuai
            paymentToken={project.paymentToken}
            onMilestoneUpdate={() => {
              console.log("🎯 Milestone updated, refreshing project data...");
              fetchScProject();
            }}
          />
          <CommentSection comments={project.comments} />
        </div>

        <div className="lg:col-span-1">
          <ProjectSidebar
            project={project}
            userInvestmentAmount={userInvestmentAmount}
            setSidebarLoading={setSidebarLoading}
          />
        </div>
      </div>
    </div>
  );
};
// };

export default ProjectDetailPage;
