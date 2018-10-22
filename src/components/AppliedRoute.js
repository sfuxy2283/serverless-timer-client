import React from "react";
import { Route } from "react-router-dom";

export default ({ component: C, props: propsForComponent, ...rest }) => (
  <Route {...rest} render={props => <C {...props} {...propsForComponent} />} />
);
