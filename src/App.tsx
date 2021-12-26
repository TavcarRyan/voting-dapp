import React from "react";
import "./App.css";
import { ethers } from "ethers";
import { hasEthereum } from "./utils/ethereum";
import Greeter from "./artifacts/contracts/Greeter.sol/Greeter.json";

/*eslint no-implicit-globals: "error"*/
declare let window: any;

function App() {
  const [greeting, setGreetingState] = React.useState("");
  const [newGreeting, setNewGreetingState] = React.useState("");
  const [newGreetingMessage, setNewGreetingMessageState] = React.useState("");
  const [connectedWalletAddress, setConnectedWalletAddressState] =
    React.useState("");
  const newGreetingInputRef = React.useRef<any>();

  // If wallet is already connected...
  React.useEffect(() => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    async function setConnectedWalletAddress() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      try {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      } catch {
        setConnectedWalletAddressState("No wallet connected");
        return;
      }
    }
    setConnectedWalletAddress();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  // Call smart contract, fetch current value
  async function fetchGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
      process.env.REACT_APP_PRIVATE_KEY,
      Greeter.abi,
      provider
    );
    try {
      const data = await contract.greet();
      console.log("data:", data);
      setGreetingState(data);
    } catch (error) {
      console.error(error);
    }
  }

  // Call smart contract, set new value
  async function setGreeting() {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
    if (!newGreeting) {
      setNewGreetingMessageState("Add a new greeting first.");
      return;
    }
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      Greeter.abi,
      signer
    );
    const transaction = await contract.setGreeting(newGreeting);
    await transaction.wait();
    setNewGreetingMessageState(
      `Greeting updated to ${newGreeting} from ${greeting}.`
    );
    if (newGreetingInputRef.current) {
      newGreetingInputRef.current.value = "";
    }
    setNewGreetingState("");
  }

  return (
    <div className="App">
      <div className="space-y-8">
        <div className="flex flex-col space-y-4">
          <input
            className="border p-4 w-100 text-center"
            placeholder="A fetched greeting will show here"
            value={greeting}
            disabled
          />
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md w-full"
            onClick={fetchGreeting}
          >
            Fetch greeting from the blockchain
          </button>
        </div>
        <div className="space-y-8">
          <div className="flex flex-col space-y-4">
            <input
              className="border p-4 text-center"
              onChange={(e) => setNewGreetingState(e.target.value)}
              placeholder="Write a new greeting"
              ref={newGreetingInputRef}
            />
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-8 rounded-md"
              onClick={setGreeting}
            >
              Set new greeting on the blockchain
            </button>
            <div className="h-2">
              {newGreetingMessage && (
                <span className="text-sm text-gray-500 italic">
                  {newGreetingMessage}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="h-4">
        {connectedWalletAddress && (
          <p className="text-md">{connectedWalletAddress}</p>
        )}
      </div>
    </div>
  );
}

export default App;
