import React from "react";

import { Link,useHistory } from "react-router-dom";
const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
  let history = useHistory();

  return (
    <div>
      {isLoggedIn ? (
        <button
          onClick={() => {
            localStorage.removeItem("token");
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
      {isLoggedIn?(
        <Link to="/cart">
          <button>Cart</button>
        </Link>
      ):null}
    </div>
  );
};
export default Navbar;
