import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import TimerForm from "./TimerForm";

const styles = {
  addButton: {
    marginBottom: "30px"
  }
};

class AddTimerButton extends Component {
  state = {
    isOpen: false
  };

  toggleHandler = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextState.isOpen;
  }
  componentDidUpdate() {
    if (this.state.isOpen) this.props.scrollToBottom();
  }

  handleFormSubmit = timer => {
    this.props.onCreateClick(timer);
    this.setState({ isOpen: false });
  };

  render() {
    const { classes } = this.props;

    if (this.state.isOpen) {
      return (
        <TimerForm
          onCancleClick={this.toggleHandler}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
    return (
      <Button
        onClick={this.toggleHandler}
        className={classes.addButton}
        variant="fab"
        mini
        color="primary"
      >
        <AddIcon />
      </Button>
    );
  }
}

export default withStyles(styles)(AddTimerButton);
