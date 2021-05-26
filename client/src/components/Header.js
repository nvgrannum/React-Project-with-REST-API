import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="wrap header">
        <div className="header--flex">
          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            {authUser ? (
              <React.Fragment className="header--signedin">
                <span>Welcome, {authUser.name}!</span>
                <Link to="/signout">Sign Out</Link>
              </React.Fragment>
            ) : (
              <React.Fragment className="header--signedout">
                <Link className="wrap header--flex" to="/signup">Sign Up</Link>
                <Link className="wrap header--flex" to="/signin">Sign In</Link>
              </React.Fragment>
            )}
          </nav>
        </div>
      </div>
    );
  }
};
