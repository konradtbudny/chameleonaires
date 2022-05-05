import React from "react";
import { addOrderItem } from "../axios-services";
const Product = ({ product,activeOrder }) => {
  console.log(activeOrder,"activeOrder component")
  return (
    <div>
      <img
        style={{ maxWidth: 200, maxHeight: 450 }}
        src={product.photo}
        alt={`${product.title}`}
      />
      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Currently in stock: {product.quantity}</p>
      <button onClick={()=>{
        addOrderItem(activeOrder[0].id,product.id,product.price,1);
        
        
        alert("added")}}>Add to cart</button>
    </div>
  );
};
export default Product;
