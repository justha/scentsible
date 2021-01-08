import React from "react"
import { useHistory } from "react-router-dom"
import "./Auth.css"


export const Logout = (props) => {
    const history = useHistory()
    
    localStorage.removeItem("scentsible_user_id")
    history.push({ pathname: "/" })
}