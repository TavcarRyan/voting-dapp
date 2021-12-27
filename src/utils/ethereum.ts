import { ethers } from "ethers";
declare let window: any;

// Check for MetaMask wallet browser extension
function hasEthereum() {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
}

async function getContract(abi: any) {
  if (!hasEthereum()) {
    console.log(`MetaMask unavailable`);
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(
    process.env.REACT_APP_PRIVATE_KEY,
    abi,
    signer
  );
  return { contract, signer };
}

export { hasEthereum, getContract };
