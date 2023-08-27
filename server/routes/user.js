const Router = require("express");
const { getUser,updateUser  } = require("../controllers/user");
const userRouter = Router();
const { isUserVerified } = require("../middlewares/userCheck");

userRouter.get("", isUserVerified, getUser);
userRouter.post("", isUserVerified, updateUser );

module.exports = { userRouter,updateUser };
