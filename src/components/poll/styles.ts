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
    createPollContainer: {
      width: "calc(100vw - 30%)",
      // height: "auto",
      maxHeight: "calc(100vh - 10%)",
      position: "fixed !important" as "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      outline: "none",
      borderRadius: "6px",
      padding: "10px",
      overflowY: "auto",
      [theme.breakpoints.down("sm")]: {
        width: "100%",
        minHeight: "100%",
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
    formContainer: {
      height: "calc(100vh - 30%)",
      padding: "50px",
      width: "100%",
      [theme.breakpoints.down("sm")]: {
        height: "100vh",
        padding: "20px",
      },
    },
    inputField: {
      width: "100%",
      padding: "20px 0px",
    },
    optionInput: {
      paddingBottom: "10px",
    },
    buttonContainer: {
      margin: "20px 0px",
    },
    datePickerInput: {
      display: "none",
    },
    datePickerWrapper: {
      paddingBottom: "6px",
      backgroundColor: "whitesmoke",
      borderRadius: "5px",
      border: "0.5px, solid grey",
    },
    datePickerPopper: {
      left: "0px !important",
    },
    datePickerHint: {
      fontSize: "14px",
      paddingLeft: "8px",
      paddingBottom: "5px",
    },
  })
);
