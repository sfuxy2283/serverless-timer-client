import React from "react";

import { Route, Switch } from "react-router-dom";

import AppliedRoute from "./components/AppliedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

import Home from "./features/Home/HomeContainer";
import Login from "./features/Login/LoginContainer";
import Signup from "./features/Signup/SignupContainer";
import Guest from "./features/Guest/Guest";
import NotFound from "./features/NotFound";
export default ({ childProps }) => (
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
    <UnauthenticatedRoute
      path="/login"
      exact
      component={Login}
      props={childProps}
    />
    <UnauthenticatedRoute
      path="/signup"
      exact
      component={Signup}
      props={childProps}
    />
    <Route path="/guest" exact component={Guest} />
    <Route component={NotFound} />
  </Switch>
);
