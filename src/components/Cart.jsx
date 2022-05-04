import React, { useState, useEffect } from "react";
import { getOrderItem } from "../axios-services";
import useAuth from "../hooks/useAuth";
import CartItem from "./CartItem";
const Cart = () => {
  const { orders, products } = useAuth();
  const [orderProducts, setOrderProducts] = useState([]);

  useEffect(() => {
    const gettingData = async () => {
      if (orders && orders.length) {
        const activeOrder = await orders
          .filter((order) => order.active === true)
          .map((order) => order.id);
        const data = await getOrderItem(activeOrder);
        data.map((orderDetails) => {
          const productDetails = products.filter(
            (product) => product.id === orderDetails.productId
          );
          orderDetails.name = productDetails[0].title;
          orderDetails.price = productDetails[0].price;
        });
        setOrderProducts(data);
      }
    };
    gettingData();
  }, [orders]);

  return (
    <div>
      <h1>Cart</h1>
      {orderProducts
        ? orderProducts.map((singleProduct, i) => {
            return (
              <CartItem key={`Cart item: ${i}`} singleProduct={singleProduct} />
            );
          })
        : null}
      <button> save</button>
    </div>
  );
};
export default Cart;
