import React from "react";
import useAuth from "../hooks/useAuth";

const View=()=>{
    const {product}=useAuth()
    let url = window.location.pathname;
    console.log(url)

return (<div>
    <p>Hello</p>
</div>)
}
export default View;