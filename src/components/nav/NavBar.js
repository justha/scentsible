import React from "react"
import { Link, useHistory } from "react-router-dom"
import "./NavBar.css"


export const NavBar = (props) => {
    const history = useHistory()

    return (        
        <ul className="navbar" position="fixed-top">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/home">Home</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/products">Products</Link>
            </li>

            {/* <li className="navbar__item active">
                <Link className="navbar__link" to="/me">Me</Link>
            </li> */}

            <li className="navbar__item active">
                <Link 
                    className="navbar__link" 
                    to="/logout"
                    onClick={() => {
                        localStorage.clear()
                        history.push({ pathname: "/" })
                    }}
                >
                    Logout
                </Link>
            </li>
        </ul>
    )
}