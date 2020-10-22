import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../styles/Login.scss";
//@ts-ignore
import LoginForm from "../components/LoginForm/LoginForm";

const LoginScr = () => {
  // Using useHistory to routing pages
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // When user submit, authenticate user and then redirect to home page if valid
  const handleLogin = (e) => {
    e.preventDefault();

    // If the user is authenticated, redirect to the homepage
    if (
      (username === "root" && password === "root") ||
      (username === "staff" && password === "staff")
    ) {
      history.push(`/gantt-chart/${username}`);
    } else window.location.reload();
  };

  // setState for username || password when the input changed
  const handleChange = (key, value) => {
    switch (key) {
      case "username":
        setUsername(value.target.value);
        console.log("Username: ", username);
        break;
      case "password":
        setPassword(value.target.value);
        console.log("Password :", password);
        break;
      default:
        break;
    }
  };

  return (
    <div className="container">
      {/* <form autoComplete="off" id="loginForm" onSubmit={handleLogin}>
        <span>
          <label for="username">Username: </label>
          <input
            required
            placeholder={"Username"}
            value={username}
            onChange={(e) => handleChange("username", e)}
            type="text"
            name="username"
            value={username}
          />
        </span>
        <span>
          <label for="password">Password: </label>
          <input
            required
            placeholder={"Password"}
            value={password}
            onChange={(e) => handleChange("password", e)}
            type="password"
            name="password"
          />
        </span>
        <button type="submit" id="loginBtn">Login</button>
      </form> */}
      <LoginForm
        handleLogin={handleLogin}
        handleChange={handleChange}
        username={username}
        password={password}
      ></LoginForm>
    </div>
  );
};

export default LoginScr;
