import React, { Component } from "react";
const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
  }

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
      errors: [],
    }
  };

  signIn = (emailAddress, password) => {
    const encCredentials = "Basic " + btoa(`${emailAddress}:${password}`);
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: encCredentials
      }
    };
    fetch(`${this.state.baseUrl}/users`, options)
      .then(res => {
        if (res.status >= 200 && res.status <= 299) {
          res.json().then(user => {
            this.setState(prevState => ({
              ...prevState,
              login: {
                logedUser:{
                  ...user,
                  Authorization: encCredentials
                },
                errors: []
              }
            }));
          });
        } else if (res.status === 401) {
          res.json().then(data => {
            this.setState(prevState => ({
              ...prevState,
              login: {
                logedUser: prevState.login.logedUser,
                errors: data.errors
              }
            }))
          })
        }
      })
      .catch(err => console.log(err));
  };

  clearLoginErrors = () => {
    this.setState(prevState => ({
      ...prevState,
      login: {
        logedUser: prevState.login.logedUser,
        errors: []
      }
    }))
  }

  signOut = () => {
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
        errors: [],
      }
    }))
  }

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
