const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
    //username and pass/salt/hash automatically saved by passport
});

userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model("User", userSchema);
