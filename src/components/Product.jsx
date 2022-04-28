import React from "react";
const Product = ({product}) => {
//title, description,price,quantity,category,photo
  return (
    <div>
      <img style={{maxWidth:200, maxHeight:450}} src={product.photo}/>
      <h1>{product.title}</h1>
      <p>Category: {product.category}</p>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
      <p>Currently in stock: {product.price}</p>
    </div>
  );
};
export default Product;
