import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const styles = {
  root: {
    width: "300px",
    marginBottom: "40px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    margin: "20px"
  },
  button: {
    marginTop: "10px",
    marginLeft: "5px",
    marginRight: "5px",
    width: "120px"
  }
};

class TimerForm extends Component {
  state = {
    title: this.props.title || "",
    project: this.props.project || ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.onFormSubmit({
      timerId: this.props.timerId,
      title: this.state.title,
      project: this.state.project
    });
  };

  render() {
    const { classes, onCancleClick } = this.props;
    const submitText = this.props.timerId ? "Update" : "Create";
    return (
      <Card className={classes.root}>
        <form className={classes.form}>
          <TextField
            id="title"
            name="title"
            value={this.state.title}
            label="Title"
            type="text"
            margin="normal"
            onChange={this.handleChange}
            autoFocus
          />
          <TextField
            id="project"
            name="project"
            value={this.state.project}
            label="Project"
            type="text"
            margin="normal"
            onChange={this.handleChange}
          />
          <div>
            <Button
              className={classes.button}
              color="secondary"
              variant="contained"
              size="large"
              onClick={onCancleClick}
            >
              Cancle
            </Button>
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              variant="contained"
              size="large"
              onClick={this.handleSubmit}
            >
              {submitText}
            </Button>
          </div>
        </form>
      </Card>
    );
  }
}

export default withStyles(styles)(TimerForm);
