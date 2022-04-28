import React from "react";
import Product from "./Product";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const { products } = useAuth();
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
