# NusaHub : A Web3 Crowdfunding Platform Connecting Indonesian Game Developers With Global Investors Through Milestone-Based Funding and Anti-Fraud Voting. 🚀

## ✨ Overview

🌏 NusaHub is a Web3 crowdfunding platform 🚀 that connects Indonesian game developers 🎮 with global investors 🌍 through milestone-based funding and anti-fraud investor voting ✅. Developers raise funds per milestone, investors review and vote to release payments 💰, ensuring honest and transparent progress 📊. With blockchain-powered security 🔗 and global access 🌐, NusaHub bridges local game innovation 🇮🇩 with the trust and scalability of Web3 🧠.

## 🔋 Key Features

  - 🌐 **Modern Web Framework** — Built with **Next.js** and the App Router for a fast, SEO-friendly, and scalable application architecture utilizing both Server and Client Components.
  - 🎨 **Responsive & Themed UI** — A sleek, dark-mode user interface built with **Shadcn/UI** and **Tailwind CSS v4**, ensuring a consistent and accessible experience across all devices.
  - 💳 **Web3 Wallet Integration** — Seamless wallet connection and interaction powered by **wagmi** and **Xellar Kit**, allowing users to connect their wallets and interact with the blockchain.
  - 📝 **Dynamic & Validated Forms** — Complex, multi-step forms for project creation and milestone updates, managed with **React Hook Form** and validated client-side and server-side with **Zod**.
  - ✅ **Identity Verification Flow** — A secure, camera-based KYC process where developers verify their identity using their KTP and a selfie, integrated with the **IDAnalyzer** service.
  - 💰 **Milestone-Based Funding & Voting** — Interactive UI for investors to fund projects, and for both developers and investors to track and manage project milestones. Includes dialogs for investing, withdrawing funds, and voting on milestone progress.
  - 🔄 **Server-Side Logic with Server Actions** — Secure and efficient handling of backend and smart contract interactions using Next.js Server Actions, keeping sensitive logic off the client.
  - ⚡ **Optimized User Experience** — Features like automatic loading states with `loading.tsx` (via React Suspense), real-time countdown timers, and toast notifications with `Sonner` provide instant feedback to the user.

## 🧑‍💻 How It Works

1.  **Developer Verifies Identity** — A new developer uses their device's camera to complete a KYC process, uploading images of their KTP and a selfie for verification.
2.  **Developer Creates a Project** — Once verified, a developer fills out the "Create Project" form, detailing their game, funding goals, and defining specific, time-based milestones.
3.  **Investor Funds a Project** — An investor browses listed projects and chooses to invest using IDRX or USDT. Their funds are locked in the smart contract and allocated across the project's milestones.
4.  **Investor Receives NUSA Tokens** — Upon investing, the investor receives NUSA governance tokens equivalent to their investment amount, which represent their voting power.
5.  **Developer Submits Progress** — The developer works on the project and submits proof of progress for each milestone.
6.  **Investors Vote on Progress** — Investors use their NUSA tokens to vote on whether the milestone has been satisfactorily completed. If the vote passes, the funds for that milestone are released to the developer.
7.  **Withdrawal and Cash Out** — Developers can withdraw released funds, while investors have options to cash out their remaining investment on uncompleted milestones.

## ⚙️ Tech Stack

  - 💻 **Framework**: [Next.js](https://nextjs.org/) 15+ (with App Router)
  - 🎨 **UI**: [React](https://react.dev/) 19, [Tailwind CSS](https://tailwindcss.com/) v4, [Shadcn/UI](https://ui.shadcn.com/)
  - 🔗 **Web3**: [wagmi](https://wagmi.sh/), [Viem](https://viem.sh/), [Xellar Kit](https://www.google.com/search?q=https://www.xellar.io/)
  - 📝 **Forms**: [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
  - 📅 **Utilities**: [date-fns](https://date-fns.org/), [Lucide React](https://lucide.dev/) (Icons), [Sonner](https://www.google.com/search?q=https://sonner.emilkowal.ski/) (Toasts)
  - 🔧 **Language**: [TypeScript](https://www.typescriptlang.org/)

## 📚 NusaHub Resources

  - 🌐 **Frontend dApp**: You are here\!
  - 🔗 **Smart Contracts**: [View Code](https://github.com/NusaHub/smart-contract)
  - 🔧 **Backend**: [View Code](https://github.com/NusaHub/backend)
  - 📖 **Pitch Deck**: [View Presentation](https://drive.google.com/file/d/1mtMOupo4JRUDYgAhtYT0v_jRww9ZsRhE/view?usp=sharing)

## 🚀 Getting Started

Follow these steps to get the NusaHub dApp running on your local machine.

### Prerequisites

  - [Node.js](https://nodejs.org/) (version 20.9 or higher)
  - [pnpm](https://pnpm.io/) (or npm/yarn)
  - A Web3 wallet extension in your browser (e.g., MetaMask, Xellar Wallet)

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/nusahub-dapp.git
    cd nusahub-dapp
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Set up environment variables:**

      - Create a `.env.local` file in the root directory by copying the example file:
        ```bash
        cp .env.example .env.local
        ```
      - Add your configuration variables. It should look like this:
        ```env
        # WalletConnect Project ID from https://cloud.walletconnect.com/
        NEXT_PUBLIC_REOWN_ID=your_walletconnect_project_id

        # Xellar App ID from https://dashboard.xellar.io/
        NEXT_PUBLIC_XELLAR_APP_ID=your_xellar_app_id

        # IDAnalyzer API Key for KYC
        IDANALYZER_API_KEY=your_idanalyzer_api_key

        # Pinata credentials for IPFS uploads
        PINATA_JWT=your_pinata_jwt
        PINATA_GATEWAY=your_pinata_gateway.mypinata.cloud
        ```

4.  **Run the development server:**

    ```bash
    npm run dev
    ```

    The application should now be running on `http://localhost:3000`.

## 🤝 Contributor

  - 🧑‍💻 **Louis Fernando** : [@LouisFernando1204](https://github.com/LouisFernando1204)
  - 🧑‍💻 **Yobel Nathaniel Filipus** : [@yebology](https://github.com/yebology)
  - 🧑‍💻 **Kevin Christian** : [@kevinchr-dev](https://github.com/kevinchr-dev)
  - 🧑‍💻 **Hayya U** : [@hayyaoe](https://github.com/hayyaoe)
