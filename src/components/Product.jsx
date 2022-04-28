import React from "react";
const Product = (product) => {
  console.log(product.product.title,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
  return (
    <div>
      <h1>{product.product.title}</h1>
    </div>
  );
};
export default Product;
