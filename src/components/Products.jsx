import React,{ useState,useEffect } from "react";
import Product from "./Product";
import useAuth from "../hooks/useAuth";

const Products = () => {
  const { products,orders} = useAuth();
  const [activeOrder,setActiveOrder]=useState();

  useEffect(()=>{
    const getData=async ()=>{
      if(orders&&orders.length){
        const activeOrder=orders.filter((order)=>(order.active=== true))
        //const data=await getOrderItem(activeOrder[0].id)
        setActiveOrder(activeOrder)
      }
    }
    getData()
  },[orders])
  return (
    <div>
      {products && products.length
        ? products.map((product, i) => {
            return <Product product={product} activeOrder={activeOrder} key={i} />;
          })
        : null}
    </div>
  );
};
export default Products;
