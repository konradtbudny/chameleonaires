import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({isLoggedIn}) => {
  return (
    <div>
      
       <Link to="/home"></Link>
        <button>Home</button>
     
        <Link to="/login"></Link>
        <button>Login</button>
      
        <Link to="/register"></Link>
        <button>Register</button>
      
        <Link to="/products"></Link>
        <button>Products</button>
      
      {isLoggedIn ? (
          <Link to="/orders">
            <button>My Orders</button>
          </Link>
        ) : null}
    </div>
  );
};
export default Navbar;
