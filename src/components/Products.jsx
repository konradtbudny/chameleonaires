import React from "react";
import Product from "./Product";
const Products = ({ products }) => {
  return (
    <div>
      {products && products.length
        ? products.map((product, i) => {
            return <Product product={product} key={i} />;
          })
        : null}
    </div>
  );
};
export default Products;
