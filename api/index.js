const apiRouter = require("express").Router();
const usersRouter = require("./users");
const productsRouter = require("./products");
const ordersRouter = require("./orders");
const reviewsRouter = require("./reviews");
const { append } = require('express/lib/response');

apiRouter.get("/", (req, res, next) => {
  res.send({
    message: "API is under construction!",
  });
});

apiRouter.get("/health", (req, res, next) => {
  res.send({
    healthy: true,
  });
});
apiRouter.use(async (req, res, next) => {
  const prefix = "Bearer";
  const auth = req.header("Authorization");
  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length);
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    if (id) {
      req.user = await getUserById(id);
      next();
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});
apiRouter.use((req, res, next) => {
  if (req.user) {
    console.log("User is set: ", req.user);
  }
  next();
});

// place your routers here
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/reviews", reviewsRouter);
module.exports = apiRouter;
