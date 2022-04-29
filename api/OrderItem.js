const express = require("express");
const orderItemRouter = express.Router();
const {deleteOrderItem, getOrderItemByOrderId} = require("../db");
const {requireUser} = require("./utils")

orderItemRouter.get("/:id",async(req,res,next)=>{
    const {id}=req.params;
    try {
        const orderItem=await getOrderItemByOrderId(id)
        res.send(orderItem)
    } catch ({name,message}) {
        next({name,message})
    }
})
orderItemRouter.post("/addOrder",requireUser,async(req,res,next)=>{
    //
    const {orderId, productId, price, quantity}=req.body;
    try {
        const createdOrderItem=createOrderItem(req.body)
        res.send(createdOrderItem)
    } catch ({name,message}) {
        next({name,message})
    }

})
orderItemRouter.patch("/:id", requireUser, async (req, res, next) => {
    const {id} = req.params;
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
        res.send(updated);
    } catch ({name, message}) {
        next({name, message});
    }
})
orderItemRouter.delete("/:id", requireUser, async (req, res, next) => {
    const {id} = req.params
    try {
        const order = await deleteOrderItem(id)
        res.send(order);
    } catch ({name, message}) {
        next({name, message})
    }
})

module.exports = orderItemRouter;
