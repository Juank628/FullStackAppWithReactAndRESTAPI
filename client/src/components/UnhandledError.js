import React from 'react'

export default function UnhandledError(props) {
    return (
        <div className="grid-33">
            <h1>Unhandled error</h1>
            <p>{props.location.state.error}</p>
        </div>
    )
}
