const Listing = require("../models/listing");

// INDEX
module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
};

// NEW
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

// CREATE
module.exports.createListing = async (req, res) => {
  const url = req.file.path;
  const filename = req.file.filename;
  const listing = req.body;
  const list = new Listing(listing);
  list.owner = req.user._id;
  list.image = { url, filename };
  await list.save();
  req.flash("success", "Listing Created Successfully");
  res.redirect("/listings");
};

// SHOW
module.exports.showListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })
    .populate("owner");

  res.render("listings/show.ejs", { listing });
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
};

// UPDATE
module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = req.body;
  const updatedListing = await Listing.findByIdAndUpdate(id, listing);
  if (typeof req.file !== "undefined") {
    const url = req.file.path;
    const filename = req.file.filename;
    updatedListing.image = { url, filename };
    await updatedListing.save();
  }
  req.flash("success", "Updated Successfully");
  res.redirect(`/listings/${id}`);
};

// DELETE
module.exports.deleteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("success", "Deleted Successfully");
  res.redirect("/listings");
};

//search
module.exports.searchedListing = async (req, res) => {
  const search = req.query.search.trim();
  let allListing = [];
  if (search) {
    allListing = await Listing.find({ location: search });
  }
  if (allListing.length > 0) {
    res.render("listings/index.ejs", { allListing })
  } else {
    req.flash("error", "No Listings Found at your destination");
    res.redirect("/listings");
  }

};
