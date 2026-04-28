//Connects frontend to smart contract

import { ethers } from "ethers";
import ABI from "../contracts/TrustFundABI.json";

// ⚠️ PASTE YOUR CONTRACT ADDRESS HERE AFTER DEPLOY
const CONTRACT_ADDRESS = "0xC99Ff7A6552cb4CDe09d8E6B598Fa918F94BBADA";

export const getContract = async () => {
  if (!window.ethereum) {
    alert("MetaMask not found");
    return null;
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();

  return new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
};