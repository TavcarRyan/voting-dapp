import React from "react";
import { ethers } from "ethers";
import { hasEthereum } from "./ethereum";
declare let window: any;

const useContract = (abi: any) => {
  if (!hasEthereum()) {
    console.log(`MetaMask unavailable`);
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signerContract = new ethers.Contract(
    process.env.REACT_APP_PRIVATE_KEY,
    abi,
    signer
  );
  const providerContract = new ethers.Contract(
    process.env.REACT_APP_PRIVATE_KEY,
    abi,
    provider
  );
  return { signerContract, providerContract, signer, provider };
};

export default useContract;
