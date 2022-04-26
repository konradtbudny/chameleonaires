const {client} = require("../client");
const {getProductById} = require("./products");

async function createOrders({ buyersId, productId }) {
  try {
    const {rows: [newOrder]} = await client.query(`
      INSERT INTO orders("buyersId", "productId")
      VALUES($1,$2)
      RETURNING *;
      `,[buyersId, productId]);
    return newOrder;
  } catch (error) {
    throw error;
  }
}


async function updateOrders({id, buyersId, productId}) {
    try {
        let temp = await getProductById(id);
        buyersId = buyersId ? buyersId : temp.buyersId;
        productId = productId ? productId : temp.productId;
        const {rows: [updated]} = await client.query(`
  UPDATE orders
  SET "buyersId"=$1, "productId"=$2
  WHERE id=$3
  RETURNING *;
  `, [buyersId, productId, id]);
        return updated;
    } catch (error) {
        throw error;
    }
}
async function deleteOrders(id) {
    try {
        const {rows: [deleted]} = await client.query(`
    DELETE FROM orders
    WHERE id =$1
    RETURNING *;
    `, [id]);
        return deleted;
    } catch (error) {
        throw error;
    }
}
async function getAllOrders() {
    try {
        const {rows} = await client.query(`
    SELECT * FROM orders;
    `);
        return rows;
    } catch (error) {
        throw error;
    }
}
async function getOrdersByBuyer(buyersId) {
    try {
        const {rows: [buyerOrderS]} = await client.query(`
    SELECT * FROM orders
    WHERE "buyersId"=$1
    `, [buyersId]);
        return buyerOrderS;
    } catch (error) {
        throw error;
    }
}
async function getOrdersByProduct(productId) {
    try {
        const {rows: [productOrders]} = await client.query(`
    SELECT * FROM orders
    WHERE "productId"=$1
    `, [productId]);
        return productOrders;
    } catch (error) {
        throw error;
    }
}
async function getOrdersbyId(id) {
    try {
        const {rows: [order]} = await client.query(`
  SELECT * FROM orders
  WHERE id=$1
  `, [id]);
        return order;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    createOrders,
    updateOrders,
    deleteOrders,
    getAllOrders,
    getOrdersByBuyer,
    getOrdersByProduct,
    getOrdersbyId
};
