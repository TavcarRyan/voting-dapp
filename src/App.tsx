// REACT
import React from "react";

// MATERIAL-UI
import { Button, Container, Grid } from "@material-ui/core";

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

interface Candidates {
  name: string;
  votes: number;
}

const n = 10;

function App() {
  const [totalVotes, setTotalVotes] = React.useState(0);

  const [connectedWalletAddress, setConnectedWalletAddressState] =
    React.useState("Connected wallet:");

  const [newCandidate, setNewCandidate] = React.useState('')

  const [candidate1, setCandidate1] = React.useState("");
  const [candidate2, setCandidate2] = React.useState("");
  const [candidate3, setCandidate3] = React.useState("");

  const [candidateList, setCandidateList] = React.useState([
    {
      name: 'John Doe',
      votes: 0,
    },
  ]);
  const [inputs, setInputs] = React.useState<string[]>(["input-0"]);
  const inputRef = React.useRef<HTMLInputElement>(null)

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
    const newCandidateList = candidateList.filter((el) => {
      console.log("el: ", el);
    });
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
    const candidateNames = candidateList.map(el => el.name)

    try {
      const transaction = await signerContract.setCandidates(candidateNames);

      await transaction.wait();

      signerContract.on("NewCandidates", (candidateList, event) => {
        console.log(event)
        for (const idx of candidateList) {
          console.log(`Candidate added: `, candidateList[idx])
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const appendInput = () => {
    const newInput = `input-${inputs.length}`;
    setInputs((prev) => [...prev, newInput]);
    setCandidateList(prev => [...prev, {name: newCandidate, votes: 0}])

    if (inputRef.current !== null) {
      inputRef.current.value = '';
    }
  };


  return (
    <Container className="App">
      <h1>A Simple Voting Application</h1>
      <Grid container>

        <Grid item xs={12} container alignItems="center" justifyContent="space-between">
            <Grid item xs={6}>Total votes casted: {totalVotes}</Grid>
          <Grid item xs={6}>
            {connectedWalletAddress && (
              <p>{connectedWalletAddress}</p>
            )}
          </Grid>
        </Grid>
        
        {candidateList.map((candidate, i) => (
        <div key={candidate.name} style={{width: '100%'}}>
            <Grid>
              <Card
                name={candidate.name}
                onClick={voteForCandidate}
                votes={candidate.votes}
                />
            </Grid>
          </div>
        ))}

        <form onSubmit={submitForm}  style={{ width: "100%"}}>
          <Grid container>

            <Grid item xs={10} container>
              <input type="text" ref={inputRef} onChange={(e) => setNewCandidate(e.target.value)} style={{width: '80%'}}/>
              <Button
                color="secondary"
                variant="contained"
                onClick={appendInput}
              >
                Add
              </Button>
            </Grid>

            <Grid item xs={2} container justifyContent="flex-end">
              <button type="submit">Submit candidates</button>
            </Grid>

          </Grid>
        </form>

      </Grid>
    </Container>
  );
}

export default App;
