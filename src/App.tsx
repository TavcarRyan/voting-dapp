// REACT
import React from "react";

// MATERIAL-UI
import { Button, Container, Grid } from "@material-ui/core";

// COMPONENTS
import Card from "./components/card/Card";

// CONTRACT
import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
import useContract from "./utils/useContract";
import { hasEthereum } from "./utils/ethereum";

// ASSETS
import "./App.css";
import { ethers } from "ethers";
import Sidebar from "./components/sidebar/Sidebar";

/*eslint no-implicit-globals: "error"*/
declare let window: any;

interface Candidates {
  name: string;
  votes: number;
}

const n = 10;

function App() {
  const [candidateList, setCandidateList] = React.useState([
    {
      name: "John Doe",
      votes: 0,
    },
  ]);

  // function capitalizeFirstLetter(string) {
  //   return string.charAt(0).toUpperCase() + string.slice(1);
  // }

  // Request access to MetaMask account
  // async function requestAccount() {
  //   await window.ethereum.request({ method: "eth_requestAccounts" });
  // }

  // const appendInput = () => {
  //   const newInput = `input-${inputs.length}`;
  //   setInputs((prev) => [...prev, newInput]);
  //   setCandidateList((prev) => [...prev, { name: newCandidate, votes: 0 }]);

  //   if (inputRef.current !== null) {
  //     inputRef.current.value = "";
  //   }
  // };

  const voteForCandidate = () => {};

  return (
    <Container className="App">
      <h1>My First Dapp - Voting Application</h1>
      <Grid container>
        <Grid item xs={12} md={8}>
          {candidateList.map((candidate, i) => (
            <div key={candidate.name} style={{ width: "100%" }}>
              <Card
                name={candidate.name}
                onClick={voteForCandidate}
                votes={candidate.votes}
              />
            </div>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Sidebar />
        </Grid>
      </Grid>
      {/* <Grid container>
        <Grid
          item
          xs={12}
          container
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            Total votes casted: {totalVotes}
          </Grid>
          <Grid item xs={6}>
            {connectedWalletAddress && <p>{connectedWalletAddress}</p>}
          </Grid>
        </Grid>

        {candidateList.map((candidate, i) => (
          <div key={candidate.name} style={{ width: "100%" }}>
            <Grid>
              <Card
                name={candidate.name}
                onClick={voteForCandidate}
                votes={candidate.votes}
              />
            </Grid>
          </div>
        ))}

        <form onSubmit={submitForm} style={{ width: "100%" }}>
          <Grid container>
            <Grid item xs={10} container>
              <input
                type="text"
                ref={inputRef}
                onChange={(e) => setNewCandidate(e.target.value)}
                style={{ width: "80%" }}
              />
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
      </Grid> */}
    </Container>
  );
}

export default App;
