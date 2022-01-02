import { createTheme, Theme } from "@mui/material";
// define light theme colors
export const theme: Theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#B37C82",
    },
    text: {
      primary: "#16203B",
      secondary: "#545454",
      disabled: "#252525",
    },
  },
  typography: {
    fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});
