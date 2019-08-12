import React, { Component } from "react";
import {Link, withRouter} from "react-router-dom"

class UserSignIn extends Component {
  state = {
    emailAddress: "",
    password: ""
  };

  /*update state when form inputs change*/
  inputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  /*
  try to sign in a user
  if success, redirect to home or to the previous screen
  */
  submitHandler = e => {
    e.preventDefault();
    const { emailAddress, password } = this.state;
    const { context } = this.props;
    const from = this.props.location.state || {from: {pathname: '/'}}
    context.actions.signIn(emailAddress, password)
    .then(loginSuccess => {
      if(loginSuccess){
        this.props.history.push(from.from.pathname)
      }
    });
  };

  /*clear all login errors when close the component*/
  componentWillUnmount() {
    this.props.context.actions.clearLoginErrors();
  }

  render() {
    const { emailAddress, password } = this.state;
    const { errors } = this.props.context.login;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          {errors
            ? errors.map((error, index) => (
                <small key={index} style={{ color: "red" }}>
                  {error}
                </small>
              ))
            : null}
          <div>
            <form onSubmit={this.submitHandler}>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  value={emailAddress}
                  onChange={this.inputChange}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  value={password}
                  onChange={this.inputChange}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign In
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => this.props.history.push("/")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Don't have a user account? <Link to={"/signup"}>Click here</Link> to
            sign up!
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserSignIn);
