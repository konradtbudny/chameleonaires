import React, {useState, useEffect} from "react";
import {Switch, Route} from "react-router-dom";

import {getAPIHealth} from "../axios-services";
import "../style/App.css";
import Home from "./Home";
import Navbar from "./Navbar";
import Login from "./Login"
import Products from "./Products"
import Register from "./Register"
import Orders from "./Orders";
import View from "./View"

import useAuth from '../hooks/useAuth'
import Cart from "./Cart";

const App = () => {
    const {isLoggedIn, setIsLoggedIn} = useAuth()
    const [APIHealth, setAPIHealth] = useState("");

    useEffect(() => {
        const getAPIStatus = async () => {
            const {healthy} = await getAPIHealth();
            setAPIHealth(healthy ? "api is up! :D" : "api is down :/");
        };

        getAPIStatus();
    }, []);
    return (<div className="app-container">
        <Navbar isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}/>
        <Switch>
            <Route exact path="/">
                <Home APIHealth={APIHealth}/>
            </Route>
            <Route exact path='/login'>
                <Login/>
            </Route>
            <Route exact path='/home'>
                <Home/>
            </Route>
            <Route exact path='/products'>
                <Products/>
            </Route>
            <Route exact path='/register'>
                <Register/>
            </Route>
            <Route exact path='/orders'>
                <Orders/>
            </Route>
            <Route exact path='/Cart'>
                <Cart/>
            </Route>
            <Route path='/products/:id'>
                <View/>
            </Route>
        </Switch>
    </div>);
};

export default App;
