const {client} = require("../client");

async function getOrderItemById(id) {
    try {
        const {rows} = await client.query(`SELECT * FROM orderItem WHERE id=$1`, [id,]);
        return row;
    } catch (error) {
        throw error;
    }
}
async function getOrderItemByOrderId(id) {
    try {
        const {rows} = await client.query(`SELECT * FROM orderItem WHERE "orderId"=$1 `, [id]);
        return rows;
    } catch (error) {
        throw error;
    }
}
async function createOrderItem({orderId, productId, price, quantity}) {
    try {
        const {rows: [orderItem]} = await client.query(`
    INSERT INTO orderItem("orderId","productId", price,quantity)
    VALUES($1,$2,$3,$4)
    ON CONFLICT ("orderId", "productId") DO NOTHING
    RETURNING *
    `, [orderId, productId, price, quantity]);
        return orderItem;
    } catch (error) {
        throw error;
    }
}
async function updateOrderItem({id, price, quantity}) {
    console.log("!!!!!!!!!!!!!!!!!! in updateOrderItem")
    try {
        let temp = getOrderItemById(id);
        price = price ? price : temp.price;
        quantity = quantity ? quantity : temp.quantity;
        const {row} = await client.query(`
    UPDATE orderItem
    SET price=$1, quantity=$2
    WHERE id=$3`, [price, quantity, id]);
        return row;
    } catch (error) {
        throw error;
    }
}
async function deleteOrderItem(id) {
    try {
        const {row: [deleted]} = await client.query(`
    DELETE FROM orderItem
    WHERE id=$1`, [id]);
        return deleted;
    } catch (error) {
        throw error;
    }
}
async function attachItemsToOrder(orders){
    const ordersToReturn=[...orders]
}
module.exports = {
    createOrderItem,
    deleteOrderItem,
    updateOrderItem,
    getOrderItemById,
    getOrderItemByOrderId
};
