const express = require("express");
const cors = require("cors");
const middleware = require("./middlewares/error-handler");
const apiRouter = require("./routes");

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) =>
  res.status(200).send({ message: "Welcome to devlinks." })
);
app.use("/api/v1", apiRouter);

middleware;
app.use(middleware.unknownEndpoint);
app.use(middleware.defaultErrorHandler);

module.exports = app;
