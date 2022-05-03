import { handle } from "express/lib/application";
import React,{useState,useEffect} from "react";
import { getOrderItem } from "../axios-services";
import useAuth from "../hooks/useAuth";
const Cart = () => {
  const {orders,products}=useAuth()
  const [orderProducts,setOrderProducts]=useState([])
console.log(orders,products)

  
useEffect(()=>{
  const gettingData=async ()=>{
      const activeOrder=await orders.filter((order)=>(order.active===true)).map(order=>order.id)
      console.log(activeOrder)
      const data =await getOrderItem(activeOrder)
      data.map((orderDetails)=>{
        const productDetails=
        products.filter(
          (product)=>product.id===orderDetails.productId);
        orderDetails.name=productDetails[0].title;
        orderDetails.price=productDetails[0].price
      })
      setOrderProducts(data)
    }
    gettingData()
  },[orders,products])
  console.log(orderProducts);
function handleDecrease(e, quantity){
  e.preventDefault();
  quantity--;
  alert(quantity)
}
  return (
    <div>
      <p>Cart</p>
      {orderProducts?(
        orderProducts.map((singleProduct,i)=>(
          <div>
          <p key={i}>{singleProduct.name}</p>
          <button onClick={()=>{if(singleProduct.quantity>0){singleProduct.quantity--};let input=document.getElementById('quantity');input.value--;alert(singleProduct.quantity)}}>-</button>
          <label id='quantity'>{singleProduct.quantity}</label>
          <button onClick={()=>{singleProduct.quantity++;alert(singleProduct.quantity)}}>+</button>
          </div>
        ))
      ):null}
    </div>
  );
};
export default Cart;
