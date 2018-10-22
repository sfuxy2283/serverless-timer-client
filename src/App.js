import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Nav from "./features/Nav/Nav";

import { withStyles } from "@material-ui/core/styles";

import Routes from "./Routes";

import { Auth } from "aws-amplify";

const styles = {
  root: {
    textAlign: "center",
    paddingTop: "100px"
  }
};

class App extends Component {
  state = {
    isAuthenticated: false,
    isAuthenticating: true
  };

  async componentDidMount() {
    try {
      await Auth.currentSession();
      this.handleLogin();
    } catch (e) {
      if (e !== "No current user") {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  handleLogout = async event => {
    await Auth.signOut();
    this.setState({
      isAuthenticated: false
    });
    this.props.history.push("/login");
  };

  handleLogin = () => {
    this.setState({
      isAuthenticated: true
    });
  };

  render() {
    const { classes } = this.props;
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      handleLogin: this.handleLogin
    };
    return (
      !this.state.isAuthenticating && (
        <div className={classes.root}>
          <Nav
            isAuthenticated={this.state.isAuthenticated}
            onLogout={this.handleLogout}
          />
          <Routes childProps={childProps} />
        </div>
      )
    );
  }
}

export default withRouter(withStyles(styles)(App));
