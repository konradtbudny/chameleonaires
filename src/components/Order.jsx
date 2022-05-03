import React, { useState, useEffect } from "react";
import { getOrderItem } from "../axios-services";
import useAuth from "../hooks/useAuth";
/* make a local state that holds info for products 
querry db for the products locally
put into state 
pull products from hook
search for specific products
*/
const Order = ({ singleOrder, orderNumber }) => {
  const [productList, setProductList] = useState([]);
  const { products } = useAuth();
  useEffect(() => {
    const gettingData = async () => {
      const data = await getOrderItem(singleOrder.id);
      data.map((orderDetails) => {
        const productDetails = products.filter(
          (product) => product.id === orderDetails.productId
        );
        orderDetails.name = productDetails[0].title;
        orderDetails.price = productDetails[0].price * orderDetails.quantity;
      });
      setProductList(data);
    };
    gettingData();
  },[products,singleOrder.id]);

  let k = 1;
  return (
    <table key={singleOrder._id}>
      <tbody>
        <tr>
          <th>order #{orderNumber}</th>
        </tr>
          {productList
            ? productList.map((singleProduct, i) => (
                  <tr key={i}>
                    <th>{k++})</th>
                    <th>Product name: {singleProduct.name}</th>
                    <th>Price: {singleProduct.price}</th>
                    <th>Quantity: {singleProduct.quantity}</th>
                  </tr>
  ))
            : null}
      </tbody>
    </table>
  );
};
export default Order;
