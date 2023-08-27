
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const middleware = require("./middlewares/error-handler");
const passport = require("passport");
const apiRouter = require("./routes");
const cookieParser = require("cookie-parser");
const app = express();
const { COOKIE_KEY } = process.env;
app.use(
  cookieSession({
    name: "session",
    keys: [COOKIE_KEY],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// parse cookies
app.use(cookieParser());
// console.log(process.env)
// initalize passport
app.use(passport.initialize());

app.use(passport.session());

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.sendStatus(401);
  }
};
app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to devlinks." })
);
app.use("/api/v1", apiRouter);

middleware
app.use(middleware.unknownEndpoint);
app.use(middleware.defaultErrorHandler);

module.exports = app;


// deploy to vercer
// add links to DB
// replace local host with data (using env)
// error handling
// check cookies
// add a qr code scanner