const express = require("express");
const {
  getAlLProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../db/models/products");
const productsRouter = express.Router();

productsRouter.get("/", async (req, res, next) => {
  try {
    const products = await getAlLProducts();
    res.send(products);
  } catch (error) {
    next(error);
  }
});
productsRouter.post("/", async (req, res, next) => {
  try {
    const { title, description, price, inventoryQuantity, category, photo } =
      req.body;
    const newProduct = await createProduct({
      title,
      description,
      price,
      inventoryQuantity,
      category,
      photo,
    });
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.patch("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  const { id, title, description, price, inventoryQuantity, category, photo } =
    req.body;
  const updateObj = { id: productId };
  if (id) {
    updateObj.id = id;
  }
  if (title) {
    updateObj.title = title;
  }
  if (description) {
    updateObj.description = description;
  }
  if (price) {
    updateObj.price = price;
  }
  if (inventoryQuantity) {
    updateObj.inventoryQuantity = inventoryQuantity;
  }
  if (category) {
    updateObj.category = category;
  }
  if (photo) {
    updateObj.photo = photo;
  }
  try {
    const updatedProduct = await updateProduct(updateObj);
    res.send(updatedProduct);
  } catch (error) {
    next(error);
  }
});

productsRouter.delete("/:productId", async (req, res, next) => {
  const { productId } = req.params;
  try {
    const deletedProduct = await deleteProduct(productId);
    res.send(deletedProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
