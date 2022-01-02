// REACT
import React from "react";

// MATERIAL-UI
import { Modal, Grid, Typography } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// COMPONENTS
import MobileModalHeader from "../common/MobileModalHeader";
import PieChart from "../common/PieChart";

// ASSETS
import { PollStyles } from "./styles";

interface PollProps {
  togglePoll: boolean;
  togglePollModal: () => void;
}

const DUMMY_POLL_DATA = [
  {
    option: "option 1",
    votes: 9,
  },
  {
    option: "option 2",
    votes: 11,
  },
  {
    option: "option 3",
    votes: 8,
  },
  {
    option: "option 4",
    votes: 14,
  },
];

const POLL_COLORS = ["red", "green", "blue", "pink", "purple"];

const Poll = (props: PollProps) => {
  const classes = PollStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [isHovered, setIsHovered] = React.useState(-1);

  const assembleLabels = (): string[] => {
    return DUMMY_POLL_DATA.map((el) => el.option);
  };

  const assembleSeries = (): number[] => {
    return DUMMY_POLL_DATA.map((el) => el.votes);
  };

  const showCartHandler = (i) => {
    setIsHovered(i);
  };

  const hideCartHandler = () => {
    setIsHovered(-1);
  };

  return (
    <Modal open={props.togglePoll} onClose={props.togglePollModal}>
      <Grid container className={classes.outerContainer}>
        {isMobile && (
          <MobileModalHeader
            title="All Polls"
            onClose={props.togglePollModal}
          />
        )}

        <Grid
          item
          xs={12}
          md={8}
          container
          alignItems="center"
          className={classes.option}
        >
          {DUMMY_POLL_DATA.map((poll, i) => (
            <Grid
              key={poll.option}
              item
              xs={12}
              container
              className={classes.poll}
              onMouseLeave={hideCartHandler}
              onMouseEnter={() => showCartHandler(i)}
            >
              <Grid item xs={12} container justifyContent="space-between">
                <Typography>{poll.option}</Typography>
                {isHovered === i && (
                  <Typography className={classes.voteText}>Vote!</Typography>
                )}
              </Grid>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item xs={10} className="w3-light-grey">
                  <Grid
                    item
                    className={`w3-container w3-${POLL_COLORS[i]} w3-center`}
                    style={{ width: `${poll.votes}%`, height: "2px" }}
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
                  <Typography>{poll.votes}%</Typography>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          container
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs>
            <PieChart labels={assembleLabels()} series={assembleSeries()} />
          </Grid>
        </Grid>
      </Grid>
    </Modal>
  );
};

export default Poll;
