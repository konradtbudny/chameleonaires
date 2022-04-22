const express = require("express");
const { getAlLProducts, createProduct } = require("../db/models/products");
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

module.exports = productsRouter;
