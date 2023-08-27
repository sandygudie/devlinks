const express = require("express");
const apiRouter = express.Router();
const { authRouter } = require("./auth");
const { userRouter } = require("./user");

apiRouter.use("/user", userRouter);
apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
