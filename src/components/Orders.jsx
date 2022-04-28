import React from "react";
import useAuth from '../hooks/useAuth'
const Orders = () => {
const {orders}=useAuth();



  console.log(orders,"front end")
  return (
    <div>

      <p>Orders</p>
    </div>
  );
};
export default Orders;
