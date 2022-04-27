import React from "react";
import { Link } from "react-router-dom";
const Navbar = ({ isLoggedIn,setIsLoggedIn }) => {
  return (
    <div>
      {isLoggedIn?(<Link to="/" onClick={()=>{localStorage.removeItem("token");setIsLoggedIn(false)}}><button>Log out</button></Link>):
      (
          <Link to="/login">
        <button>Log in</button>
        </Link>
      )}
      
      <Link to="/">
        <button>Home</button>
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
