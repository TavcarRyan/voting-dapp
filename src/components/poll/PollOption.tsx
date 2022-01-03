// REACT
import React from "react";

// MATERIAL-UI
import { Grid, Typography } from "@material-ui/core";

// ASSETS
import { PollStyles } from "./styles";
import ProgressBar from "@ramonak/react-progress-bar";

interface Poll {
  option: string;
  votes: number;
}

interface PollOptionProps {
  poll: Poll;
  index: number;
}

const POLL_COLORS = ["#FFC246", "#07BB62", "#5470DE", "#6F6F6F"];

const PollOption = (props: PollOptionProps) => {
  const classes = PollStyles();

  const [isHovered, setIsHovered] = React.useState(-1);

  const showVote = (i) => {
    setIsHovered(i);
  };

  const hideVote = () => {
    setIsHovered(-1);
  };

  const handleVote = () => {
    console.log("Voted!");
  };

  return (
    <Grid
      item
      xs={12}
      container
      className={classes.poll}
      onMouseLeave={hideVote}
      onMouseEnter={() => showVote(props.index)}
      onClick={handleVote}
    >
      <Grid item xs={12} container justifyContent="space-between">
        <Typography>{props.poll.option}</Typography>
        {isHovered === props.index && (
          <Typography className={classes.voteText}>Vote!</Typography>
        )}
      </Grid>

      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={11}>
          <ProgressBar
            completed={props.poll.votes}
            bgColor={POLL_COLORS[props.index]}
            height="15px"
            labelColor="#000000"
            labelAlignment="outside"
            animateOnRender
            maxCompleted={100}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PollOption;
