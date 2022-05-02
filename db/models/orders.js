const {client} = require("../client");
const {getProductById} = require("./products");

async function createOrders({buyersId,active}) {
    active=active?active:false;
    try {
        const {rows: [newOrder]} = await client.query(`
      INSERT INTO orders("buyersId", active)
      VALUES($1,$2)
      RETURNING *;
      `, [buyersId, active]);
        return newOrder;
    } catch (error) {
        throw error;
    }
}

async function updateOrders({id, buyersId, active}) {
    try {
        let temp = await getProductById(id);
        buyersId = buyersId ? buyersId : temp.buyersId;
        active = active ? active : temp.active;
        const {rows: [updated]} = await client.query(`
  UPDATE orders
  SET "buyersId"=$1, active=$2
  WHERE id=$3
  RETURNING *;
  `, [buyersId, active, id]);
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
        const {rows} = await client.query(`SELECT * FROM orders;`);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function getOrdersByBuyer(buyersId) {
    try {
        const {rows} = await client.query(`
    SELECT * FROM orders
    WHERE "buyersId"=$1
    `, [buyersId]);
        console.log(rows, "DB")
        return rows;
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
    getOrdersbyId
};
