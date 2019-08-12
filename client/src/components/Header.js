import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  const { logedUser } = props.context.login;

  return (
    <div className="header">
      <div className="bounds">
        <h1 className="header--logo">Courses</h1>
        {logedUser.Authorization ? (
          <nav>
            <span>
              Welcome {logedUser.firstName} {logedUser.lastName}!
            </span>
            <Link
              className="signout"
              to={"/signout"}
            >
              Sign Out
            </Link>
          </nav>
        ) : (
          <nav>
            <Link className="signin" to={"/signin"}>
              Sign In
            </Link>
          </nav>
        )}
      </div>
    </div>
  );
}
