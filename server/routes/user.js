const Router = require("express");
const { getUser } = require("../controllers/user");
const userRouter = Router();
const { isUserVerified } = require("../middlewares/userCheck");

userRouter.get("", getUser);

module.exports = { userRouter };
