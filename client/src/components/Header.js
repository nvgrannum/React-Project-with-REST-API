import React from 'react';
import { Link } from 'react-router-dom';


//Header displayed on every page. Changes based on whether there is an authorized user already signed in
export default class Header extends React.PureComponent {
  render() {
    const { context } = this.props;
    const authUser = context.authenticatedUser;
    return (
      <div className="wrap header header--flex">

          <h1 className="header--logo"><a href="/">Courses</a></h1>
          <nav>
            {authUser ? (
              <div className="header--signedin">
                <React.Fragment >
                  <li><span>Welcome, {authUser.firstName}!</span></li>
                  <li><Link to="/signout">Sign Out</Link></li>
                </React.Fragment>
              </div>
            ) : (
              <div className="header--signedout">
                <React.Fragment >
                  <li><Link className="wrap header--flex" to="/signup">Sign Up</Link></li>
                  <li><Link className="wrap header--flex" to="/signin">Sign In</Link></li>
                </React.Fragment>
              </div>
            )}
          </nav>
        </div>
    );
  }
};
