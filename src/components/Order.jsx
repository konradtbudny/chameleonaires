import React from "react";
const Order = ({ order }) => {
  return (
      <table>
          <tbody>
    <tr>
        <th>{order.productId}</th>
        <th>{order.price}</th>
        <th>{order.quantity}</th>
      
        </tr>
        </tbody>
        </table>
  );
};
export default Order;
