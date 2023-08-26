const Router = require("express");
const { addLink } = require("../controllers/links");
const linkRouter = Router();
const { isUserVerified } = require("../middlewares/userCheck");

linkRouter.post("", isUserVerified, addLink);

module.exports = { linkRouter };
