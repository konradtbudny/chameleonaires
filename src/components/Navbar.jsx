import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({isLoggedIn}) => {
  return (
    <div>
      <div>
        <h1>Chameleonaires</h1>
      </div>
      <li>
        <Link to="/home"></Link>
        <button>Home</button>
      </li>
      <li>
        <Link to="/login"></Link>
        <button>Login</button>
      </li>
      <li>
        <Link to="/register"></Link>
        <button>Register</button>
      </li>
      <li>
        <Link to="/products"></Link>
        <button>Products</button>
      </li>
      {isLoggedIn ? (
          <Link to="/orders">
            <button>My Orders</button>
          </Link>
        ) : null}
    </div>
  );
};
export default Navbar;
