// REACT
import React from "react";

// MATERIAL-UI
import { Grid, Typography } from "@material-ui/core";

// ASSETS
import { PollStyles } from "./styles";

interface Poll {
  option: string;
  votes: number;
}

interface PollOptionProps {
  poll: Poll;
  index: number;
}

const POLL_COLORS = ["red", "green", "blue", "pink", "purple"];

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
      key={props.poll.option}
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
        <Grid item xs={10} className="w3-light-grey">
          <Grid
            item
            className={`w3-container w3-${POLL_COLORS[props.index]} w3-center`}
            style={{ width: `${props.poll.votes}%`, height: "2px" }}
          ></Grid>
        </Grid>

        <Grid
          item
          xs
          style={{
            marginLeft: "10px",
            maxWidth: "fit-content",
          }}
        >
          <Typography>{props.poll.votes}%</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PollOption;
