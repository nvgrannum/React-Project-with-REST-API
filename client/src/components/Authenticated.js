import React from 'react';

//Confirmation page that the user has successfully signed in with account email address.
export default ({ context  }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>{authUser.firstName} is authenticated!</h1>
      <p>Your authorized email is {authUser.emailAddress}.</p>

      <a className="button" href="/">Get Started</a>
    </div>
  </div>
  );
}