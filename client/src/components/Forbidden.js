import React from 'react'

export default Forbidden => {

    return(
        <div className="validation--errors">
            <h3>Forbidden</h3>
            <p>Only the course owner can modify/delete course data.</p>
            <a className="button" href="/">Back to safety!</a>
        </div>
    )
}