import { useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../axios-services";

const Login = ({  setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();
  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await loginUser(username, password);
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", username);
          setIsLoggedIn(true);
          history.push("/");
        }}
      >
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button type="submit"> LOGIN</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
};

export default Login;
