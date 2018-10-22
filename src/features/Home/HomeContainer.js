import React, { Component } from "react";

import { Link } from "react-router-dom";

import Timer from "../Timer/TimerContainer";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
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

class Home extends Component {
  state = {
    isAuthenticated: this.props.isAuthenticated
  };

  renderLander = () => (
    <div className={this.props.classes.root}>
      <Typography variant="h5" color="textPrimary">
        Timer
      </Typography>
      <Button
        className={this.props.classes.button}
        variant="outlined"
        size="small"
        component={Link}
        to="/login"
      >
        Login
      </Button>
      <Button
        className={this.props.classes.button}
        variant="outlined"
        size="small"
        component={Link}
        to="/signup"
      >
        Signup
      </Button>
    </div>
  );

  renderTimers = () => (
    <div className={this.props.classes.timers}>
      <Timer />
    </div>
  );
  render() {
    return (
      <>
        {this.state.isAuthenticated ? this.renderTimers() : this.renderLander()}
      </>
    );
  }
}

export default withStyles(styles)(Home);
