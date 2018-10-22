import React from "react";
import { Route, Redirect } from "react-router-dom";

export default ({ component: C, props: propsForComponent, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        !propsForComponent.isAuthenticated ? (
          <C {...props} {...propsForComponent} />
        ) : (
          <Redirect to={"/"} />
        )
      }
    />
  );
};
