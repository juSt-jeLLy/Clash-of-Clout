import { ethers } from "ethers";
import contractABI from "../abi.json";

interface Meme {
  id: string;
  imageUrl: string;
  title: string;
  creator: string;
  votes: number;
  stakes: number;
  tags: string[];
  isWinner?: boolean;
  twitterUrl?: string;
  discordMessageUrl?: string;
}

export async function fetchMemes(): Promise<Meme[]> {
  const providerUrl = process.env.NEXT_PUBLIC_PROVIDER_URL;
  const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

  if (!providerUrl || !contractAddress) {
    throw new Error("Missing required environment variables");
  }

  const provider = new ethers.JsonRpcProvider(providerUrl);
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  const filter = contract.filters.MemeSubmitted();
  const events = await contract.queryFilter(filter);

  const memesData = await Promise.all(
    events.map(async (event: any): Promise<Meme | undefined> => {
      const cid = event.args.cid.toString();
      const totalStaked = await contract.totalStaked(cid);

      const response = await fetch(`https://ipfs.io/ipfs/${cid}`);
      const metadata = await response.json();

      return {
        id: cid,
        imageUrl: metadata.gif_url,
        title: metadata.meme || "Untitled Meme",
        creator: event.args.creator,
        votes: 0,
        stakes: Number(ethers.formatEther(totalStaked)),
        tags: metadata.tags || [],
        twitterUrl: metadata.twitter_url || undefined,
        discordMessageUrl: metadata.discord_message_url || undefined
      };
    })
  );

  return memesData.filter((meme): meme is Meme => meme !== undefined);
}