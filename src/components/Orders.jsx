import React from "react";
import Order from "./Order";
import useAuth from "../hooks/useAuth";
const Orders = () => {
  const { orders } = useAuth();
  
  console.log(orders)

  if (orders) {
    let k = 1;

    return (
      <div>
        <p>Hi </p>
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
