const express = require("express");
const reviewsRouter = express.Router();
const {
  createReviews,
  updateReviews,
  getReviewsById,
  getAllReviews,
  getReviewsByProductId,
} = require("../db");
const { requireUser } = require("./utils");

reviewsRouter.post("/", requireUser, async (req, res, next) => {
  const { title, content = "" } = req.body;
  let reviewData = {};

  try {
    reviewData.authorId = req.user.id;
    reviewData.title = title;
    reviewData.content = content;

    const review = await createReviews(reviewData);

    if (review) {
      res.send({ review });
    } else {
      next();
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewsRouter.get("/", async (req, res) => {
  try {
    const allReviews = await getAllReviews();

    const reviews = allReviews.filter((review) => {
      return (
        (review.active && review.author.active) ||
        (req.user && review.author.id === req.user.id)
      );
    });

    res.send({
      reviews,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

reviewsRouter.delete("/:reviewId", requireUser, async (req, res, next) => {
  try {
    const review = await getReviewsById(req.params.reviewId);

    if (review && review.author.id === req.user.id) {
      const updateReviews = await updateReviews(review.id, { active: false });

      res.send({ review: updateReview });
    } else {
      // if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError
      next(
        post
          ? {
              name: "UnauthorizedUserError",
              message: "You cannot delete a review which is not yours",
            }
          : {
              name: "PostNotFoundError",
              message: "That review does not exist",
            }
      );
    }
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = reviewsRouter;
