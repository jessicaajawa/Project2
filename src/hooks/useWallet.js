//Custom hook to handle wallet connection using MetaMask
//Stores the connected account and exposes a function to connect

import { useState } from "react";

export default function useWallet() {
  //Holds the currently connected wallet address
  const [account, setAccount] = useState(null);

  //Function to request connection to MetaMask
  const connectWallet = async () => {
    // Check if MetaMask is installed in the browser
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }

    try {
      //Request user to connect their wallet
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      //Save the first connected account
      setAccount(accounts[0]);
    } catch (err) {
      //Log any errors 
      console.log(err);
    }
  };

  //Return account and connect function for use in components
  return { account, connectWallet };
}