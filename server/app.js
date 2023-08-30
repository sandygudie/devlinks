const express = require("express");
const cors = require("cors");
const middleware = require("./middlewares/error-handler");
const apiRouter = require("./routes");
// const cookieParser = require("cookie-parser");
const app = express();
// const { COOKIE_KEY } = process.env;
// app.use( cookieSession({
//   cookie:{
//     secure: true,
//     maxAge:60000
//        },
//   secret: "secret",
//   resave: false ,
//   saveUninitialized: true ,
// }))

// app.use(
//   cookieSession({
//     name: "session",
//     keys: [COOKIE_KEY],
//     maxAge: 24 * 60 * 60 * 100,
//     secure:false,
//     SameSite:"none"
//   })
// );
// parse cookies
// app.use(cookieParser());
// console.log(process.env)
// initalize passport

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));

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

