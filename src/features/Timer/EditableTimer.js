import React, { Component } from "react";

import Timer from "./Timer";
import TimerForm from "./TimerForm";

class EditableTimer extends Component {
  state = {
    isOpen: false
  };

  toggleHandler = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  handleFormSubmit = timer => {
    this.props.onUpdateClick(timer);
    this.setState({ isOpen: false });
  };

  handleDeleteClick = () => {
    const deletedTimer = this.props.timer;
    this.props.onDeleteClick(deletedTimer.timerId);
  };

  handleStartClick = () => {
    const startedTimer = this.props.timer;
    this.props.onStartClick(startedTimer.timerId);
  };

  handleStopClick = () => {
    const stoppedTimer = this.props.timer;
    this.props.onStopClick(stoppedTimer);
  };

  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm
          {...this.props.timer}
          onCancleClick={this.toggleHandler}
          onFormSubmit={this.handleFormSubmit}
        />
      );
    }
    return (
      <Timer
        {...this.props.timer}
        onDeleteClick={this.handleDeleteClick}
        onEditClick={this.toggleHandler}
        onStartClick={this.handleStartClick}
        onStopClick={this.handleStopClick}
      />
    );
  }
}

export default EditableTimer;
