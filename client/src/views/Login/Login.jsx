import Axios from "axios";
import React, { useState } from "react";
import "./Login.css";

// const SERVER = 'https://passwordmanager-l5wn.onrender.com/login';
const SERVER = "https://safe-pass-backend.vercel.app/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  Axios.defaults.withCredentials = true;

  const handleClick = () => {
    Axios.post(SERVER, {
      email: email,
      password: password,
    })
      .then((response) => {
        if (response.status === 200) {
          setErrorMsg("");
          window.location.href = "/#/home";
        } else {
          setErrorMsg("Email or Password is incorrect.");
        }
      })
      .catch(() => setErrorMsg("Email or Password is incorrect."));
  };

  return (
    <div className="login-container">
      <div className="login-wraper">
        <h1>Login</h1>
        <label for="login-email">Email</label>
        <input
          type="text"
          id="login-email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="login-pass">Password</label>
        <input
          type="password"
          id="login-pass"
          onChange={(e) => setPassword(e.target.value)}
        />
        <p
          style={{
            color: "red",
            fontSize: "0.824rem",
            margin: "auto",
            marginTop: 0,
          }}
        >
          {errorMsg}
        </p>
        <div className="button-wraper">
          <button type="button" onClick={handleClick}>
            Login
          </button>
          <p>OR</p>
          <button
            type="button"
            onClick={() => {
              window.location.href = "/#/register";
            }}
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
