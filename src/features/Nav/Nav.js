import React from "react";

import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1,
    textAlign: "left",
    textDecoration: "none"
  }
};
const nav = props => {
  const { classes, onLogout } = props;
  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            color="inherit"
            className={classes.grow}
          >
            Bol Timer
          </Typography>
          {props.isAuthenticated && (
            <Button onClick={onLogout} color="inherit">
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default withStyles(styles)(nav);
