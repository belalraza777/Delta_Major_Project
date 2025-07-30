const express = require("express");
const router = express.Router();
const User = require("../models/user");
const asyncWrap = require("../utils/asyncWrap");
const passport = require("passport");
const { redirectUrl, isLoggedIn } = require("../middleware");


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
        const redirect = res.locals.redirectUrl || "/listings";
        req.flash("success",`Welcome Back @${req.body.username}`);
        res.redirect(redirect);
    });

//logout
router.get("/logout", (req, res) => {
    req.logout((err) => {
        console.log(err);
    });
    req.flash("success", `Logout Successfully`);
    res.redirect("/listings");
});

// Account 
router.get("/account", isLoggedIn, asyncWrap(async (req, res) => {
    const user = await User.findOne({ email: req.user.email });
    res.render("users/account.ejs", { user })
}));

router.get('/account/password', isLoggedIn, (req, res, next) => {
    res.render("users/changePass.ejs");
});

router.patch("/account/password", isLoggedIn, asyncWrap(async (req, res, next) => {
    const { password, newPassword } = req.body;
    try {
        await req.user.changePassword(password, newPassword);
        req.flash("success", `Password changed successfully`);
        res.redirect("/account")
    } catch (error) {
        req.flash("error", `Something is wrong!`);
        res.redirect("/account/password");
    }
}));


module.exports = router;