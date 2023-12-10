const Router = require("express");
const { getUserByShareId } = require("../controllers/user");
const publicRouter = Router();

publicRouter.get( "/" ,getUserByShareId);

module.exports = { publicRouter };
