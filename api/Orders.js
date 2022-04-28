const express = require("express");
const ordersRouter = express.Router();
const {getOrdersbyId, getOrdersByBuyer} = require("../db");
const {requireUser} = require("./utils");

ordersRouter.get("/:userId", async (req, res, next) => {
    try {
        const allOrders = await getOrdersByBuyer(req.params.userId);
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
