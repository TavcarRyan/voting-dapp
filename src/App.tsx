import React from "react";
import "./App.css";
import { ethers } from "ethers";
import { hasEthereum } from "./utils/ethereum";
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";

/*eslint no-implicit-globals: "error"*/
declare let window: any;

function App() {
  const [candidate, setCandidate] = React.useState("");
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [connectedWalletAddress, setConnectedWalletAddressState] =
    React.useState("");

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

  const voteForCandidate = async () => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }

    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const signerAddress = await signer.getAddress();

    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);

    const contract = new ethers.Contract(
      process.env.REACT_APP_PRIVATE_KEY,
      Voting.abi,
      signer
    );
    try {
      console.log(contract);
      const transaction = await contract.voteForCandidate(candidate);
      alert(
        "Vote has been submitted. The vote count will increment as soon as the vote is recorded on the blockchain. Please wait."
      );
      setCandidate("");
      await transaction.wait();

      const count = await contract.totalVotes(candidate);
      setTotalVotes(count.toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>A Simple Hello World Voting Application</h1>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jasmine</td>
              <td id="candidate-1"></td>
            </tr>
            <tr>
              <td>Nikolai</td>
              <td id="candidate-2"></td>
            </tr>
            <tr>
              <td>Jeanne</td>
              <td id="candidate-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
      <input
        type="text"
        id="candidate"
        value={candidate}
        onChange={(e) => setCandidate(e.target.value)}
      />
      <button onClick={voteForCandidate} className="btn btn-primary">
        Vote
      </button>
      <div>Total Votes: {totalVotes}</div>
      <div className="h-4">
        {connectedWalletAddress && (
          <p className="text-md">{connectedWalletAddress}</p>
        )}
      </div>
    </div>
  );
}

export default App;
