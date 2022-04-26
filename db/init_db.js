const {
    client,
    // declare your model imports here
    // for example, User
} = require("./client");
const {createProduct} = require("./models/products");
const {createUser} = require("./models/users");
const {createReview} = require("./models/reviews");
const {createOrders}=require("./models/orders")
//const models = require("./models");
const {createOrderItem} = require("./models");

async function buildTables() {
    try {
        // client.connect();

        // drop tables in correct order
        console.log("Dropping All Tables...");
        await client.query(`
    DROP TABLE IF EXISTS orderItem;
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
        console.log("users table created");
        await client.query(`CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title varchar(255) UNIQUE NOT NULL,
          description varchar(255) NOT NULL,
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          category varchar(255) NOT NULL,
          photo varchar(255)
        )`);
        console.log("products table created");
        await client.query(`CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "userId" INTEGER REFERENCES users(id),
          description varchar(255) NOT NULL
        );`);
        console.log("reviews table created");
        await client.query(`CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "buyersId" INTEGER REFERENCES users(id),
          "productId" INTEGER REFERENCES products(id)
        )`);
        await client.query(`CREATE TABLE orderItem(
          id SERIAL PRIMARY KEY,
          "orderId" INTEGER REFERENCES orders(id),
          "productId" INTEGER REFERENCES products(id),
          price INTEGER,
          quantity INTEGER,
          UNIQUE ("orderId","productId")
        )`);

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
        const user1 = await createUser({username: "Konrad", password: "Budny", email: "kbudny492@gmail.com"})
        const products1 = await createProduct({
            title: "Turtle",
            description: "A small animal with a shell",
            category: "Testudines",
            inventoryQuantity: 2,
            photo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Turtle_diversity.jpg",
            price: 32
        })
        const review1 = await createReview({productId: products1.id, userId: user1.id, description: "A very nice small animal"})
        const order1 = await createOrders({buyersId: user1.id, productId: products1.id})
        const orderItem1 = await createOrderItem({orderId: order1.id, productId: products1.id, price: products1.price, quantity: 1})
    } catch (error) {
        throw error;
    }
}

async function rebuildTables() {

    try {
        client.connect();
        await buildTables()
        await populateInitialData()
    } catch (error) {
        console.error(error)
    }

}
rebuildTables().finally(()=>client.end())
// buildTables()
// .then(populateInitialData)
// .catch(console.error)
// .finally(() => client.end());
