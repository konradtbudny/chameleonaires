const {client} = require("../client");

async function createReview({ productId, userId, description }) {
  try {
    const {rows: [newReview]} = await client.query(`
      INSERT INTO reviews("productId", "userId",description)
      VALUES($1,$2,$3)
      RETURNING *;
      `,[productId, userId, description]);
    return newReview;
  } catch (error) {
    throw error;
  }
}
async function updateReviews({id, description}) {
    try {
        let temp = await getReviewsById(id);
        description = description ? description : temp.description;
        const {row: [updated]} = await client.query(`
  UPDATE reviews
  SET description=$1
  WHERE id=$2
  `, [description, id]);
        return updated;
    } catch (error) {
        throw error;
    }
}
async function deleteReviews(id) {
    try {
        const {rows: [deleted]} = await client.query(`
    DELETE from reviews
    WHERE id=$1
    `, [id]);
        return deleted;
    } catch (error) {
        throw error;
    }
}
async function getReviewsById(id) {
    try {
        const {rows: [reviews]} = await client.query(`
    SELECT * FROM reviews
    WHERE id=$1
    `, [id]);
        return reviews;
    } catch (error) {
        throw error;
    }
}
async function getAllReviews() {
    try {
        const {rows: [reviews]} = await client.query(`
    SELECT * FROM reviews
    `);
        return reviews;
    } catch (error) {
        throw error;
    }
}
async function getReviewsByProductId(productId) {
    try {
        const {rows: [productReviews]} = await client(`
    SELECT * FROM reviews
    WHERE "productId"=$1
    `, [productId]);
        return productReviews;
    } catch (error) {
        throw error;
    }
}
async function getReviewsByUserId(userId) {
    try {
        const {rows: [reviews]} = await client.query(`
  SELECT * FROM reviews
  WHERE "userId"=$1
  `, [userId]);
        return reviews;
    } catch (error) {
        throw error;
    }
}
// async function attachReviewsToProducts(products) {
// const productsToReturn=[...products];
// const binds =products.map((_,index)=>`$${index+1}`).join(", ")
// const productIds=products.map((product)=>product.id);
// if(!productIds?.length) return[];
// try {
//     const {rows:reviews}=await client.query(`
//     SELECT reviews.*, user.username
//     FROM reviews
//     JOIN products `)
// } catch (error) {
//     throw error;
// }
// }
// async function attachReviewsToUsers() {}
module.exports = {
    createReview,
    updateReviews,
    deleteReviews,
    getReviewsById,
    getAllReviews,
    getReviewsByProductId,
    getReviewsByUserId,
    // attachReviewsToProducts,
    // attachReviewsToUsers,
};
