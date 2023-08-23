const express = require("express");
const apiRouter = express.Router();
const { register, loginUser } = require("../controllers/index");
const passport = require("passport");
require("../passportConfig")(passport);
const CLIENT_HOME_PAGE_URL = "http://localhost:5173";

apiRouter.post("/register", function (req, res) {
  try {
    register(req, res);
  } catch (err) {
    console.error(`Error while creating user`, err.message);
  }
});
apiRouter.post("/login", function (req, res) {
  try {
    loginUser(req, res);
  } catch (err) {
    console.error(`login error`, err.message);
  }
});

apiRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

apiRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/google/failure",
  })
);
// apiRouter.get('/google/callback',
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// when login is successful, retrieve user info
const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated",
    });
  } else {
    next();
  }
};
apiRouter.get("/google/success", authCheck, (req, res) => {
  res.status(200).json({
    success: true,
    message: "user has successfully authenticated",
    user: req.user,
    cookies: req.cookies,
  });
});

apiRouter.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

module.exports = apiRouter;
