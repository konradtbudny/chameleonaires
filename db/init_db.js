const {
  client,
  // declare your model imports here
  // for example, User
} = require("./client");
const {createProduct}=require('./models/products')
const{createUser}=require('./models/users')
const {createReview}=require('./models/reviews');
const models = require("./models");
const { createOrderItem } = require("./models");

async function buildTables() {
  try {
    client.connect();

    // drop tables in correct order
    console.log("Dropping All Tables...");
    await client.query(`
    DROP TABLE IF EXISTS order_item CASCADE;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    `);
    console.log("Finished dropping tables!");
    // build tables in correct order
    console.log("Starting to build tables...");
    await client.query(`CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          email varchar(255) UNIQUE NOT NULL
        );`);
    await client.query(`CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFFERENCES products(id),
          "userId" INTEGER REFERENCES users(id),
          description varchar(255) NOT NULL
        );`);
    await client.query(`CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title varchar(255) UNIQUE NOT NULL,
          description varchar(255) NOT NULL,
          price INTEGER NOT NULL
          inventory_quantity INTEGER NOT NULL
          category varchar(255) NOT NULL,
          photo varchar(255)
        )`);
    await client.query(`CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "buyersId" INTEGER REFFERENCES users(id),
          "productId" INTEGER REFERENCES products(id),
        `);
        await client.query(`CREATE TABLE order_item(
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES orders(id),
          "productId" INTEGER REFERENCES products(id),
          price INTEGER REFERENCES products(price),
          quantity INTEGER
        )`)
        
        console.log("Finished creating tables!");
      } catch (error) {
        console.log("Error dropping tables");
        throw error;
      }
    }
    
    async function populateInitialData() {
      try {
    // create useful starting data by leveraging your
        // Model.method() adapters to seed your db, for example:
        // const user1 = await User.createUser({ ...user info goes here... })
        //const user1=await models.createUser({});
        //const products1=await createProduct({})
        //const review1= await createReview({})
        //const order1=await createOrder({})
        //const orderItem1=await createOrderItem({})
  } catch (error) {
    throw error;
  }
}

buildTables()
  .then(populateInitialData)
  .catch(console.error)
  .finally(() => client.end());
