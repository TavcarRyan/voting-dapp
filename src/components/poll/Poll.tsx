// REACT
import React from "react";

// MATERIAL-UI
import { Modal, Grid } from "@material-ui/core";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// COMPONENTS
import MobileModalHeader from "../common/MobileModalHeader";
import PieChart from "../common/PieChart";

// ASSETS
import { PollStyles } from "./styles";
import PollOption from "./PollOption";

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

const Poll = (props: PollProps) => {
  const classes = PollStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const assembleLabels = (): string[] => {
    return DUMMY_POLL_DATA.map((el) => el.option);
  };

  const assembleSeries = (): number[] => {
    return DUMMY_POLL_DATA.map((el) => el.votes);
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
            <PollOption poll={poll} index={i} />
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
