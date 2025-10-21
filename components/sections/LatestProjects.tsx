"use client";

import Link from "next/link";
import ProjectCard from "../ProjectCard";
import { useEffect, useState } from "react";
import { getAllProjects } from "@/repository/api";
import { getProject } from "@/services/hub";

const dummyProjects = [
  {
    id: "1",
    imageUrl: "https://placehold.co/400x200/8A42D4/FFFFFF?text=Project+A",
    title: "Skyborne Legacy",
    developer: "Nusantara Arts",
    genre: "RPG",
    gameType: "web3",
    status: "Funding",
    funded: 75_000_000,
    target: 200_000_000,
  },
  {
    id: "2",
    imageUrl: "https://placehold.co/400x200/1E40AF/FFFFFF?text=Project+B",
    title: "Cyber Runner 2077",
    developer: "Garuda Games",
    genre: "Action",
    gameType: "web3",
    status: "Fully Funded",
    funded: 180_000_000,
    target: 180_000_000,
  },
  {
    id: "3",
    imageUrl: "https://placehold.co/400x200/BE123C/FFFFFF?text=Project+C",
    title: "Archipelago Tycoon",
    developer: "Dev Merah Putih",
    genre: "Simulation",
    gameType: "web2",
    status: "Funding",
    funded: 30_000_000,
    target: 100_000_000,
  },
];

type Project = {
  id: string;
  imageUrl: string;
  title: string;
  developer: string;
  genre: string;
  gameType: string;
  funded: number;
  target: number;
  status: string;
  payment: number;
};

const LatestProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      console.log("Fetching all projects...");
      const result = await getAllProjects();
      console.log("getAllProjects result:", result);

      if (result) {
        const allProjects = await searchAllProjects(result);
        console.log("✅ allProjects:", allProjects);
        setProjects(allProjects);
      }
    } catch (error) {
      console.error("❌ fetchProjects error:", error);
    } finally {
      setLoading(false);
    }
  };

  const searchAllProjects = async (datas: any[]) => {
    const projects: any[] = [];

    for (const data of datas) {
      try {
        const uuidNoHyphens = data.id.replace(/-/g, "");
        const uuidHex = "0x" + uuidNoHyphens;
        const uuidAsUint256 = BigInt(uuidHex);

        const scProject = await getProject(Number(uuidAsUint256));

        if (Number(scProject?.fundingGoal) === 0) continue; // skip invalid

        const funded = Number(scProject!.fundRaised);
        const target = Number(scProject!.fundingGoal);

        projects.push({
          id: data.id,
          imageUrl: data.imageUrl,
          title: data.title,
          developer: data.developer_name,
          genre: data.genre,
          gameType: data.game_type,
          payment: Number(scProject?.paymentToken),
          funded,
          target,
          status:
            funded === 0
              ? "Not funded yet"
              : funded >= target
              ? "Fully Funded"
              : "Funding",
        });
      } catch (err) {
        console.error("Error fetching project:", data.id, err);
      }
    }

    return projects;
  };

  // const searchAllProjects = async (datas: any) => {
  //   const projects = await Promise.all(
  //     datas.map(async (data: any) => {
  //       const uuidNoHyphens = data.id.replace(/-/g, "");
  //       const uuidHex = "0x" + uuidNoHyphens;
  //       const uuidAsUint256 = BigInt(uuidHex);
  //       console.log(uuidAsUint256);

  //       const scProject = await getProject(Number(uuidAsUint256));

  //       if (scProject?.fundingGoal != 0 && data.imageUrl != "") {
  //         return {
  //           id: data.id,
  //           imageUrl: data.imageUrl,
  //           title: data.title,
  //           developer: data.developer_name,
  //           genre: data.genre,
  //           gameType: data.game_type,

  //           // data dari smart contract
  //           funded: Number(scProject?.fundRaised ?? 0),
  //           target: Number(scProject?.fundingGoal ?? 0),
  //           status:
  //             scProject?.fundRaised === 0
  //               ? "Not funded yet"
  //               : scProject?.fundRaised! >= scProject?.fundingGoal!
  //               ? "Fully Funded"
  //               : "Funding",
  //         };
  //       }
  //     })
  //   );

  //   return projects;
  // };

  return (
    <>
      {projects.length > 0 && (
        <section className="py-20 bg-secondary">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Discover Innovative Games
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <Link href={`/game-projects/${project.id}`} key={project.id}>
                  <div className="h-full">
                    <ProjectCard {...project} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default LatestProjects;
