import React,{ useState,useEffect } from "react";
import { addOrderItem,getOrderItem } from "../axios-services";
const Product = ({ product,activeOrder }) => {
  const [cartProducts,setCartProducts]=useState()
  useEffect(()=>{
    if(activeOrder&&activeOrder.length){
    const loadCartOrders=async ()=>{
    const temp = await getOrderItem(activeOrder[0].id);
    setCartProducts(temp)
  }
  loadCartOrders();
}
console.log(cartProducts,"cart")
},[activeOrder]
  )
  console.log ()
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
        const check=cartProducts.filter((cartProduct)=>(cartProduct.productId===product.id)).map((product)=>{return true})
        console.log(check[0])
        if(!check[0]){
        addOrderItem(activeOrder[0].id,product.id,product.price,1);
        alert("added")
        }
        else{
          alert("Product is already in the cart")
        }
        
        }}>Add to cart</button>
    </div>
  );
};
export default Product;
