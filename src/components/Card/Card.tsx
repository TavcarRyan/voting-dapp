import React from "react";

// MATERIAL-UI
import { Grid, Typography, Paper } from "@material-ui/core";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import DateRangeIcon from "@mui/icons-material/DateRange";

// COMPONENTS
import PollDetails from "./CardDetails";

// ASSETS
import { CardStyles } from "./styles";

interface Poll {
  title: string;
  address: string;
  totalVotes: number;
}

interface CardProps {
  poll: Poll;
  togglePollModal: () => void;
  onClick: (name: string) => void;
}

const Card = (props: CardProps) => {
  const classes = CardStyles();

  const formatAddress = (address: string): string => {
    const splitStartAddress = address.slice(0, 6);
    const splitEndAddress = address.slice(-6);
    return `${splitStartAddress}...${splitEndAddress}`;
  };

  return (
    <Paper
      elevation={3}
      className={classes.outerContainer}
      onClick={props.togglePollModal}
    >
      <Grid container className={classes.container}>
        <Grid
          item
          xs={12}
          container
          justifyContent="center"
          alignItems="center"
          className={classes.innerContainer}
        >
          <Grid item xs={10}>
            <Typography className={classes.title}>
              {props.poll.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container className={classes.innerContainer}>
          <PollDetails
            icon={<PersonOutlineIcon />}
            data={formatAddress(props.poll.address)}
          />
          <PollDetails icon={<HowToVoteIcon />} data={props.poll.totalVotes} />
          <PollDetails icon={<DateRangeIcon />} data="28th December 2021" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Card;
