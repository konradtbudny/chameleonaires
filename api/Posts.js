const express = require("express");
const postsRouter = express.Router();
const {getAllPosts, createPost, updatePost, getPostById} = require("../db");
const {requireUser, requireActiveUser} = require("./utils");

postsRouter.post("/", requireUser, async (req, res, next) => {
    const {
        title,
        content,
        tags = ""
    } = req.body;
    let postData = {};

    try {
        postData.authorId = req.user.id;
        postData.title = title;
        postData.content = content;

        const post = await createPost(postData);


        if (post) {
            res.send({post});
        } else {
            next();
        }

    } catch ({name, message}) {
        next({name, message});
    }
});

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

postsRouter.get("/", async (req, res) => {
    try {
        const allPosts = await getAllPosts();

        const posts = allPosts.filter((post) => {
            return(post.active && post.author.active) || (req.user && post.author.id === req.user.id);
        });

        res.send({posts});
    } catch ({name, message}) {
        next({name, message});
    }
});


postsRouter.delete("/:postId", requireUser, async (req, res, next) => {
    try {
        const post = await getPostById(req.params.postId);

        if (post && post.author.id === req.user.id) {
            const updatedPost = await updatePost(post.id, {active: false});

            res.send({post: updatedPost});
        } else { // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
            next(post ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a post which is not yours"
            } : {
                name: "PostNotFoundError",
                message: "That post does not exist"
            });
        }
    } catch ({name, message}) {
        next({name, message});
    }
});

module.exports = postsRouter;
