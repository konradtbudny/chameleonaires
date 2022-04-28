import React from "react";
import useAuth from "../hooks/useAuth";
const Orders = () => {
  const { orders } = useAuth();

  return (
    <div>
      <p>Orders {orders.id}</p>
    </div>
  );
};
export default Orders;
