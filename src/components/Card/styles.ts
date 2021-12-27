import type { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const CardStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: "100px",
      border: "1px solid black",
      margin: "20px 0px",
    },
  })
);
