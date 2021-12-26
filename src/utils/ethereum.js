import { ethers } from "ethers";
import Greeter from "../artifacts/contracts/Greeter.sol/Greeter.json";

// Check for MetaMask wallet browser extension
function hasEthereum() {
  return (
    typeof window !== "undefined" && typeof window.ethereum !== "undefined"
  );
}

async function getContract() {
  if (!hasEthereum()) {
    console.log(`MetaMask unavailable`);
    return;
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const signerAddress = await signer.getAddress();
  const contract = new ethers.Contract(
    process.env.REACT_APP_PRIVATE_KEY,
    Greeter.abi,
    signer
  );
  return contract;
}

export { hasEthereum, getContract };
