const mongoose = require("mongoose");
const User = require("../models/user");


const Reviewsschema = new mongoose.Schema({
    comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createAt:{
        type:Date,
        default:Date.now(),
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
     }
});

const Reviews = mongoose.model("Reviews", Reviewsschema);
module.exports = Reviews;