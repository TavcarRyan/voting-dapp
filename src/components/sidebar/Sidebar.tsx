// REACT
import React from "react";

// MATERIAL-UI
import { Button, Grid, Paper, Typography } from "@material-ui/core";

// COMPONENTS

// CONTRACT
import Voting from "../../artifacts/contracts/Voting.sol/Voting.json";

// ASSETS
import { SidebarStyles } from "./styles";
import useContract from "../../utils/useContract";
import { hasEthereum } from "../../utils/ethereum";

declare let window: any;

const Sidebar = () => {
  const classes = SidebarStyles();

  const [blockHeight, setBlockHeight] = React.useState<null | number>(null);
  const [totalVotes, setTotalVotes] = React.useState(0);
  const [connectedWalletAddress, setConnectedWalletAddressState] =
    React.useState("");
  const [membership, setMembership] = React.useState<string>("");
  const [walletConnected, setWalletConnected] = React.useState<boolean>(false);

  const { providerContract, signer, provider } = useContract(Voting.abi);

  React.useEffect(() => {
    const initialLoad = async () => {
      if (walletConnected || hasEthereum()) {
        const tempMembership = await providerContract.getMembership();
        setMembership(tempMembership);

        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(signerAddress);

        const tempBlockHeight = await provider.getBlockNumber();
        setBlockHeight(tempBlockHeight);

        const allVotes = await providerContract.totalVotesCasted();
        setTotalVotes(allVotes.toNumber());
        setWalletConnected(true);
      }
    };

    initialLoad();
  }, [walletConnected]);

  async function requestAccount() {
    return await window.ethereum.request({ method: "eth_requestAccounts" });
  }

  const connectMetaMask = async () => {
    try {
      const isConnected = await requestAccount();
      if (isConnected) {
        const signerAddress = await signer.getAddress();
        setConnectedWalletAddressState(signerAddress);

        const tempMembership = await providerContract.getMembership();
        setMembership(tempMembership);

        setWalletConnected(true);
      }
    } catch (error) {
      console.error("Could not connect to Metamask.");
    }
  };

  const formatAddress = (address: string): string => {
    const splitStartAddress = address.slice(0, 6);
    const splitEndAddress = address.slice(-6);
    return `${splitStartAddress}...${splitEndAddress}`;
  };

  return (
    <Paper elevation={3} className={classes.container}>
      <Grid container direction="column">
        <Grid
          item
          container
          alignItems="center"
          className={classes.sidebarItem}
        >
          <Grid item xs={4}>
            <Typography className={classes.title}>Latest Block</Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            <Typography>{blockHeight} blocks</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          alignItems="center"
          className={classes.sidebarItem}
        >
          <Grid item xs={4}>
            <Typography className={classes.title}>Connected Wallet</Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            {walletConnected ? (
              <Typography>{formatAddress(connectedWalletAddress)}</Typography>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={connectMetaMask}
              >
                Connect wallet
              </Button>
            )}
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          alignItems="center"
          className={classes.sidebarItem}
        >
          <Grid item xs={4}>
            <Typography className={classes.title}>Total Votes</Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            <Typography>{totalVotes}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          alignItems="center"
          className={classes.sidebarItem}
        >
          <Grid item xs={4}>
            <Typography className={classes.title}>Membership</Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            <Typography>{membership}</Typography>
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          alignItems="center"
          className={classes.sidebarItem}
        >
          <Grid item xs={4}>
            <Typography className={classes.title}>Stats</Typography>
          </Grid>
          <Grid item xs={8} container justifyContent="flex-end">
            <Typography></Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Sidebar;
