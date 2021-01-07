//Register form for new user
import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"

export const Register = (props) => {
    const firstName = useRef()
    const lastName = useRef()
    const userName = useRef()
    const email = useRef()
    const password = useRef()
    const verifyPassword = useRef()
    const passwordDialog = useRef()

    const handleRegister = (e) => {
        e.preventDefault()
        if (password.current.value === verifyPassword.current.value) {
            const newUser = {
                "first_name": firstName.current.value,
                "last_name": lastName.current.value,
                "username": userName.current.value,
                "email" : email.current.value,
                "password": password.current.value,
            }
            return fetch("http://localhost:8000/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(newUser) //adds new user to the db
            })
                .then(res => res.json())
                .then(res => {
                        localStorage.setItem("scentsible_user_id", res.token)
                        props.history.push("/home") //redirects to home page
                })
        } else {
            passwordDialog.current.showModal()
        }
    }

    return (
        <main style={{ textAlign: "center" }}>

            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div>Passwords do not match</div>
                <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
            </dialog>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">Register an account</h1>
                <fieldset>
                    <label htmlFor="firstName"></label>
                    <input ref={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"></label>
                    <input ref={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"></label>
                    <input ref={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </fieldset>

                <br></br>
                
                <fieldset>
                    <label htmlFor="userName"></label>
                    <input ref={userName} type="text" name="userName" className="form-control" placeholder="Username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"></label>
                    <input ref={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"></label>
                    <input ref={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify Password" required />
                </fieldset>

                <br></br>

                <fieldset>
                    <button className="btn btn-1 btn-sep icon-send" type="submit">Create Account</button>
                </fieldset>

            </form>

            <br></br>

            <section className="link--register">
                <Link to="/login">Login</Link>
            </section>

        </main>
    )
}