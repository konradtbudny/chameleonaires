import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe, getProducts } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [products, setProducts]=useState({})

  useEffect(() => {
    async function getUser() {
      const token=localStorage.getItem("token");
      if (token) {
        //check getMe parameter
        const newUser = await getMe(token);
        setUser(newUser);
        setToken(token);
        setIsLoggedIn(true)
      } 
    }
    getUser();
  }, [token]);
  useEffect(()=>{
    const fetchProducts=async ()=>{
      const importedProducts=await getProducts();
      console.log(importedProducts, "Authprovider")
      setProducts(importedProducts)
    }
    fetchProducts()
  },[])

  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,isLoggedIn,setIsLoggedIn,products}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
