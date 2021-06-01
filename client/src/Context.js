import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Data from './Data';

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON('authenticatedUser') || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut
      },
    };
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

  //Calls getUser function from Data.js and passes along credentials of "emailAddress" and "password" to find the user in the database.
  //Returns user if user exists or an error if getUser does not find a matching user.
  //Successful calls result in user information being stored in cookies for 1 day before needing to be entered again.
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        user.emailAddress = emailAddress;
        user.password = password;
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove('authenticatedUser');
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
  }
}

