import type { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const PollStyles = makeStyles((theme: Theme) =>
  createStyles({
    outerContainer: {
      width: "calc(100vw - 30%)",
      height: "calc(100vh - 30%)",
      position: "fixed !important" as "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      outline: "none",
      borderRadius: "6px",
      padding: "10px",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        height: "100%",
        borderRadius: "0px",
      },
    },
    option: {
      "& :hover": {
        backgroundColor: "#F7F7F7",
      },
      "& :active": {
        backgroundColor: "#EEEEEE",
      },
    },
    poll: {
      borderRadius: "6px",
      padding: "10px",
      cursor: "pointer",
    },
    voteText: {
      color: "red",
      fontWeight: 600,
    },
  })
);
