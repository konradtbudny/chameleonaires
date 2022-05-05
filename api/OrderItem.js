const express = require("express");
const orderItemRouter = express.Router();
const {deleteOrderItem, getOrderItemByOrderId,updateOrderItem,createOrderItem} = require("../db/models/orderItem");
const {requireUser} = require("./utils")
console.log("getting into orderitem api")
orderItemRouter.post("/addOrder",async(req,res,next)=>{
    //
    const {orderId, productId, price, quantity}=req.body;
    console.log(req.body,"req.body")
    try {
        const createdOrderItem=createOrderItem(orderId,productId,price,quantity)
        res.send(createdOrderItem)
    } catch ({name,message}) {
        next({name,message})
    }
    
})
orderItemRouter.patch("/update/:id", async (req, res, next) => {
    console.log(req.body,"message, api")
    const {id} = req.params;
    console.log(id)
    const {price, quantity} = req.body;
    let data = {};
    data.id = id;
    if (price) {
        data.price = price;
    }
    if (quantity) {
        data.quantity = quantity;
    }
    try {
        const updated = await updateOrderItem(data);
        console.log(updated, 'updated')
        if(updated){
        res.send(updated);
    }
    else{
        next({name:`update  ${id}`,message:"failed update"})
    }
    } catch ({name, message}) {
        next({name, message});
    }
})
orderItemRouter.delete("/delete/:id", async (req, res, next) => {
    const {id} = req.params
    console.log(id)
    try {
        const order = await deleteOrderItem(id)
        res.send(order);
    } catch ({name, message}) {
        next({name, message})
    }
})

orderItemRouter.get("/:id",async(req,res,next)=>{
    const {id}=req.params;
    try {
        const orderItem=await getOrderItemByOrderId(id)
        res.send(orderItem)
    } catch ({name,message}) {
        next({name,message})
    }
})
module.exports = orderItemRouter;
