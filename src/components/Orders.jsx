import React from "react";
import Order from "./Order";
import useAuth from "../hooks/useAuth";
const Orders = () => {
  const { orders } = useAuth();
    console.log(orders[0]);
    if(orders[0]){
    console.log(orders[0].id)

  return (
    <div>
      <p>Hi {orders[0].id}</p>
      {orders.map((order)=>{
        return <Order order={order}/>
      })}
    </div>
  );
};
return <div></div>}
export default Orders;
