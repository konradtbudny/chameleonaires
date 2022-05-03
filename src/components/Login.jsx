import { useHistory, Link } from "react-router-dom";
import React, { useState } from "react";
import { loginUser } from "../axios-services";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const { setIsLoggedIn, setToken } = useAuth();
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
          setToken(result.token);
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
          type="password"
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
