import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe, getOrderItem, getOrders, getProducts } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState({});

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const newUser = await getMe(localStorage.username);
        setUser(newUser);
        setToken(token);
        setIsLoggedIn(true);
      }
    }
    getUser();
  }, [token]);

  useEffect(() => {
    const fetchProducts = async () => {
      const importedProducts = await getProducts();
      setProducts(importedProducts);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user.id) {
        const importedOrders = await getOrders(user.id);
        console.log(importedOrders, "authprovider")
        console.log(Array.isArray(importedOrders))
        let detailsOfOrders=[];
        importedOrders.map(async (order)=>{
          const temp= await getOrderItem(order.id)
          //detailsOfOrders.push(temp)
          order.products=temp;
        })
        console.log(importedOrders.products,"adding orders")

        setOrders(detailsOfOrders[0]);
      }
    };
    fetchOrders();
  }, [user]);
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        isLoggedIn,
        setIsLoggedIn,
        products,
        orders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
