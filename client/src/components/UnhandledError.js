import React from 'react'
import {Link} from 'react-router-dom'

export default function UnhandledError(props) {
    return (
        <div className="grid-33">
            <h1>Unhandled error</h1>
            <p>{props.location.state.error}</p>
            <Link to={'/'}>Back to home</Link>
        </div>
    )
}
