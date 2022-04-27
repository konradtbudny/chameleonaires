const express = require("express");
const {deleteOrderItem, getOrderItemById} = require("../db/models/orderItem");
const orderItemRouter = express.Router();
const {requireUser} = require("./utils")

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
