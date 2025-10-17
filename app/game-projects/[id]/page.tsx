/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { type Metadata } from "next";
import { Milestone, type ProjectDetails } from "@/lib/types";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectSidebar from "@/components/ProjectSidebar";
import MilestoneAccordion from "@/components/MilestoneAccordion";
import CommentSection from "@/components/CommentSection";
import { getProgresses, getProject } from "@/services/hub";
import { useEffect, useState } from "react";
import Loading from "@/app/loading";

const twoMinutesFromNow = new Date(Date.now() + 2 * 60 * 1000);
console.log("Two minutes:", twoMinutesFromNow);
const oneDayAfterStart = new Date(
  twoMinutesFromNow.getTime() + 24 * 60 * 60 * 1000
);

const dummyProject: ProjectDetails = {
  id: "1",
  gameImage: "https://placehold.co/800x450/8A42D4/FFFFFF?text=Skyborne+Legacy",
  gameName: "Skyborne Legacy",
  description:
    "Skyborne Legacy is a sprawling RPG set in a mystical archipelago where ancient magic and futuristic technology collide. Players embark on a heroic journey to uncover lost artifacts, tame mythical beasts, and shape the destiny of a world torn by conflict. With a dynamic storyline, deep character customization, and a vast open world, Skyborne Legacy offers an unforgettable adventure for every player.",
  devName: "Nusantara Arts",
  genre: "rpg",
  gameType: "web3",
  fundedAmount: 75000000,
  fundingTarget: 200000000,
  status: "Not funded yet",
  walletAddress: "0xAbCdEf1234567890AbCdEf1234567890AbCdEf12",
  externalLinks: [
    { title: "Official Website", url: "#" },
    { title: "Gameplay Trailer", url: "#" },
  ],
  milestones: [
    {
      id: "m1",
      date: new Date("2026-01-31"),
      target: "Alpha Release for early backers.",
    },
    {
      id: "m2",
      date: new Date("2026-04-30"),
      target: "Beta version with core mechanics implemented.",
      outputType: "general",
      outputDescription: "Beta version v0.8 has been delivered to all backers.",
    },
    {
      id: "m3",
      date: new Date("2026-08-31"),
      target: "Full release on mainnet.",
    },
  ],
  comments: [
    {
      id: "c1",
      author: "Investor A",
      avatarUrl: "https://placehold.co/40x40/000/FFF?text=A",
      timestamp: "2 hours ago",
      text: "This project looks amazing! Can't wait for the alpha.",
      replies: [
        {
          id: "r1",
          author: "Nusantara Arts",
          avatarUrl: "https://placehold.co/40x40/8A42D4/FFF?text=D",
          timestamp: "1 hour ago",
          text: "Thank you for your support! We're working hard on it.",
        },
      ],
    },
    {
      id: "c2",
      author: "Gamer B",
      avatarUrl: "https://placehold.co/40x40/000/FFF?text=B",
      timestamp: "5 hours ago",
      text: "What engine is this game built on?",
    },
  ],
  ownerId: "user123",
  investorIds: ["user456", "user789"],
  //   fundingStartDate: twoMinutesFromNow,
  //   fundingEndDate: oneDayAfterStart,
};

async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // In a real app, you would fetch the project data here
  // const project = await getProjectById(params.id);
  const project = dummyProject; // Using dummy data for now

  return {
    title: `${project.gameName} - Game Project`,
    description:
      project.description.length > 160
        ? project.description.substring(0, 160) + "..."
        : project.description,
    keywords: `${project.gameName}, ${project.devName}, ${project.genre}, ${project.gameType}, game funding, indie game, web3 gaming`,
    alternates: {
      canonical: `/game-projects/${params.id}`,
    },
    openGraph: {
      title: `${project.gameName} - Game Project - NusaHub`,
      description:
        project.description.length > 160
          ? project.description.substring(0, 160) + "..."
          : project.description,
      url: `https://nusahub.io/game-projects/${params.id}`,
      images: [
        {
          url: project.gameImage,
          width: 800,
          height: 450,
          alt: project.gameName,
        },
      ],
    },
    twitter: {
      title: `${project.gameName} - Game Project - NusaHub`,
      description:
        project.description.length > 160
          ? project.description.substring(0, 160) + "..."
          : project.description,
      images: [project.gameImage],
    },
  };
}

const ProjectDetailPage = ({ params }: { params: { id: string } }) => {
  // Nantinya, gunakan params.id untuk fetch data proyek dari backend
  // const project = await getProjectById(params.id);
  //   const project = dummyProject;

  const [project, setProject] = useState<ProjectDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchScProject = async () => {
    // ganti angkanya ya kocak
    const result = await getProject(Number(100));
    // null diganti data dari server resultnya
    const convertedResult = await mapToProjectDetails(result, null);
    if (convertedResult) {
      setLoading(false);
    }
    console.log(convertedResult.milestones);
    setProject(convertedResult);
    // console.log(await mapToProjectDetails(result, null));
  };

  useEffect(() => {
    fetchScProject();
  }, []);

  async function mapToProjectDetails(
    scData: any,
    serverData: any
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
        // 100 diganti ya kocak nanti
        const result = await getProgresses(100, i);
        return {
          ...m,
          output: result!.amount,
          outputType: result!.amount == 0 ? "general" : "monetary",
          outputDescription: result!.text,
          proposalId: result!.proposalId,
        };
      })
    );

    return {
      id: String(100), // bisa diganti dari parameter lain kalau ada ID-nya
      gameImage: "/placeholder.png", // nanti bisa diganti dari metadata IPFS
      gameName: scData.name,
      description: "", // belum ada di contract, jadi kosong dulu
      devName: "", // bisa diisi dari frontend form
      genre: "action", // sementara default
      gameType: "web3", // default juga
      fundedAmount: scData.fundRaised,
      paymentToken: scData.paymentToken,
      fundingTarget: scData.fundingGoal,
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
      investorIds: [], // bisa diisi dari on-chain investor list
    };
  }

  // const

  useEffect(() => {}, [loading]);

  if (!project?.milestones) {
    return <Loading />;
  }
  //   if (project) {
  return (
    <div className="container mx-auto max-w-7xl py-12 px-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        <div className="lg:col-span-2 space-y-12">
          <ProjectHeader project={project!} />
          <MilestoneAccordion milestones={project!.milestones} />
          <CommentSection comments={project!.comments} />
        </div>

        <div className="lg:col-span-1">
          <ProjectSidebar project={project!} />
        </div>
      </div>
    </div>
  );
};
// };

export default ProjectDetailPage;
