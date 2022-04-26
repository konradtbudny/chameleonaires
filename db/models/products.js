const {client} = require("../client");

async function createProduct({
    title,
    description,
    price,
    inventoryQuantity,
    category,
    photo
}) {
    try {
        const {rows: [product]} = await client.query(`
        INSERT INTO products(title, description,price,quantity,category,photo)
        VALUES($1,$2,$3,$4,$5,$6)
        ON CONFLICT (title) DO NOTHING
        RETURNING *;`, [
            title,
            description,
            price,
            inventoryQuantity,
            category,
            photo
        ]);
        return product;
    } catch (error) {
        throw error;
    }
}
async function getAlLProducts() {
    try {
        const {rows} = await client.query(`
        SELECT * FROM products`);
        return rows;
    } catch (error) {
        throw error;
    }
}
async function getProductById(id) {
    try {
        const {rows: [product]} = await client.query(`SELECT * FROM products WHERE id=$1`, [id]);
        return product;
    } catch (error) {
        throw error;
    }
}
async function updateProduct({
    id,
    title,
    description,
    price,
    inventoryQuantity,
    category,
    photo
}) {
    try {
        const temp = await getProductById(id);
        title = title ? title : temp.title;
        description = description ? description : temp.description;
        price = price ? price : temp.price;
        inventoryQuantity = inventoryQuantity ? inventoryQuantity : temp.inventoryQuantity;
        category = category ? category : temp.category;
        photo = photo ? photo : temp.photo;
        const {rows: [product]} = await client.query(`
        UPDATE products
        SET title=$1, description=$2, price=$3, inventoryQuantity=$4,category=$5,photo=$6
        WHERE id=$7
        RETURNING *
        `, [
            title,
            description,
            price,
            inventoryQuantity,
            category,
            photo,
            id
        ]);
        return product;
    } catch (error) {
        throw error;
    }
}
async function deleteProduct(id) {
    try {
        const {rows: [deleted]} = await client.query(`
      DELETE FROM products
      WHERE id=$1
      RETURNING *;`, [id]);
        return deleted;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAlLProducts,
    getProductById
};
