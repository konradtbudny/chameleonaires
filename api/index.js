const apiRouter = require('express').Router();
const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const reviewsRouter = require("./reviews");
const { append } = require('express/lib/response');


apiRouter.get('/', (req, res, next) => {
  res.send({
    message: 'API is under construction!',
  });
});

apiRouter.get('/health', (req, res, next) => {
  res.send({
    healthy: true,
  });
});

// place your routers here
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviews", reviewsRouter);
module.exports = apiRouter;
