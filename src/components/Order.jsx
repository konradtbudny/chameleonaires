import React from "react";
const Order = ({ singleOrder, orderNumber }) => {
  return (
    <table key={singleOrder._id}>
      <tbody>
        <tr>
          <th>order #{orderNumber}</th>
          
          {/* <th>{singleOrder.products.price}</th> */}
        </tr>
      </tbody>
    </table>
  );
};
export default Order;
