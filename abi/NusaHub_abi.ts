export const NusaHub_abi = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [{ internalType: "address", name: "target", type: "address" }],
    name: "AddressEmptyCode",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "milestoneTimestampIndex",
        type: "uint256",
      },
      { internalType: "address", name: "investor", type: "address" },
    ],
    name: "AlreadyWithdrawn",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "implementation", type: "address" },
    ],
    name: "ERC1967InvalidImplementation",
    type: "error",
  },
  { inputs: [], name: "ERC1967NonPayable", type: "error" },
  { inputs: [], name: "FailedCall", type: "error" },
  {
    inputs: [{ internalType: "uint256", name: "projectId", type: "uint256" }],
    name: "GameProjectAlreadyRegistered",
    type: "error",
  },
  { inputs: [], name: "GameProjectNotRegistered", type: "error" },
  {
    inputs: [
      { internalType: "uint256", name: "projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "milestoneTimestampIndex",
        type: "uint256",
      },
    ],
    name: "IncompleteMilestone",
    type: "error",
  },
  { inputs: [], name: "InvalidInitialization", type: "error" },
  { inputs: [], name: "NotInitializing", type: "error" },
  { inputs: [], name: "ReentrancyGuardReentrantCall", type: "error" },
  {
    inputs: [{ internalType: "address", name: "token", type: "address" }],
    name: "SafeERC20FailedOperation",
    type: "error",
  },
  { inputs: [], name: "UUPSUnauthorizedCallContext", type: "error" },
  {
    inputs: [{ internalType: "bytes32", name: "slot", type: "bytes32" }],
    name: "UUPSUnsupportedProxiableUUID",
    type: "error",
  },
  {
    inputs: [
      { internalType: "uint256", name: "projectId", type: "uint256" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "UnauthorizedCaller",
    type: "error",
  },
  {
    inputs: [
      { internalType: "address", name: "governor", type: "address" },
      { internalType: "address", name: "caller", type: "address" },
    ],
    name: "UnauthorizedGovernor",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "CashedOut",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "withdrawer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "FundsWithdrawn",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint64",
        name: "version",
        type: "uint64",
      },
    ],
    name: "Initialized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
    ],
    name: "ProgressProcessed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "proposalId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ProgressUpdated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "funder",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "timestamp",
        type: "uint256",
      },
    ],
    name: "ProjectFunded",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "projectId",
        type: "uint256",
      },
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: false,
        internalType: "string",
        name: "projectName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fundingGoal",
        type: "uint256",
      },
    ],
    name: "ProjectPosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address",
      },
    ],
    name: "Upgraded",
    type: "event",
  },
  {
    inputs: [],
    name: "UPGRADE_INTERFACE_VERSION",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "__projectId", type: "uint256" }],
    name: "cashOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      { internalType: "uint256", name: "__fundAmount", type: "uint256" },
    ],
    name: "fundProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAvailablePaymentToken",
    outputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "__milestoneTimestampIndex",
        type: "uint256",
      },
    ],
    name: "getFundRaisedPerMilestone",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      { internalType: "address", name: "__user", type: "address" },
    ],
    name: "getFundingByUser",
    outputs: [
      {
        components: [
          { internalType: "uint256", name: "amount", type: "uint256" },
          {
            internalType: "uint256",
            name: "fundPerMilestone",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "percentageFundAmount",
            type: "uint256",
          },
        ],
        internalType: "struct Funding",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      { internalType: "address", name: "__user", type: "address" },
    ],
    name: "getInvestorStatus",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "__milestoneTimestampIndex",
        type: "uint256",
      },
    ],
    name: "getMilestoneStatus",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "__milestoneTimestampIndex",
        type: "uint256",
      },
    ],
    name: "getProgresses",
    outputs: [
      {
        components: [
          { internalType: "string", name: "text", type: "string" },
          { internalType: "uint256", name: "amount", type: "uint256" },
          { internalType: "uint256", name: "proposalId", type: "uint256" },
        ],
        internalType: "struct Progress",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "__projectId", type: "uint256" }],
    name: "getProject",
    outputs: [
      {
        components: [
          { internalType: "string", name: "name", type: "string" },
          { internalType: "uint256", name: "fundingGoal", type: "uint256" },
          {
            internalType: "enum PaymentToken",
            name: "paymentToken",
            type: "uint8",
          },
          { internalType: "uint256", name: "fundRaised", type: "uint256" },
          { internalType: "address", name: "owner", type: "address" },
          {
            components: [
              {
                internalType: "uint256[]",
                name: "timestamps",
                type: "uint256[]",
              },
              { internalType: "string[]", name: "targets", type: "string[]" },
            ],
            internalType: "struct ProjectMilestone",
            name: "milestone",
            type: "tuple",
          },
        ],
        internalType: "struct GameProject",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "__milestoneTimestampIndex",
        type: "uint256",
      },
      { internalType: "address", name: "__user", type: "address" },
    ],
    name: "hasWithdrawnStatus",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "__idrx", type: "address" },
      { internalType: "address", name: "__usdt", type: "address" },
      { internalType: "address", name: "__token", type: "address" },
      { internalType: "address", name: "__governor", type: "address" },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      { internalType: "string", name: "__projectName", type: "string" },
      { internalType: "uint8", name: "__paymentToken", type: "uint8" },
      { internalType: "uint256", name: "__fundingGoal", type: "uint256" },
      { internalType: "uint256[]", name: "__timestamps", type: "uint256[]" },
      { internalType: "string[]", name: "__targets", type: "string[]" },
    ],
    name: "postProject",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [{ internalType: "uint256", name: "__projectId", type: "uint256" }],
    name: "processProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      { internalType: "uint256", name: "__amount", type: "uint256" },
      { internalType: "uint256", name: "__proposalId", type: "uint256" },
      { internalType: "string", name: "__description", type: "string" },
    ],
    name: "updateProgress",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "newImplementation", type: "address" },
      { internalType: "bytes", name: "data", type: "bytes" },
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      { internalType: "uint256", name: "__projectId", type: "uint256" },
      {
        internalType: "uint256",
        name: "__milestoneTimestampIndex",
        type: "uint256",
      },
    ],
    name: "withdrawFundsForInvestor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];
