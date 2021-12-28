// REACT
import React from "react";

// MATERIAL-UI
import { Button, Container, Grid, Paper, Typography } from "@material-ui/core";

// COMPONENTS

// CONTRACT

// ASSETS
import { SidebarStyles } from "./styles";
import { SidebarProps } from "./types";

const Sidebar = (props: SidebarProps) => {
  const classes = SidebarStyles();

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
            <Typography>{props.blockHeight} blocks</Typography>
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
            <Typography>
              {formatAddress(props.connectedWalletAddress)}
            </Typography>
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
            <Typography>{props.totalVotes}</Typography>
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
            <Typography>{props.membership}</Typography>
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
