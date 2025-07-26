const mongoose = require("mongoose");
const Reviews = require("../models/review");
const User = require("../models/user");


const Listingschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Reviews"
    }
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
});

//mongoose middleware handle Deletions
Listingschema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Reviews.deleteMany({ _id: { $in: listing.reviews } });
  }

});

const Listing = mongoose.model("Listing", Listingschema);


module.exports = Listing;