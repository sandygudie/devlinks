const express = require("express");
const apiRouter = express.Router();
const { userRouter } = require("./user");
const { publicRouter } = require("./publicview");
const { authRouter } = require("./auth");
const { verifyToken } = require("../middlewares/token");

apiRouter.use("/user", verifyToken, userRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/publicview", publicRouter);

module.exports = apiRouter;
