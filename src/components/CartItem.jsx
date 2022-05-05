import React, { useState } from "react";
import { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { updateOrderItem, deleteOrderItem } from "../axios-services";

const CartItem = ({ singleProduct, setOrderProducts, orderProducts }) => {
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
  let maxQuantityToBuy=products.filter((product)=>(product.id===singleProduct.productId)).map((product)=>{return product.quantity})
  return (
    <div key={`single order item: ${productNumber++}`}>
      <h2>{singleProduct.name}</h2>
      <p>Price: {price}</p>
      <button
        onClick={() => {
          if (quantity > 0) {
            setQuantity(quantity - 1);
            setPrice(singleProductPrice[0] * (quantity - 1));
            updateOrderItem(
              singleProduct.id,
              singleProductPrice[0] * (quantity - 1),
              quantity - 1
            );
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
          if(quantity<maxQuantityToBuy[0]){
            setQuantity(quantity + 1);
          setPrice(singleProductPrice[0] * (quantity + 1));
          updateOrderItem(
            singleProduct.id,
            singleProductPrice[0] * (quantity + 1),
            quantity + 1
          )
          }
          else{
            alert("Max item reached. No more at stock")
          }
          
        }
      }
      >
        +
      </button>
      <p></p>
      <button
        onClick={() => {
          deleteOrderItem(singleProduct.id);

          const filteredCart = orderProducts.filter((product) => {
            if (singleProduct.id !== product.id) {
              return true;
            } else {
              return false;
            }
          })
          setOrderProducts(filteredCart)
        }}
      >
        Delete item from cart
      </button>
    </div>
  );
};
export default CartItem;
