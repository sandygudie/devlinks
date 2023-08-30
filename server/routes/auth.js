const Router = require("express");
const authRouter = Router();
const { googleLogin } = require("../controllers/auth");

authRouter.post("/google", googleLogin);

// authRouter.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   function (req, res) {
//     // Successful authentication, redirect home.
//     res.redirect(process.env.CLIENT_URL);
//   }
// );

// when login is successful, retrieve user info
// authRouter.get("/auth/google/success", isUserVerified, (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: "user successfully authenticated",
//     userId: req.user.googleID,
//     cookies: req.cookies,
//   });
// });

// authRouter.get("/google/failure", (req, res) => {
//   res.status(401).json({
//     success: false,
//     message: "user failed to authenticate.",
//   });
// });

module.exports = { authRouter };
