import React, { useState, useEffect } from "react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
// getAPIHealth is defined in our axios-services directory index.js
// you can think of that directory as a collection of api adapters
// where each adapter fetches specific info from our express server's /api route
import { getAPIHealth } from "../axios-services";
import "../style/App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login"
import Products from "./Products"
import Register from "./Register"
import Orders from "./Orders";

import useAuth from '../hooks/useAuth'

const App = () => {
  const {user,isLoggedIn,setIsLoggedIn,products,orders}=useAuth()
  const [APIHealth, setAPIHealth] = useState("");

  useEffect(() => {
    // follow this pattern inside your useEffect calls:
    // first, create an async function that will wrap your axios service adapter
    // invoke the adapter, await the response, and set the data
    const getAPIStatus = async () => {
      const { healthy } = await getAPIHealth();
      setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
    };

    // second, after you've defined your getter above
    // invoke it immediately after its declaration, inside the useEffect callback
    getAPIStatus();
  }, []);
console.log(orders, "App")
  return (
    <div className="app-container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
      <Switch>
        <Route exact path="/">
          <Home APIHealth={APIHealth} />
        </Route>
        <Route exact path='/login'>
          <Login setIsLoggedIn={setIsLoggedIn}/>
        </Route>
        <Route exact path='/home'>
          <Home/>
        </Route>
        <Route exact path='/products'>
          <Products products={products}/>
        </Route>
        <Route exact path='/register'>
          <Register setIsLoggedIn={setIsLoggedIn}/>
        </Route>
        <Route exact path='/orders'>
          <Orders orders={orders} user={user}/>
        </Route>
      </Switch>
    </div>
  );
};

export default App;
