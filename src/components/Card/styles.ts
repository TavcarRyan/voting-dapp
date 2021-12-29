import type { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const CardStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "200px",
      border: "1px solid black",
      marginBottom: "20px",
    },
    innerContainer: {},
    pollDetails: {
      borderTop: "1px solid black",
      padding: "20px 0px",
    },
  })
);
