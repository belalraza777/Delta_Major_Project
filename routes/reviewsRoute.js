const express = require("express");
const router = express.Router({ mergeParams: true });
const asyncWrap = require("../utils/asyncWrap");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/reviewController");

// CREATE
router.post("/", isLoggedIn, validateReview, asyncWrap(reviewController.createReview));

// DELETE
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, asyncWrap(reviewController.deleteReview));

module.exports = router;
