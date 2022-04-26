import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        const newUser = await getMe(localStorage.getItem("token"));
        setUser(newUser);
      } else {
        setUser({});
      }
    }
    getUser();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
