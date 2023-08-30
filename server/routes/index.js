const express = require("express");
const apiRouter = express.Router();
const { authRouter } = require("./auth");
const { userRouter } = require("./user");
const { verifyToken } = require("../middlewares/token");

apiRouter.use("/user", verifyToken ,userRouter);
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
