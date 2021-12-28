import type { Theme } from "@mui/material/styles";
import { makeStyles, createStyles } from "@mui/styles";

export const SidebarStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: "0px 30px",
    },
    sidebarItem: {
      borderBottom: "1px solid lightgrey",
      padding: "10px",
      minHeight: "70px",
    },
    title: {
      fontSize: "18px",
      fontWeight: 600,
    },
  })
);
