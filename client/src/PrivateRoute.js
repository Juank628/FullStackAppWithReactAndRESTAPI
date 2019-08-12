import React from "react";
import { Route, Redirect } from "react-router-dom";

export default props => {
  const { logedUser } = props.context.login;
  const {path, restrictId} = props;
  const Component = props.component;

  const urlId = restrictId ? props.match.params.id : undefined;

  const isLogged = Boolean(logedUser.Authorization);
  const hasPermision = logedUser.id === urlId || !restrictId;
  const allowAccess = isLogged && hasPermision;

  return (
    <Route
      path={path}
      render={() =>
        allowAccess ? (
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
