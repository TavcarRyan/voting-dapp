import React from "react";

// MATERIAL-UI
import { Button, Grid, Typography } from "@material-ui/core";

// ASSETS
import { CardStyles } from "./styles";

interface CardProps {
  name: string;
  votes: number;
  onClick: (name: string) => void;
}

const Card = (props: CardProps) => {
  const classes = CardStyles();
  const [color, setColor] = React.useState("");

  React.useEffect(() => {
    randomColor();
  }, []);

  const randomColor = () => {
    const colors = ["red", "green", "blue", "pink", "purple"];
    const color = Math.floor(Math.random() * (5 - 0) + 0);
    setColor(colors[color]);
  };

  return (
    <Grid container className={classes.container}>
      <Grid
        item
        xs={12}
        container
        className="w3-light-grey"
        style={{ height: "2px" }}
      >
        <Grid
          item
          className={`w3-container w3-${color} w3-center`}
          style={{ width: `${props.votes}0%`, height: "2px" }}
        ></Grid>
      </Grid>
      <Grid item xs={6}>
        <Typography>{props.name}</Typography>
        <Typography>{props.votes}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Button
          variant="contained"
          style={{ backgroundColor: color, color: "#fff" }}
          onClick={() => props.onClick(props.name)}
        >{`Vote ${props.name}`}</Button>
      </Grid>
    </Grid>
  );
};

export default Card;
