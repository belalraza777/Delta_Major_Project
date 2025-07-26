const Listing = require("../models/listing");
const Reviews = require("../models/review");

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const review = new Reviews(req.body);
  review.author = req.user._id;
  listing.reviews.push(review);
  await review.save();
  await listing.save();
  req.flash("success", "Comment Added Successfully");
  res.redirect(`/listings/${id}`);
};

// DELETE REVIEW
module.exports.deleteReview = async (req, res) => {
  const { id, reviewId } = req.params;
  await Reviews.findByIdAndDelete(reviewId);
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  req.flash("success", "Deleted Successfully");
  res.redirect(`/listings/${id}`);
};
