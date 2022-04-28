const express = require("express");
const usersRouter = express.Router();
const {getAllUsers, getUserByUsername, createUser, getUserById} = require("../db");
const {requireUser} = require("./utils");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = process.env;
require("dotenv").config()

usersRouter.use((req, res, next) => {
    console.log("A request is being made to /users");

    next();
});

usersRouter.post("/login", async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || !password) {
        next({name: "MissingCredentialsError", message: "Please supply both a username and password"});
    }
    
    try {
        const user = await getUserByUsername(username);
        console.log(user)

        if (user && user.password == password) {
            const token = jwt.sign({
                id: user.id
            }, process.env.JWT_SECRET);
            res.send({user,message:"you're logged in",token})
        } else {
            next({name: "IncorrectCredentialsError", message: "Username or password is incorrect"});
        }
    } catch (error) {
        console.log(error, "error in login");
        next(error);
    }
});

usersRouter.post('/register', async (req, res, next) => {
    const {username, password, email} = req.body;
    try {
        const _user = await getUserByUsername(username);

        if (_user) {
            next({name: 'UserExistsError', message: 'A user by that username already exists'});
        } else {

            const user = await createUser({username, password, email});

            if (user) {
                const token = jwt.sign({
                    id: user.id
                }, JWT_SECRET, {expiresIn: "1w"});
  
                res.send({user, message: "you're signed up!", token});

            } else {
                next({name: 'UserCreationError', message: 'There was a problem registering you. Please try again.'});
            }
        }
    } catch ({name, message}) {
        next({name, message})
    }
});

usersRouter.delete("/:userId", requireUser, async (req, res, next) => {

    try {
        const user = await getUserById(req.params.userId);

        if (user && user.id === req.user.id) {
            const deactivatedUser = await updateUser(user.id, {active: false});

            res.send({user: deactivatedUser});
        } else { // if there is a user logged in, throw UnauthorizedUserError, otherwise throw UserNotFoundError
            next(post ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a user which is not yours"
            } : {
                name: "UserNotFoundError",
                message: "That user does not exist"
            });
        }
    } catch ({name, message}) {
        next({name, message});
    }
});

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {

    try {
        const user = await getUserById(req.params.userId);

        if (user && user.id === req.user.id) {
            const reactivatedUser = await updateUser(user.id, {active: true});

            res.send({user: reactivatedUser});
        } else { // if there is a user logged in, throw UnauthorizedUserError, otherwise throw UserNotFoundError
            next(post ? {
                name: "UnauthorizedUserError",
                message: "You cannot reactivate a user which is not yours"
            } : {
                name: "UserNotFoundError",
                message: "That user does not exist"
            });
        }
    } catch ({name, message}) {
        next({name, message});
    }
});
usersRouter.post("/me",requireUser,async(req,res,next)=>{
    const user=await getUserByUsername(req.body.username);
    res.send(user)
})
module.exports = usersRouter;
