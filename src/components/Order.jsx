import React,{useState,useEffect} from "react";
import { getOrderItem } from "../axios-services";
import useAuth from "../hooks/useAuth";
/* make a local state that holds info for products 
querry db for the products locally
put into state 
pull products from hook
search for specific products
*/
const Order = ({ singleOrder, orderNumber }) => {
  const [productList, setProductList]=useState([])
  const {products}=useAuth();
  console.log(products)
  useEffect(() => {
    const gettingData = async () => {
      const data = await getOrderItem(singleOrder.id);

      setProductList(data)
    };
    gettingData();
  }, []);
  console.log(productList,"data")
  return (
    <table key={singleOrder._id}>
      <tbody>
          <td></td>
        <tr>
          <th>order #{orderNumber}</th>
          
          {/* <th>{productList[0].id}</th> */}
        </tr>
        <tr>
        {productList?(
            productList.map((singleProduct,i)=>{
              return (<tr>
                <th>id: {singleProduct.productId}</th>
                <th>price: {singleProduct.price}</th>
                <th>quantity: {singleProduct.quantity}</th>
              </tr>)
            })
          ):null}
        </tr>
      </tbody>
    </table>
  );
};
export default Order;
