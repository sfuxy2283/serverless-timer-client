import React, { Component } from "react";

import EditableTimer from "../Timer/EditableTimer";
import AddTimerButton from "../Timer/AddTimerButton";
import { withStyles } from "@material-ui/core/styles";

import uuid from "uuid";

const styles = {
  timers: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
};

class Timers extends Component {
  state = {
    timers: [
      {
        timerId: 1234,
        title: "Test Timer",
        project: "serverless website",
        elapsed: 0,
        runningSince: null
      }
    ]
  };

  createTimer = timer => {
    const newTimer = {
      timerId: uuid.v1(),
      title: timer.title,
      project: timer.project,
      elapsed: 0,
      runningSince: null
    };
    this.setState({
      timers: this.state.timers.concat(newTimer)
    });
  };

  deleteTimer = timerId => {
    this.setState({
      timers: this.state.timers.filter(t => t.timerId !== timerId)
    });
  };

  updateTimer = attrs => {
    const updatedTimers = this.state.timers.map(t => {
      if (t.timerId === attrs.timerId) {
        return { ...t, title: attrs.title, project: attrs.project };
      }
      return t;
    });
    this.setState({
      timers: updatedTimers
    });
  };

  startTimer = timerId => {
    const startTime = Date.now();
    const updatedTimers = this.state.timers.map(t => {
      if (t.timerId === timerId) {
        return { ...t, runningSince: startTime };
      }
      return t;
    });
    this.setState({
      timers: updatedTimers
    });
  };

  stopTimer = timer => {
    const now = Date.now();
    const lastElapsed = now - timer.runningSince;
    const updatedElapsed = timer.elapsed + lastElapsed;
    const updatedTimers = this.state.timers.map(t => {
      if (t.timerId === timer.timerId) {
        return { ...t, elapsed: updatedElapsed, runningSince: null };
      }
      return t;
    });
    this.setState({
      timers: updatedTimers
    });
  };

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({
      behavior: "smooth"
    });
  };

  render() {
    const timers = this.state.timers.map(timer => (
      <EditableTimer
        key={timer.timerId}
        timer={timer}
        onDeleteClick={this.deleteTimer}
        onUpdateClick={this.updateTimer}
        onStartClick={this.startTimer}
        onStopClick={this.stopTimer}
      />
    ));
    return (
      <div className={this.props.classes.timers}>
        {timers}
        <AddTimerButton
          onCreateClick={this.createTimer}
          scrollToBottom={this.scrollToBottom}
        />
        <div
          style={{ float: "left", clear: "both" }}
          ref={el => (this.messagesEnd = el)}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Timers);
