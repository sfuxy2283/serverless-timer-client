import React from "react";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const styles = {
  root: {},
  timers: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    width: "100px",
    margin: "20px"
  }
};

const notFound = props => {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <Typography variant="title">Page Not found</Typography>
    </div>
  );
};

export default withStyles(styles)(notFound);
