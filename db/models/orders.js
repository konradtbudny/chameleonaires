// grab our db client connection to use with our adapters
const client = require('../client');

async function createOrders(){}
async function updateOrders(){}
async function deleteOrders(){}
async function getAllOrders(){}
async function getOrdersByUser(){}
async function getOrdersbyId(){}
module.exports = {
  // add your database adapter fns here
  createOrders,
  updateOrders,
  deleteOrders,
  getAllOrders,
  getOrdersByUser,
  getOrdersbyId
};