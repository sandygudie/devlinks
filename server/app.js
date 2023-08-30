const express = require("express");
const cors = require("cors");
const middleware = require("./middlewares/error-handler");
const apiRouter = require("./routes");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL }));
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  next();
});
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
