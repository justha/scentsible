//Register form for new user
import React, { useRef } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'

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
                        props.history.push("/products") //redirects to home page
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
                    <Input inputRef={firstName} type="text" name="firstName" className="form-control" placeholder="First Name" />
                </fieldset>
                <fieldset>
                    <label htmlFor="lastName"></label>
                    <Input inputRef={lastName} type="text" name="lastName" className="form-control" placeholder="Last Name" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputEmail"></label>
                    <Input inputRef={email} type="email" name="email" className="form-control" placeholder="Email" required />
                </fieldset>

                <br></br>
                
                <fieldset>
                    <label htmlFor="userName"></label>
                    <Input inputRef={userName} type="text" name="userName" className="form-control" placeholder="Username" />
                </fieldset>
                <fieldset>
                    <label htmlFor="inputPassword"></label>
                    <Input inputRef={password} type="password" name="password" className="form-control" placeholder="Password" required />
                </fieldset>
                <fieldset>
                    <label htmlFor="verifyPassword"></label>
                    <Input inputRef={verifyPassword} type="password" name="verifyPassword" className="form-control" placeholder="Verify Password" required />
                </fieldset>

                <br></br>

                <fieldset>
                    <Button 
                        className="btn btn-1 btn-sep icon-send" 
                        type="submit"
                        size="normal"
                        color="primary"
                        variant="contained"
                    >
                        Create Account
                    </Button>
                </fieldset>

            </form>

            <br></br>

            <section className="link--register">
                <Link to="/login">Login</Link>
            </section>

        </main>
    )
}