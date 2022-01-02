import type { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const CardStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerContainer: {
      borderRadius: "6px",
      cursor: "pointer",
      "& :hover": {
        backgroundColor: "#d8d8d8",
      },
    },
    container: {
      height: "200px",
      marginBottom: "20px",
    },
    innerContainer: {},
    pollDetails: {
      borderTop: "1px solid black",
      padding: "20px 0px",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
    },
  })
);
