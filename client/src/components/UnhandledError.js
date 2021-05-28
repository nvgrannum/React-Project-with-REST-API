import React from 'react'

export default UnhandledError => {

    return(
        <div>
            <h1>Oops!</h1>
            <p>We've run into an error!</p>
            <a className="button" href="/">Back to safety!</a>
        </div>
    )
}