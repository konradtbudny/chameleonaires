const {client} = require("./client");
const {createProduct} = require("./models/products");
const {createUser} = require("./models/users");
const {createReview} = require("./models/reviews");
const {createOrders} = require("./models/orders")
const {createOrderItem} = require("./models");

async function buildTables() {
    try {
        console.log("Dropping All Tables...");
        await client.query(`
    DROP TABLE IF EXISTS orderItem;
    DROP TABLE IF EXISTS orders CASCADE;
    DROP TABLE IF EXISTS reviews CASCADE;
    DROP TABLE IF EXISTS products CASCADE;
    DROP TABLE IF EXISTS users CASCADE;
    `);
        console.log("Finished dropping tables!");
        await client.query(`CREATE TABLE users(
          id SERIAL PRIMARY KEY,
          username varchar(255) UNIQUE NOT NULL,
          password varchar(255) NOT NULL,
          email varchar(255) NOT NULL
        );`);
        await client.query(`CREATE TABLE products(
          id SERIAL PRIMARY KEY,
          title varchar(255) UNIQUE NOT NULL,
          description varchar(255) NOT NULL,
          price INTEGER NOT NULL,
          quantity INTEGER NOT NULL,
          category varchar(255) NOT NULL,
          photo varchar(255)
        )`);
        await client.query(`CREATE TABLE reviews(
          id SERIAL PRIMARY KEY,
          "productId" INTEGER REFERENCES products(id),
          "userId" INTEGER REFERENCES users(id),
          description varchar(255) NOT NULL
        );`);
        await client.query(`CREATE TABLE orders(
          id SERIAL PRIMARY KEY,
          "buyersId" INTEGER REFERENCES users(id),
          active boolean DEFAULT false
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
        const user1 = await createUser({username: "Konrad", password: "Budny", email: "kbudny492@gmail.com"})
        const user2 = await createUser({username:"Mark", password:"hello", email:"Mark.Twain@yahoo.com"})
        const user3= await createUser({username:"John",password:"Wayne",email:"JohnWayne@western.com"})
        
        const products1 = await createProduct({
            title: "Turtle",
            description: "A small animal with a shell",
            category: "Testudines",
            inventoryQuantity: 5,
            photo: "https://upload.wikimedia.org/wikipedia/commons/2/21/Turtle_diversity.jpg",
            price: 32
        })
        const products2 = await createProduct({
            title: "Alligator",
            description: "There are two extant species are the American alligator and the Chinese alligator.",
            category: "Crocodilian",
            inventoryQuantity: 2,
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Chinese%2Bamerican_alligators.png/220px-Chinese%2Bamerican_alligators.png",
            price: 200
        })
        const products3 = await createProduct({
            title: "Plumed basilisk",
            description: "A species of lizard in the family Corytophanidae",
            category: "Lizard",
            inventoryQuantity: 9,
            photo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Green_Basilisk%2C_Alajuela%2C_Costa_Rica.jpg/220px-Green_Basilisk%2C_Alajuela%2C_Costa_Rica.jpg",
            price: 42
        })

        const review1 = await createReview({productId: products1.id, userId: user1.id, description: "A very nice small animal"})
        const review2 = await createReview({productId: products2.id, userId: user2.id, description: "Nice big pet :)"})
        const review3 = await createReview({productId: products3.id, userId: user3.id, description: "Nice, but it need a lot of care"})
        
        const order1 = await createOrders({buyersId: user1.id})
        const order2 = await createOrders({buyersId: user2.id})
        const order3 = await createOrders({buyersId: user3.id})
        const order4 = await createOrders({buyersId: user1.id, active:true})

        const orderItem1 = await createOrderItem({orderId: order1.id, productId: products1.id, price: products1.price, quantity: 3})
        const orderItem2 = await createOrderItem({orderId: order2.id, productId: products2.id, price: products2.price, quantity: 1})
        const orderItem3 = await createOrderItem({orderId: order3.id, productId: products3.id, price: products2.price, quantity: 2})
        const orderItem4 = await createOrderItem({orderId: order1.id, productId: products3.id, price: products2.price, quantity: 1})
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
rebuildTables(). finally(() => client.end())
