const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listingController");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage });

// INDEX
router.get("/", asyncWrap(listingController.index));

// NEW
router.get("/new", isLoggedIn, listingController.renderNewForm);

// CREATE
router.post("/", isLoggedIn, validateListing, upload.single("image"), asyncWrap(listingController.createListing));

//search
router.get("/search", asyncWrap(listingController.searchedListing));


// SHOW
router.get("/:id", asyncWrap(listingController.showListing));

// EDIT FORM
router.get("/:id/edit", isLoggedIn, isOwner, asyncWrap(listingController.renderEditForm));

// UPDATE
router.patch("/:id", isLoggedIn, isOwner, validateListing, upload.single("image"), asyncWrap(listingController.updateListing));

// DELETE
router.delete("/:id", isLoggedIn, isOwner, asyncWrap(listingController.deleteListing));


module.exports = router;
