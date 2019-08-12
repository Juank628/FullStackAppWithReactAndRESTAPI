import React from 'react'
import {Link} from 'react-router-dom'

export default function Forbidden() {
    return (
        <div className="grid-33">
            <h1>Forbiden</h1>
            <p>You dont have permission to access</p>
            <Link to={'/'}>Back to home</Link>
        </div>
    )
}
