// grab our db client connection to use with our adapters
const client = require('../client');
const { getProductById } = require('./products');
/**
 *  id SERIAL PRIMARY KEY,
          "buyersId" INTEGER REFFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
 */
async function createOrders({buyersId, productId}){
  try {
    const {row:[order]}=await client.query(`
    INSERT INT orders("buyersId", "productId")
    VAULES($1,$2)
    RETURNING *;
    `, [buyersId,productId])
    return order;
  } catch (error) {
    throw error
  }
}
async function updateOrders({id, buyersId,productId}){
  try {
    let temp =await getProductById(id);
  buyersId=buyersId?buyersId:temp.buyersId;
  productId=productId?productId:temp.productId;
  const {rows:[updated]}=await client.query(`
  UPDATE orders
  SET "buyersId"=($1), "productId"=($2)
  WHERE id=($3)
  RETURNING *;
  `,[buyersId,productId,id])
  return updated;
  } catch (error) {
    throw error;
  }
}
async function deleteOrders(id){
  try {
    const {rows:[deleted]}=await client.query(`
    DELETE FROM orders
    WHERE id =$1
    RETURNING *;
    `,[id])
    return deleted;
  } catch (error) {
    throw error;
  }
}
async function getAllOrders(){
  try {
    const {rows}= await client.query(`
    SELECT * FROM orders;
    `)
    return rows;
  } catch (error) {
    throw error
  }
}
async function getOrdersByBuyer(buyersId){
  try {
    const {rows:[buyerOrderS]}=await client.query(`
    SELECT * FROM orders
    WHERE "buyersId"=$1
    `,[buyersId]);
    return buyerOrderS
  } catch (error) {
    throw error;
  }
}
async function getOrdersByProduct(productId){
  try {
    const {rows:[productOrders]}=await client.query(`
    SELECT * FROM orders
    WHERE "productId"=$1
    `,[productId]);
    return productOrders
  } catch (error) {
    throw error;
  }
}
async function getOrdersbyId(){}
module.exports = {
  // add your database adapter fns here
  createOrders,
  updateOrders,
  deleteOrders,
  getAllOrders,
  getOrdersByBuyer,
  getOrdersbyId,
  getOrdersByProduct
};