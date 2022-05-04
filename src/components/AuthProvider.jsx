import AuthContext from "./AuthContext";
import React, { useState, useEffect } from "react";
import { getMe, getOrderItem, getOrders, getProducts } from "../axios-services";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function getUser() {
      const localToken = localStorage.getItem("token");
      if (localToken) {
        const newUser = await getMe(localStorage.username);
        setUser(newUser);
        setToken(localToken);
        setIsLoggedIn(true);
      } else {
        setUser({});
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
        if(importedOrders&&importedOrders.length){
          importedOrders.map(async (order) => {
            const temp = await getOrderItem(order.id);
            order.products=temp
          });
          
          setOrders(importedOrders);
        }
      }
    };
    fetchOrders();
  }, [token, isLoggedIn, user]);
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
