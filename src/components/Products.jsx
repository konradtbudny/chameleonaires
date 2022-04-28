import React from "react";
import Product from "./Product";
const Products = ({products}) => {
console.log(products, "frontend")

  return (
    <div>
      {products&&products.length?products.map((product,i)=>{
        console.log(product,"21321321Products")
        return(
          <Product product={product} key={i}/>
        )
      }):null}
    </div>
  );
};
export default Products;
