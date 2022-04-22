import AuthContext from "../AuthContext";
import { useState, useEffect } from "react";
import {getUser} from "../../api/Users"

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function getUser() {
      if (localStorage.getItem("token")) {
        const newUser = await me(localStorage.getItem("token"));
        console.log(newUser);
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
