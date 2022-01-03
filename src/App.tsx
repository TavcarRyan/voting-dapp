// REACT
import React from "react";

// MATERIAL-UI
import { Container, Grid } from "@material-ui/core";

// COMPONENTS
import Card from "./components/card/Card";
import Poll from "./components/poll/Poll";
import CreatePoll from "./components/poll/CreatePoll";
import Navbar from "./components/core/Navbar";

// CONTRACT
// import Voting from "./artifacts/contracts/Voting.sol/Voting.json";
// import useContract from "./utils/useContract";
// import { hasEthereum } from "./utils/ethereum";

// ASSETS
import "./App.css";
// import { ethers } from "ethers";
import Sidebar from "./components/sidebar/Sidebar";

// CONTEXT
import { globalContext, initialGlobalState } from "./context/globalContext";
import { globalReducer } from "./context/globalReducer";

// THEME
import { theme } from "./utils/theme";
import { ThemeProvider } from "@mui/material/styles";

/*eslint no-implicit-globals: "error"*/
// declare let window: any;

const DUMMY_POLLS = [
  {
    title: "What is the best cryptocurrency?!",
    address: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    totalVotes: 19,
  },
  {
    title: "What is the best seasoning?",
    address: "0x71be63f3384f5fb98995898a86b02fb2426c5788",
    totalVotes: 27,
  },
  {
    title: "Are you happy?",
    address: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
    totalVotes: 56,
  },
  {
    title: "Linux vs Mac vs Windows",
    address: "0xfabb0ac9d68b0b445fb7357272ff202c5651694a",
    totalVotes: 12,
  },
];

function App() {
  const [state, dispatch] = React.useReducer(globalReducer, initialGlobalState);

  const [togglePoll, setTogglePoll] = React.useState<boolean>(false);

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

  const togglePollModal = () => {
    setTogglePoll((prev) => !prev);
  };

  const toggleCreatePollModal = () => {
    dispatch({ type: "TOGGLE_CREATE_POLL_MODAL", payload: false });
  };

  return (
    <globalContext.Provider value={{ ...state, dispatch }}>
      <ThemeProvider theme={theme}>
        <Navbar />
        <Container className="App">
          <Grid container style={{ margin: "50px 0px" }}>
            <Grid item xs={12} md={8}>
              {DUMMY_POLLS.map((poll, i) => (
                <div key={i} style={{ width: "100%" }}>
                  <Card poll={poll} togglePollModal={togglePollModal} />
                </div>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Sidebar />
            </Grid>
          </Grid>
          {togglePoll && (
            <Poll togglePoll={togglePoll} togglePollModal={togglePollModal} />
          )}
          {state.toggleCreatePollModal && (
            <CreatePoll
              modalOpen={state.toggleCreatePollModal}
              toggleCreatePollModal={toggleCreatePollModal}
            />
          )}
        </Container>
      </ThemeProvider>
    </globalContext.Provider>
  );
}

export default App;
