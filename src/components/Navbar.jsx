import React from 'react'
import './css/Navbar.css'
import {Link} from 'react-router-dom'


function Navbar(props) {
    const {handleSettings, isLogged, handleLogout} = props

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
                {!isLogged ? (
                    <li>
                        <Link to="/users/login"><button><i class="fas fa-cog"></i> Login</button></Link>
                    </li>
                ): (
                    <li>
                        <button onClick={handleLogout}><i class="fas fa-sign-out-alt"></i> Logout</button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default Navbar
