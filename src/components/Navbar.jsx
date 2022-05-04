import React from "react";
import { Link, useHistory } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  let history = useHistory();

  return (
    <div>
      {isLoggedIn ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            setIsLoggedIn(false);
            history.push("/");
          }}
        >
          Log out
        </button>
      ) : (
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
      {isLoggedIn ? (
        <Link to="/cart">
          <button>Cart</button>
        </Link>
      ) : null}
    </div>
  );
};
export default Navbar;
