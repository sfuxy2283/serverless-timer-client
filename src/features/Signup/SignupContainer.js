import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Auth } from "aws-amplify";

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
  }
};

class Signup extends Component {
  state = {
    isLoading: false,
    email: "",
    password: "",
    confirmpassword: "",
    emailError: false,
    passwordError: false,
    confirmpasswordError: false,
    confirmationCode: "",
    newUser: null
  };

  handleEmailChange = event => {
    const email = event.target.value;
    const error = !this.validateEmail(email);
    this.setState({
      email: email,
      emailError: error
    });
  };

  handlePasswordChange = event => {
    const password = event.target.value;
    const error = !this.validatePassword(password);
    this.setState({
      password: password,
      passwordError: error
    });
  };

  handleConfirmPasswordChange = event => {
    const confirmpassword = event.target.value;
    const error = !this.validateConfrimPassword(confirmpassword);
    this.setState({
      confirmpassword: confirmpassword,
      confirmpasswordError: error
    });
  };

  handleConfirmationCodeChange = event => {
    this.setState({
      confirmationCode: event.target.value
    });
  };

  validateEmail = email => {
    let emailCondition = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailCondition.test(email);
  };

  validatePassword = password => {
    let passwordCondition = /^(?=.*[a-z])(?=.*[0-9])(?=.{8,})/;
    return passwordCondition.test(password);
  };

  validateConfrimPassword = confirmpassword =>
    this.state.password === confirmpassword;

  validateConfrimationCode = () => this.state.confirmationCode.length > 0;

  validateSubmit = () =>
    this.validateEmail(this.state.email) &&
    this.validatePassword(this.state.password) &&
    this.validateConfrimPassword(this.state.confirmpassword);

  handleSubmit = async event => {
    event.preventDefault();

    this.setState({
      isLoading: true
    });

    try {
      const newUser = await Auth.signUp({
        username: this.state.email,
        password: this.state.password
      });
      this.setState({
        newUser
      });
      this.setState({
        isLoading: false
      });
    } catch (e) {
      // Check username already exists in the pool
      if (e.name === "UsernameExistsException") {
        // Check username is already confirmed if not, resend cofrim mail to user
        try {
          const newUser = await Auth.resendSignUp(this.state.email);
          this.setState({
            newUser
          });
          this.setState({
            isLoading: false
          });
          alert(
            "We sent confrimation code to your email agian pleas check your email"
          );
        } catch (e) {
          alert(e.message);
          this.props.history.push("/login");
        }
      } else {
        alert(e.message);
        this.setState({
          isLoading: false
        });
      }
    }
  };

  handleConfirmationSubmit = async event => {
    event.preventDefault();

    this.setState({ isLoading: true });

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);

      this.props.handleLogin();
      this.props.history.push("/");
    } catch (e) {
      alert(e.message);
      this.setState({ isLoading: false });
    }
  };

  renderConfirmationForm = () => {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Typography variant="h5">Sign Up</Typography>
        <form className={classes.form}>
          <TextField
            className={classes.input}
            id="confirmationCode"
            label="Confirmation Code"
            type="text"
            value={this.state.confirmationCode}
            margin="normal"
            fullWidth
            autoFocus
            required
            onChange={this.handleConfirmationCodeChange}
          />
          <Typography variant="body1">
            Please check your email for the code.
          </Typography>
          {this.state.isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              disabled={!this.validateConfrimationCode()}
              variant="contained"
              onClick={this.handleConfirmationSubmit}
            >
              Verify
            </Button>
          )}
        </form>
      </div>
    );
  };

  renderSignupForm = () => {
    const { classes } = this.props;
    return (
      <div className={classes.layout}>
        <Typography variant="h5">Sign Up</Typography>
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
            error={this.state.emailError}
            onChange={this.handleEmailChange}
          />
          <TextField
            className={classes.input}
            id="password"
            label="Password"
            helperText="At least 8 characters, one number, one lowercase"
            type="password"
            margin="normal"
            fullWidth
            required
            error={this.state.passwordError}
            onChange={this.handlePasswordChange}
          />
          <TextField
            className={classes.input}
            id="confirmpassword"
            label="Confrim Password"
            type="password"
            margin="normal"
            fullWidth
            required
            error={this.state.confirmpasswordError}
            onChange={this.handleConfirmPasswordChange}
          />
          {this.state.isLoading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            <Button
              className={classes.button}
              color="primary"
              type="submit"
              disabled={!this.validateSubmit()}
              variant="contained"
              onClick={this.handleSubmit}
            >
              Signup
            </Button>
          )}
        </form>
      </div>
    );
  };

  render() {
    return (
      <>
        {this.state.newUser === null
          ? this.renderSignupForm()
          : this.renderConfirmationForm()}
      </>
    );
  }
}

export default withStyles(styles)(Signup);
