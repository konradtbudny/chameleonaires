import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({isLoggedIn}) => {
  return (
    <div>
      
       <Link to="/home">
        <button>Home</button>
        </Link>
        <Link to="/login">
        <button>Login</button>
        </Link>
        <Link to="/register">
        <button>Register</button>
        </Link>
        <Link to="/products">
        <button>Products</button>
        </Link>
      {isLoggedIn ? (
          <Link to="/orders">
            <button>My Orders</button>
          </Link>
        ) : null}
    </div>
  );
};
export default Navbar;
