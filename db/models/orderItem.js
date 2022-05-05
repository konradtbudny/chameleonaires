const { client } = require("../client");

async function getOrderItemById(id) {
  try {
    const {
      rows: [updatedItem],
    } = await client.query(`SELECT * FROM orderItem WHERE id=$1`, [id]);
    console.log(updatedItem, "in db");
    return updatedItem; //there was a type here, it was row, instead of rows
  } catch (error) {
    throw error;
  }
}
async function getOrderItemByOrderId(id) {
  try {
    const { rows } = await client.query(
      `SELECT * FROM orderItem WHERE "orderId"=$1 `,
      [id]
    );
    return rows;
  } catch (error) {
    throw error;
  }
}
async function createOrderItem( orderId, productId, price, quantity ) {
  console.log("getting into db")
  try {
    const {
      rows: [orderItem],
    } = await client.query(
      `
    INSERT INTO orderItem("orderId","productId", price,quantity)
    VALUES($1,$2,$3,$4)
    ON CONFLICT ("orderId", "productId") DO NOTHING
    RETURNING *
    `,
      [orderId, productId, price, quantity]
    );
    return orderItem;
  } catch (error) {
    throw error;
  }
}
async function updateOrderItem({ id, price, quantity }) {
  console.log("!!!!!!!!!!!!!!!!!! in updateOrderItem");
  try {
    let temp = await getOrderItemById(id);  //this needed an await
    console.log(temp, "temp in updated order item");
    price = price ? price : temp.price;
    quantity = quantity ? quantity : temp.quantity;

    console.log(price, quantity, 'price and quantity in line 51')
    const { rows: [updatedItem] } = await client.query(
      `
    UPDATE orderItem
    SET price=$1, quantity=$2
    WHERE id=$3
    RETURNING *`,
      [price, quantity, id]
    );

    console.log(updatedItem, "rows in get order item by id"); //you were destructuring and returning row from the query, when it should be rows.
    return updatedItem;
  } catch (error) {
    throw error;
  }
}
async function deleteOrderItem(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `
    DELETE FROM orderItem
    WHERE id=$1`,
      [id]
    );
    return deleted;
  } catch (error) {
    throw error;
  }
}
async function attachItemsToOrder(orders) {
  const ordersToReturn = [...orders];
}
module.exports = {
  createOrderItem,
  deleteOrderItem,
  updateOrderItem,
  getOrderItemById,
  getOrderItemByOrderId,
};
