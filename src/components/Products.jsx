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
      <img src="https://i.pinimg.com/originals/40/74/60/407460925c9e419d82b93313f0b42f71.jpg" />
    </div>
  );
};
export default Products;
