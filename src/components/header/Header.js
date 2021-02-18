import React from "react"
import { useHistory } from "react-router-dom"
import "./Header.css"


export const Header = () => {
    const history = useHistory()

    return (
        <section>
            <a className="homeAnchor" href="" onClick={() => {history.push({ pathname: `/home`})}}>                
                <div className="header"><b>🦨 scentsible</b></div>
            </a>
        </section>
    )
}