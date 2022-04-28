import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../axios-services";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  let history = useHistory();
  const { setIsLoggedIn } = useAuth();

  return (
    <div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await registerUser(username, password, email);
          setIsLoggedIn(true);
          history.push("/");
          alert("registered");
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
        <input
          type="text"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <button type="submit"> REGISTER</button>
      </form>
    </div>
  );
};

export default Register;
