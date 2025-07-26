require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user");

const asyncWrap = require("./utils/asyncWrap");
const ExpressError = require("./utils/expressError");

const listingsRouter = require("./routes/listingsRoute");
const reviewsRouter = require("./routes/reviewsRoute");
const usersRouter = require("./routes/usersRoute");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//seasion
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({
    mongoUrl: process.env.DB_URL,
    crypto: {
      secret: process.env.SECRET
    },
    touchAfter: 24 * 3600,
    ttl: 7 * 24 * 60 * 60,
  }),
  cookie: {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  }
}));

//passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//flash messages
app.use(flash());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});


//route
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewsRouter);
app.use("/", usersRouter);


// Handle all unmatched routes
app.use((req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

//error handle middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "some error" } = err;
  res.status(status).render("error.ejs", { err });
});

app.listen(8000, () => {
  console.log("Server Started at 8000")
});