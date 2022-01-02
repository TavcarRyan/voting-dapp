// REACT
import React from "react";

// MATERIAL-UI
import { Typography, AppBar, IconButton, Toolbar } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ASSETS
import { HeaderStyles } from "./styles";

interface MobileModalHeaderProps {
  title: string;
  onClose: (
    event: React.MouseEvent<HTMLDivElement | HTMLAnchorElement>
  ) => void;
}

const MobileModalHeader = (props: MobileModalHeaderProps) => {
  const classes = HeaderStyles();
  return (
    <AppBar sx={{ position: "relative" }} style={{ height: "60px" }}>
      <Toolbar>
        <IconButton
          component="a"
          edge="start"
          color="inherit"
          onClick={props.onClose}
          aria-label="close"
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
          {props.title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default MobileModalHeader;
