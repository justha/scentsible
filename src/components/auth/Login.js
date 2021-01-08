//login page
import React, { useRef, useState } from "react"
import { Link } from "react-router-dom"
import "./Auth.css"


export const Login = (props) => {
  const user = useRef();
  const password = useRef();

  const [show, setShow] = useState();
  const [showUser, setShowUser] = useState();

  // see if user already exists
  const existingUserCheck = () => {
    return fetch(`http://localhost:8000/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: user.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((user) => {
        return user !== undefined ? user : false;
      });
  };

  const handleLogin = (e) => {
    console.log(user.current.value, password.current.value);
    e.preventDefault();
    existingUserCheck().then((exists) => {
      if (exists.valid) {
        localStorage.setItem("scentsible_user_id", exists.token);
        props.history.push("/home");
      } else if (exists.valid != true) {
        setShow(true);
      } else if (!exists) {
        setShowUser(true);
      }
    });
  };

  return (
    <div direction="column" animation="fadeIn">
      <div className="container--login">
        {showUser && (
          <dialog>
            <h1>User does not exist</h1>
            <button
              label="Close"
              className="button--close"
              onClick={() => setShowUser(false)}
            />
          </dialog>
        )}
        {show && (
          <dialog>
            <h1>Password does not match</h1>
            <button
              className="button--close"
              label="Close"
              primary
              onClick={() => setShow(false)}
            />
          </dialog>
        )}
      </div>


      <div direction="column" alignSelf="center">
        <h1>scentsible</h1>
        {/* <h1>Sign In</h1> */}
        
        <form className="form--login" onSubmit={handleLogin}>
          <fieldset label="Email address" htmlFor="inputEmail">
            <input
              ref={user}
              type="text"
              id="username"
              placeholder="Username"
              required
            />
          </fieldset>

          <fieldset label="Password" htmlFor="inputPassword">
            <input
              ref={password}
              type="password"
              id="password"
              placeholder="Password"
              required
            />
          </fieldset>

          <fieldset>
            <div align="center" pad="medium">
              <button
                size="large"
                label="sign in"
                fill={false}
                margin="small"
                pad="small"
                primary
                type="submit"
              >Log In</button>
            </div>
          </fieldset>
          
        </form>

      </div>


      <div className="link--register">
        <Link
          as={Link}
          to="/register"
          title="register"
          href="/register"
          margin="small"
          justify="center"
        >
          Register
        </Link>
      </div>
      
    </div>
  )
}