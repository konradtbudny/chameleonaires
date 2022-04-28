const express = require("express");
const ordersRouter = express.Router();
const {getAllOrders, getOrdersbyId,getUserByUsername} = require("../db");
const {requireUser} = require("./utils");

ordersRouter.post("/", async (req, res,next) => {
    try {
        console.log("getting to orders")
        const allOrders = await getAllOrders();
        console.log(allOrders,"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        /*const user=await getUserByUsername(localStorage.user.username)
        console.log(user)
        const orders = allOrders.filter((order) => {
            return((order.active && order.author.active) || (req.user && order.id === req.user.id));
        });
*/
        res.send({allOrders});
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
