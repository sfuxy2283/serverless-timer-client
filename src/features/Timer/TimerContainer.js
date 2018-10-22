import React, { Component } from "react";

import EditableTimer from "./EditableTimer";
import AddTimerButton from "./AddTimerButton";

import { API } from "aws-amplify";

import uuid from "uuid";

class Timers extends Component {
  state = {
    timers: [],
    isLoading: true
  };

  async componentDidMount() {
    try {
      const timers = await API.get("timers", "/timers");
      this.setState({ timers });
    } catch (e) {
      alert(e);
    }
    this.setState({ isLoading: false });
  }

  createTimer = async timer => {
    const newTimer = {
      timerId: uuid.v1(),
      title: timer.title,
      project: timer.project,
      elapsed: 0,
      runningSince: null
    };
    try {
      await API.post("timers", "/timers", { body: newTimer });
      this.setState({
        timers: this.state.timers.concat(newTimer)
      });
    } catch (e) {
      alert(e);
    }
  };

  deleteTimer = async timerId => {
    try {
      await API.del("timers", `/timers/${timerId}`);
      this.setState({
        timers: this.state.timers.filter(t => t.timerId !== timerId)
      });
    } catch (e) {
      alert(e);
    }
  };

  updateTimer = async attrs => {
    try {
      await API.put("timers", `/timers/${attrs.timerId}`, {
        body: { title: attrs.title, project: attrs.project }
      });
      const updatedTimers = this.state.timers.map(t => {
        if (t.timerId === attrs.timerId) {
          return { ...t, title: attrs.title, project: attrs.project };
        }
        return t;
      });
      this.setState({
        timers: updatedTimers
      });
    } catch (e) {
      alert(e);
    }
  };

  startTimer = async timerId => {
    try {
      const startTime = Date.now();
      await API.put("timers", `/timers/${timerId}/start`, {
        body: { start: startTime }
      });
      const updatedTimers = this.state.timers.map(t => {
        if (t.timerId === timerId) {
          return { ...t, runningSince: startTime };
        }
        return t;
      });
      this.setState({
        timers: updatedTimers
      });
    } catch (e) {
      alert(e);
    }
  };

  stopTimer = async timer => {
    const now = Date.now();
    const lastElapsed = now - timer.runningSince;
    const updatedElapsed = timer.elapsed + lastElapsed;
    try {
      await API.put("timers", `/timers/${timer.timerId}/stop`, {
        body: { elapsed: updatedElapsed }
      });
      const updatedTimers = this.state.timers.map(t => {
        if (t.timerId === timer.timerId) {
          return { ...t, elapsed: updatedElapsed, runningSince: null };
        }
        return t;
      });
      this.setState({
        timers: updatedTimers
      });
    } catch (e) {
      alert(e);
    }
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
      <div>
        {this.state.isLoading || timers}
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

export default Timers;
