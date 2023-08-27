const Router = require("express");
const authRouter = Router();
const passport = require("passport");
require("../passportConfig")(passport);
const CLIENT_HOME_PAGE_URL = "http://localhost:5173";
const { isUserVerified } = require("../middlewares/userCheck");
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/google/failure",
  })
);

// when login is successful, retrieve user info

authRouter.get("/google/success", isUserVerified, (req, res) => {
  res.status(200).json({
    success: true,
    message: "user successfully authenticated",
    userId: req.user.googleID,
    cookies: req.cookies,
  });
});

authRouter.get("/google/failure", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate.",
  });
});

module.exports = { authRouter };
