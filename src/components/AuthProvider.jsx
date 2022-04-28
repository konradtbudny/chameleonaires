import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe, getOrders, getProducts } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  const [products, setProducts]=useState({})
  const [orders,setOrders]=useState({})

  useEffect(() => {
    async function getUser() {
      const token=localStorage.getItem("token");
      if (token) {
        //check getMe parameter
        console.log(localStorage.username)
        const newUser = await getMe(localStorage.username);
        console.log(newUser)
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
  useEffect(()=>{
    const fetchOrders=async ()=>{
      const importedOrders=await getOrders();
      setOrders(importedOrders.allOrders)
    }
    fetchOrders();
  },{})
console.log(typeof orders[1],"orders after useeffect")
  return (
    <AuthContext.Provider value={{ user, setUser, token, setToken,isLoggedIn,setIsLoggedIn,products,orders}}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
