import React from "react";
import Order from "./Order";
import useAuth from "../hooks/useAuth";
const Orders = () => {
  const { orders } = useAuth();

  if (orders) {
    let k = 1;

    return (
      <div>
        <h1>My orders</h1>
        {orders && orders.length
          ? orders.map((singleOrder, i) => {
              return (
                <Order
                  singleOrder={singleOrder}
                  orderNumber={k++}
                  key={`orders map:${i}`}
                />
              );
            })
          : null}
      </div>
    );
  }
  return <div></div>;
};
export default Orders;
