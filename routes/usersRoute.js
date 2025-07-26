const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { redirectUrl } = require("../middleware");

//signup
router.get("/signup", (req, res) => {
    res.render("users/signup.ejs");
});
router.post("/signup", asyncWrap(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const resUser = await User.register(newUser, password);
        req.login(resUser, (err) => {
            if (err) return next(err);
        });
        req.flash("success", `Welcome @${req.body.username}`);
        res.redirect("/listings");
    } catch (err) {
        req.flash("error", "email already exist..");
        res.redirect("/signup");
    }
}));

//login
router.get("/login", (req, res) => {
    res.render("users/login.ejs");
});
router.post("/login",
    redirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login", failureFlash: true,
    }),
    async (req, res) => {
        req.flash("success", `Welcome back @${req.body.username}`);
        const red = res.locals.redirectUrl || "/listings";
        res.redirect(red);
    });

//logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err);
    });
    req.flash("success", `Logout Successfully`);
    res.redirect("/listings");
});



module.exports = router;