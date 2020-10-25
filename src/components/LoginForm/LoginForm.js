import React from "react";
import "./loginForm.scss";

const LoginForm = (props) => {
  // Destructuring constant variables from props
  const { username, password } = props;
  const { handleChange, handleLogin } = props;
  return (
    <form autoComplete="off" id="loginForm" onSubmit={handleLogin}>
      <span>
        <label for="username">Username: </label>
        <input
          id="input"
          required
          placeholder={"Username"}
          value={username}
          onChange={(e) => handleChange("username", e)}
          type="text"
          name="username"
        />
      </span>
      <span>
        <label for="password">Password: </label>
        <input
          id="input"
          required
          placeholder={"Password"}
          value={password}
          onChange={(e) => handleChange("password", e)}
          type="password"
          name="password"
        />
      </span>
      <button type="submit" id="loginBtn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
