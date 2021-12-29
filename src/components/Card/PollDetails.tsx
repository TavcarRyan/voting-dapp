// REACT
import React from "react";

// MATERIAL-UI
import { Grid, Typography } from "@material-ui/core";

// ASSETS
import { CardStyles } from "./styles";

interface PollDetailsProps {
  icon: JSX.Element;
  data: string | number | Date;
}

const PollDetails = (props: PollDetailsProps) => {
  const classes = CardStyles();
  return (
    <Grid
      item
      xs={4}
      container
      direction="column"
      justifyContent="center"
      className={classes.pollDetails}
    >
      <Grid item xs>
        {props.icon}
      </Grid>
      <Grid item xs>
        <Typography>{props.data}</Typography>
      </Grid>
    </Grid>
  );
};

export default PollDetails;
