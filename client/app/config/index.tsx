import { createConfig, cookieStorage, createStorage } from "wagmi";
import { walletConnect, injected } from "wagmi/connectors";
import { http, createPublicClient } from "viem";
import { mainnet, flowTestnet } from "viem/chains";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}

export const config = createConfig({
  chains: [mainnet, flowTestnet],
  connectors: [walletConnect({ projectId }), injected()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  client: ({ chain }) =>
    createPublicClient({
      chain,
      transport: http(),
    }),
});
