import React, { Component } from "react";
import Cookies from "js-cookie";
const Context = React.createContext();

export class Provider extends Component {
  state = {
    baseUrl: "http://localhost:5000/api",
    login: {
      logedUser: {
        id: "",
        emailAddress: "",
        firtName: "",
        lastName: "",
        Authorization: null
      },
      errors: []
    }
  };

  componentDidMount() {
    if (Cookies.getJSON("Auth")) {
      this.setState(prevState => ({
        ...prevState,
        login: {
          logedUser: Cookies.getJSON("Auth"),
          errors: []
        }
      }));
    }
  }

  signIn = async (emailAddress, password) => {
    let loginSuccess = false;
    let data = {};
    const encCredentials = "Basic " + btoa(`${emailAddress}:${password}`);
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: encCredentials
      }
    };

    await fetch(`${this.state.baseUrl}/users`, options)
      .then(res => {
        data = res;
        if (res.status >= 200 && res.status <= 299) {
          loginSuccess = true;
        } else if (res.status === 401) {
          loginSuccess = false;
        }
      })
      .catch(err => {
        this.props.history.push({
          pathname: "/error",
          state: { error: err.message }
        });
      });

    await data.json().then(user => {
      if (loginSuccess) {
        Cookies.set(
          "Auth",
          { ...user, Authorization: encCredentials },
          { expires: 1 }
        );
        this.setState(prevState => ({
          ...prevState,
          login: {
            logedUser: {
              ...user,
              Authorization: encCredentials
            },
            errors: []
          }
        }));
      } else {
        this.setState(prevState => ({
          ...prevState,
          login: {
            logedUser: prevState.login.logedUser,
            errors: user.errors
          }
        }));
      }
    });
    return loginSuccess;
  };

  clearLoginErrors = () => {
    this.setState(prevState => ({
      ...prevState,
      login: {
        logedUser: prevState.login.logedUser,
        errors: []
      }
    }));
  };

  signOut = () => {
    Cookies.remove("Auth");
    this.setState(prevState => ({
      ...prevState,
      login: {
        logedUser: {
          id: "",
          emailAddress: "",
          firtName: "",
          lastName: "",
          Authorization: null
        },
        errors: []
      }
    }));
  };

  render() {
    const value = {
      ...this.state,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        clearLoginErrors: this.clearLoginErrors
      }
    };

    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
