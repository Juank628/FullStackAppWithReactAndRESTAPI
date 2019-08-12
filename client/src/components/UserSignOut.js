import React from "react";
import { Redirect } from "react-router-dom";

export default function UserSignOut(props) {
  props.context.actions.signOut();

  return <Redirect to={"/signin"} />;
}
