import React from 'react'
import './Navbar.css'

function Navbar(props) {
    const {handleSettings} = props
    return (
        <div className="navbar">
            <div className="logo">
                <i class="fas fa-hourglass-half logo-icon"></i>
                <h1>TimeToFocus</h1>
            </div>
            <ul className="links">
                <li>
                    <button onClick={() => handleSettings()}><i class="fas fa-cog"></i> Setting</button>
                </li>
                <li>
                    <button><i class="fas fa-user-circle"></i> Login</button>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
