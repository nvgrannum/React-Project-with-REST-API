import React from 'react'

export default UnhandledError => {

    return(
        <div className="validation--errors">
            <h3>Oops!</h3>
            <p>We've run into an error!</p>
            <a className="button" href="/">Back to safety!</a>
        </div>
    )
}