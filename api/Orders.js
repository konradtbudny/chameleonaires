const express = require("express");
const ordersRouter = express.Router();
const {getAllOrders, getOrdersbyId} = require("../db");
const {requireUser} = require("./utils");

ordersRouter.get("/", async (req, res) => {
    try {
        const allOrders = await getAllOrders();

        const orders = allOrders.filter((order) => {
            return((order.active && order.author.active) || (req.user && order.id === req.user.id));
        });

        res.send({orders});
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
