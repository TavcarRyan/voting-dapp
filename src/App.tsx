// REACT
import React from "react";

// MATERIAL-UI
import { Container, Grid } from "@material-ui/core";

// COMPONENTS
import Card from "./components/Card/Card";

// CONTRACT
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
import useContract from "./utils/useContract";
import { hasEthereum } from "./utils/ethereum";

// ASSETS
import "./App.css";
import { ethers } from "ethers";

/*eslint no-implicit-globals: "error"*/
declare let window: any;

interface CandidateVotes {
  [candidate: string]: number;
}

function App() {
  const [candidate, setCandidate] = React.useState("");
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [candidateVotes, setCandidateVotes] = React.useState<CandidateVotes>({
    jasmine: 0,
    nikolai: 0,
    jeanne: 0,
  });
  const [connectedWalletAddress, setConnectedWalletAddressState] =
    React.useState("");

  const [candidate1, setCandidate1] = React.useState("");
  const [candidate2, setCandidate2] = React.useState("");
  const [candidate3, setCandidate3] = React.useState("");

  const [candidateList, setCandidateList] = React.useState<string[]>([""]);

  const { signerContract, providerContract, signer, provider } = useContract(
    Voting.abi
  );

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const validateMetaMask = () => {
    if (!hasEthereum()) {
      setConnectedWalletAddressState(`MetaMask unavailable`);
      return;
    }
  };

  React.useEffect(() => {
    validateMetaMask();

    const getCandidateVotes = async () => {
      await requestAccount();

      const signerAddress = await signer.getAddress();
      setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);
      for (const key in candidateVotes) {
        const count = await providerContract.totalVotes(
          capitalizeFirstLetter(key)
        );
        setCandidateVotes((prev) => ({
          ...prev,
          [key]: count.toNumber(),
        }));
      }
    };
    getCandidateVotes();
  }, []);

  // Request access to MetaMask account
  async function requestAccount() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const getTotalVotes = async (name: string) => {
    const candidateVotes = await providerContract.totalVotes(
      capitalizeFirstLetter(name)
    );
    const allVotes = await providerContract.totalVotesCasted();
    setTotalVotes(allVotes.toNumber());
    setCandidateVotes((prev) => ({
      ...prev,
      [name.toLowerCase()]: candidateVotes.toNumber(),
    }));
  };

  const voteForCandidate = async (name: string) => {
    validateMetaMask();

    await requestAccount();
    const signerAddress = await signer.getAddress();

    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);

    try {
      const transaction = await signerContract.voteForCandidate(
        capitalizeFirstLetter(name)
      );
      setCandidate("");
      await transaction.wait();

      getTotalVotes(name);
    } catch (error) {
      console.error(error);
    }
  };

  const submitForm = async (event: any) => {
    event.preventDefault();
    validateMetaMask();
    await requestAccount();
    const signerAddress = await signer.getAddress();
    setConnectedWalletAddressState(`Connected wallet: ${signerAddress}`);

    try {
      const transaction = await signerContract.setCandidates([
        candidate1,
        candidate2,
        candidate3,
      ]);
      setCandidate1("");
      setCandidate2("");
      setCandidate3("");
      await transaction.wait();

      signerContract.on("NewCandidates", (candidateList, event) => {
        console.log(`candidate added: ${candidateList[0].toString()}`);
        console.log(`candidate added: ${candidateList[1].toString()}`);
        console.log(`candidate added: ${candidateList[2].toString()}`);

        setCandidateList([
          candidateList[0].toString(),
          candidateList[1].toString(),
          candidateList[2].toString(),
        ]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container className="App">
      <h1>A Simple Voting Application</h1>
      <div>
        {candidateList.map((el) => (
          <Grid key={el}>
            <Card
              name={el}
              onClick={voteForCandidate}
              votes={candidateVotes[el]}
            />
          </Grid>
        ))}
      </div>
      <div>Total votes casted: {totalVotes}</div>
      <div className="h-4">
        {connectedWalletAddress && (
          <p className="text-md">{connectedWalletAddress}</p>
        )}
      </div>
      <form onSubmit={submitForm}>
        <Grid container justifyContent="space-evenly" style={{ width: "100%" }}>
          <Grid item>
            <input
              type="text"
              value={candidate1}
              onChange={(e) => setCandidate1(e.target.value)}
            />
          </Grid>
          <Grid item>
            <input
              type="text"
              value={candidate2}
              onChange={(e) => setCandidate2(e.target.value)}
            />
          </Grid>
          <Grid item>
            <input
              type="text"
              value={candidate3}
              onChange={(e) => setCandidate3(e.target.value)}
            />
          </Grid>
          <Grid item>
            <button type="submit">Submit candidates</button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default App;
