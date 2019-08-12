import React from 'react'
import {Link} from 'react-router-dom'

export default function NotFound() {
    return (
        <div className="grid-33">
            <h1>Page not found</h1>
            <Link to={'/'}>Back to home</Link>
        </div>
    )
}
