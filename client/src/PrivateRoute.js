import React from "react";
import { Route, Redirect } from "react-router-dom";

export default props => {
  const { logedUser } = props.context.login;
  const { path } = props;
  const Component = props.component;

  const isLogged = Boolean(logedUser.Authorization);

  return (
    <Route
      path={path}
      render={() =>
        isLogged ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};
