import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class UserSignUp extends Component {
  state = {
    firstName: "",
    lastName: "",
    emailAddress: "",
    password: "",
    confirmPassword: "",
    errors: []
  };

  inputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  createUser = e => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword
    } = this.state;
    const { context } = this.props;
    const options = {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        emailAddress,
        password
      }),
      headers: {
        "Content-Type": "application/json"
      }
    };
    if (password === confirmPassword) {
      fetch(`${context.baseUrl}/users`, options)
        .then(res => {
          if (res.status >= 200 && res.status <= 299) {
            context.actions.signIn(emailAddress, password);
            this.props.history.push("/");
          } else if (res.status === 400) {
            res.json().then(data => {
              this.setState({ errors: data.errors });
            });
          }
        })
        .catch(err => {
          this.props.history.push({
            pathname: "/error",
            state: { error: err.message }
          });
        });
    } else {
      this.setState({ errors: ["please check the password confirmation"] });
    }
  };

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      confirmPassword,
      errors
    } = this.state;
    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          {errors.length ? (
            <div>
              <h2 className="validation--errors--label">Validation errors</h2>
              <div className="validation-errors">
                <ul>
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null}
          <div>
            <form onSubmit={this.createUser}>
              <div>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  className=""
                  placeholder="First Name"
                  onChange={this.inputChange}
                  value={firstName}
                />
              </div>
              <div>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  className=""
                  placeholder="Last Name"
                  onChange={this.inputChange}
                  value={lastName}
                />
              </div>
              <div>
                <input
                  id="emailAddress"
                  name="emailAddress"
                  type="text"
                  className=""
                  placeholder="Email Address"
                  onChange={this.inputChange}
                  value={emailAddress}
                />
              </div>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  className=""
                  placeholder="Password"
                  onChange={this.inputChange}
                  value={password}
                />
              </div>
              <div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  className=""
                  placeholder="Confirm Password"
                  onChange={this.inputChange}
                  value={confirmPassword}
                />
              </div>
              <div className="grid-100 pad-bottom">
                <button className="button" type="submit">
                  Sign Up
                </button>
                <button
                  className="button button-secondary"
                  type="button"
                  onClick={() => this.props.history.push("/signin")}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <p>&nbsp;</p>
          <p>
            Already have a user account? <Link to={"/signin"}>Click here</Link>
            to sign in!
          </p>
        </div>
      </div>
    );
  }
}
