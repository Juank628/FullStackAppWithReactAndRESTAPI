import React from 'react'

export default function Header() {
    return (
        <div className="header">
            <div className="bounds">
                <h1 className="header--logo">Courses</h1>
                <nav><span>Welcome Joe Smith!</span><a className="signout" href="index.html">Sign Out</a></nav>
            </div>
        </div>
    )
}
