import React from "react";
const Orders = ({orders,user}) => {
  console.log(orders[0],"!!!!!!!!!!!!!!!!!!!!!?????????????????????AAAAAAAAAAAAAAAAAAAAA")
  console.log(user)
  return (
    <div>

      <p>Orders {orders[0].id}</p>
    </div>
  );
};
export default Orders;
