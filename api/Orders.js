const express = require("express");
const ordersRouter = express.Router();
const {getAllOrders, getOrdersbyId,getUserByUsername,getOrdersByBuyer} = require("../db");
const {requireUser} = require("./utils");

ordersRouter.get("/:userId", async (req, res,next) => {
    try {
        console.log("reaching orders api",req.params.userId)
        const allOrders = await getOrdersByBuyer(req.params.userId);
        console.log(allOrders,"api")

        res.send(allOrders);
    } catch ({name, message}) {
        next({name, message});
    }
});

ordersRouter.delete("/:orderId", requireUser, async (req, res, next) => {
    try {
        const order = await getOrdersbyId(req.params.orderId);

        if (order && order.id === req.user.id) {
            const updateOrders = await updateOrders(order.id, {active: false});

            res.send({post: updatedOrders});
        } else {}
    } catch ({name}) {
        next({name});
    }
});

module.exports = ordersRouter;
