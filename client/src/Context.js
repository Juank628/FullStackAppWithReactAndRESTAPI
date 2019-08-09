import React, { Component } from "react";
const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
  }

  state = {
    baseUrl: "http://localhost:5000/api",
    logedUser: {
        userName: "jsanchez_zunino@yahoo.com",
        password: "1234"
    }
  };

  getAuth = () => {
    return "Basic " + btoa(`jsanchez_zunino@yahoo.com:1234`)
  }

  render() {
    const value = {
      ...this.state,
      actions: {
          getAuth: this.getAuth
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
