const Listing = require("./models/listing");
const Reviews = require("./models/review");
const ExpressError = require("./utils/expressError");
const { listingValidater, reviewValidater } = require("./schemaValidater");


function isLoggedIn(req, res, next) {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in ..");
        return res.redirect("/login");
    }
    next();
}


function redirectUrl(req, res, next) { //save redirect (track my page before login)
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

async function isOwner(req, res, next) {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner._id.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not owner of this Listing");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

function validateListing(req, res, next) {
    const { error } = listingValidater.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(e => e.message).join(', '));
    } else {
        next();
    }
}

function validateReview(req, res, next) {
    const { error } = reviewValidater.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.details.map(e => e.message).join(', '));
    } else {
        next();
    }
}

async function isReviewAuthor(req, res, next) {
    const { id,reviewId } = req.params;
    const review = await Reviews.findById(reviewId);
    if (!review.author.equals(res.locals.currentUser._id)) {
        req.flash("error", "You are not author of this review");
        return res.redirect(`/listings/${id}`);
    }
    next();
}


module.exports = { isLoggedIn, redirectUrl, isOwner, validateListing, validateReview,isReviewAuthor };
