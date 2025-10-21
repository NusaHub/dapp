"use client";

import React from "react";
import { Config, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { XellarKitProvider, darkTheme, defaultConfig } from "@xellar/kit";
import { liskSepolia, sepolia } from "viem/chains";

const walletConnectProjectId = process.env.NEXT_PUBLIC_REOWN_ID!;
const xellarAppId = process.env.NEXT_PUBLIC_XELLAR_APP_ID!;

export const config = defaultConfig({
  appName: "NusaHub",
  walletConnectProjectId,
  xellarAppId,
  xellarEnv: "sandbox",
  chains: [liskSepolia],
}) as Config;

const queryClient = new QueryClient();

export const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <XellarKitProvider theme={darkTheme}>{children}</XellarKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};
