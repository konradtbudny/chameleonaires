import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
const CartItem = ({ singleProduct }) => {
  const { products } = useAuth();
  const singleProductPrice = products
    .filter((product) => product.id === singleProduct.productId)
    .map((product) => {
      return product.price;
    });
  let [quantity, setQuantity] = useState();
  let [price, setPrice] = useState();
  useEffect(() => {
    const settingData = async () => {
      setQuantity(singleProduct.quantity);
      setPrice(singleProduct.price);
    };
    settingData();
  }, [singleProduct]);
  let productNumber = 1;
  return (
    <div key={`single order item: ${productNumber++}`}>
      <h2>{singleProduct.name}</h2>
      <p>Price: {price}</p>
      <button
        onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity - 1);
            setPrice(singleProductPrice[0] * (quantity - 1));
          }
          let input = document.getElementById("quantity");
          input.value--;
        }}
      >
        -
      </button>
      <label id="quantity">{quantity}</label>
      <button
        onClick={() => {
          setQuantity(quantity + 1);
          setPrice(singleProductPrice[0] * (quantity + 1));
        }}
      >
        +
      </button>
    </div>
  );
};
export default CartItem;
