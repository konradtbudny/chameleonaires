import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getUser() {
      const token=localStorage.getItem("token");
      if (token) {
        //check getMe parameter
        const newUser = await getMe(token);
        setUser(newUser);
        setToken(token);
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
