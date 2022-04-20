// grab our db client connection to use with our adapters
const client = require("../client");

module.exports = {
  // add your database adapter fns here
  createProduct,
  updateProduct,
  destroyProduct,
  getAlLProducts,
};
async function createProduct({
  title,
  description,
  price,
  inventoryQuantity,
  category,
  photo,
}) {
  try {
    const {
      rows: [product],
    } = await client.query(
      `INSERT INTO products(title, description,price,inventoryQuantity,category,photo)
        VALUES($1,$2,$3,$4,$5,$6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;`,
      [title, description, price, inventoryQuantity, category, photo]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
async function getAlLProducts() {
  try {
    const { rows } = await client.query(`
        SELECT * FROM products`);
    return rows;
  } catch (error) {
    throw error;
  }
}
async function getProductById(productId) {
  try {
    const {
      rows: [product],
    } = await client.query(`SELECT * FROM products WHERE id=$1`, [productId]);
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
  photo,
}) {
  try {
    const temp = await getProductById(id);
    title = title ? title : temp.title;
    description = description ? description : temp.description;
    price = price ? price : temp.price;
    inventoryQuantity = inventoryQuantity
      ? inventoryQuantity
      : temp.inventoryQuantity;
    category = category ? category : temp.category;
    photo = photo ? photo : temp.photo;
    const {
      rows: [product],
    } = await client.query(
      `
        UPDATE products
        SET title=($1), description=($2), price=($3), inventoryQuantity=($4),category=($5),photo=($6)
        WHERE id=($7)
        RETURNING *
        `,
      [title, description, price, inventoryQuantity, category, photo, id]
    );
    return product;
  } catch (error) {
    throw error;
  }
}
async function destroyProduct(id) {
  try {
    const {
      rows: [deleted],
    } = await client.query(
      `
        DELETE FROM products
        WHERE id=$1
        RETURNING *;`,
      [id]
    );
    return deleted;
  } catch (error) {
    throw error;
  }
}
