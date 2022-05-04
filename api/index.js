const apiRouter = require("express").Router();
require('dotenv').config()

const usersRouter = require("./Users");
const productsRouter = require("./Products");
const ordersRouter = require("./Orders");
const reviewsRouter = require("./Reviews");
const orderItemRouter = require("./OrderItem");

const jwt = require("jsonwebtoken");
const {getUserById} = require("../db");
const {JWT_SECRET} = process.env;

// apiRouter.get("/", (req, res, next) => {
//     res.send({message: "API is under construction!"});
// });

apiRouter.get("/health", (req, res, next) => {
    res.send({healthy: true});
});

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (! auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const parsedToken = jwt.verify(token, JWT_SECRET);

            const id = parsedToken && parsedToken.id
            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch (error) {
            next(error);
        }
    } else {
        next({name: 'AuthorizationHeaderError', message: `Authorization token must start with ${prefix}`});
    }
});

apiRouter.use((req, res, next) => {
    if (req.user) {
        console.log("User is set: ", req.user);
    }
    next();
});

apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
apiRouter.use("/orders", ordersRouter);
apiRouter.use("/orderitem",orderItemRouter)
apiRouter.use("/reviews", reviewsRouter);
console.log("api index line 57")

apiRouter.use((error, req, res, next) => {
    if(req.statusCode){
    if (statusCode >= 100 && statusCode < 600) 
        res.status(statusCode);
     else 
        res.status(500);
    
    res.send({name: error.name, message: error.message});}
});

module.exports = apiRouter;
