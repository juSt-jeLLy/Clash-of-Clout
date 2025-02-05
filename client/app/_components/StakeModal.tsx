"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ethers } from "ethers";
import contractABI from "../../../server/scripts/abi.json";
import { toast } from "react-hot-toast";
// import InsufficientBalanceModal from "./InsufficientBalance";

interface StakeModalProps {
  isOpen: boolean;
  onClose: () => void;
  memeId: string;
}

export default function StakeModal({ isOpen, onClose, memeId }: StakeModalProps) {
  const [stakeAmount, setStakeAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string;
  
 
    
  const handleStake = async () => {
    if (!stakeAmount || parseFloat(stakeAmount) <= 0) {
      toast.error("Please enter a valid stake amount.");
      return;
    }

    if (typeof window.ethereum === "undefined") {
      toast.error("MetaMask is not installed. Please install it to continue.");
      return;
    }

    setIsLoading(true);

    try {
      const provider = new ethers.BrowserProvider(window.ethereum as unknown as ethers.Eip1193Provider);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, signer);

      // Convert ETH to Wei
      const amountInWei = ethers.parseEther(stakeAmount);

      // Check token balance
      const balance = await contract.balanceOf(signer.address);
      if (balance < amountInWei) {
        toast.error("Insufficient token balance.");
        alert("You don't have sufficient meme tokens in your account");
        return;
      }


      // Check allowance
      const allowance = await contract.allowance(signer.address, CONTRACT_ADDRESS);
      if (allowance < amountInWei) {
        // If allowance is insufficient, call approve
        const approveTx = await contract.approve(CONTRACT_ADDRESS, amountInWei);
        await approveTx.wait();
        toast.success("Approval successful!");
      }

      // Call the stakeTokens function
      const tx = await contract.stakeTokens(memeId, amountInWei);
      await tx.wait();

      toast.success("Stake successful!");
      onClose();
    } catch (err: any) {
      if (err.message.includes("Meme is no longer available for staking")) {
        toast.error("This meme is no longer available for staking.");
      } else if (err.message.includes("You have already staked on this meme")) {
        toast.error("You have already staked on this meme.");
      } else {
        toast.error("Failed to stake. Please try again.");
      }
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-black/70 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text mb-4">
          Stake on Meme
        </h2>

        <div className="space-y-4">
          <input
            type="number"
            placeholder="Enter ETH amount"
            value={stakeAmount}
            onChange={(e) => setStakeAmount(e.target.value)}
            className="w-full bg-black/50 border border-purple-500/30 rounded-lg p-3 text-white focus:border-pink-500 transition-colors"
          />

          <div className="flex gap-4">
            <motion.button
              onClick={onClose}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 bg-gradient-to-r from-gray-500 to-gray-700 rounded-lg font-bold"
            >
              Cancel
            </motion.button>
            <motion.button
              onClick={handleStake}
              disabled={isLoading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex-1 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg font-bold disabled:opacity-50"
            >
              {isLoading ? "Staking..." : "Stake"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
