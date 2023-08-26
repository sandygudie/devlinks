const express = require("express");
const apiRouter = express.Router();
const { authRouter } = require("./auth");
const { linkRouter } = require("./links");
const { userRouter } = require("./user");

apiRouter.use("/user", userRouter);
apiRouter.use("/link", linkRouter);

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
