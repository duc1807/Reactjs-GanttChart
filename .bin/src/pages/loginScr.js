import React, { useState } from "react";
import "../styles/Login.css";

const LoginScr = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (username == "root" && password == "root") {
      window.location.href = `/home/${username}`;
    } else if (username === "staff" && password === "staff")
      window.location.href = `/home/${username}`;
    else window.location.reload();
  };

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
    }
  };

  return (
    <div className="container">
      <h1 id="titleText">Manage tasks with the gantt chart</h1>
      <form autoComplete="off" id="loginForm" onSubmit={handleLogin}>
        <span>
          <label for="username">Username: </label>
          <input
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
            placeholder={"Password"}
            value={password}
            onChange={(e) => handleChange("password", e)}
            type="password"
            name="password"
          />
        </span>
        <button onClick={handleLogin}>Login</button>
      </form>
      <br></br>
      <br></br>
    </div>
  );
};

export default LoginScr;
