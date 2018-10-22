import React, { Component } from "react";

import { Link } from "react-router-dom";

import { Auth } from "aws-amplify";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const styles = {
  layout: {
    width: "auto",
    padding: "20px"
  },
  input: {
    maxWidth: "400px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    marginTop: "20px"
  },
  progress: {
    marginTop: "20px"
  },
  text: {
    marginTop: "20px"
  }
};

class Login extends Component {
  state = {
    isLoading: false,
    email: "",
    password: ""
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  validateSubmit = () =>
    !(this.state.email.length > 0 && this.state.password.length > 0);

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.signIn(this.state.email, this.state.password);
      this.props.handleLogin();
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Typography variant="h5">Log In</Typography>
        <form className={classes.form}>
          <TextField
            className={classes.input}
            id="email"
            label="Email"
            type="email"
            margin="normal"
            fullWidth
            autoFocus
            required
            onChange={this.handleChange}
            value={this.state.email}
          />
          <TextField
            className={classes.input}
            id="password"
            label="Password"
            type="password"
            margin="normal"
            fullWidth
            required
            onChange={this.handleChange}
            value={this.state.password}
          />
          {this.state.isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Button
              className={classes.button}
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              disabled={this.validateSubmit()}
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          )}
        </form>
        <Link to={"/guest"}>
          <Typography className={classes.text} variant="subtitle1">
            Login by guest
          </Typography>
        </Link>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
